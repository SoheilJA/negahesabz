/**
 * TradeGlobe — Three.js hero experience.
 * Dot-matrix continents (world-atlas data), animated trade routes from Iran
 * to the holding's office countries, pulsing markers, ambient particles,
 * drag rotation + pointer parallax. Adaptive quality, paused when off-screen,
 * static frame under prefers-reduced-motion, full dispose().
 */
import * as THREE from 'three';
import { feature } from 'topojson-client';
import landTopo from 'world-atlas/land-110m.json';

const GOLD = 0xb78a48;
const GOLD_BRIGHT = 0xe6cf9e;
const SAGE = 0xa5b5a4;
const DEEP = 0x0e211b;

function latLngToVec3(lat, lng, r = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

/** Rasterize land polygons to a dot grid. */
function buildLandDots(step) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  const land = feature(landTopo, landTopo.objects.land);
  const geoms = land.type === 'FeatureCollection' ? land.features.map((f) => f.geometry) : [land.type === 'Feature' ? land.geometry : land];
  const polys = [];
  for (const g of geoms) {
    if (!g) continue;
    if (g.type === 'Polygon') polys.push(g.coordinates);
    else if (g.type === 'MultiPolygon') polys.push(...g.coordinates);
  }
  for (const poly of polys) {
    for (const ring of poly) {
      ctx.beginPath();
      ring.forEach(([lng, lat], i) => {
        const x = ((lng + 180) / 360) * 512;
        const y = ((90 - lat) / 180) * 256;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    }
  }
  const img = ctx.getImageData(0, 0, 512, 256).data;
  const dots = [];
  for (let lat = -88; lat <= 88; lat += step) {
    for (let lng = -180; lng <= 180; lng += step) {
      const px = Math.min(511, Math.max(0, Math.floor(((lng + 180) / 360) * 512)));
      const py = Math.min(255, Math.max(0, Math.floor(((90 - lat) / 180) * 256)));
      if (img[(py * 512 + px) * 4 + 3] > 128) {
        const jitter = () => (Math.random() - 0.5) * step * 0.55;
        dots.push([lat + jitter(), lng + jitter()]);
      }
    }
  }
  return dots;
}

export class TradeGlobe {
  constructor(wrapper, opts = {}) {
    this.wrapper = wrapper;
    this.opts = opts;
    this.points = opts.points || [];
    this.quality = opts.quality || (window.innerWidth < 768 ? 'low' : 'high');
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.disposed = false;
    this.raf = null;
    this.running = false;
    this.dragging = false;
    this.rotVel = 0;
    this.parallax = { x: 0, y: 0, tx: 0, ty: 0 };

    this._init();
  }

  _init() {
    const w = this.wrapper;
    const rect = w.getBoundingClientRect();
    this.renderer = new THREE.WebGLRenderer({ antialias: this.quality === 'high', alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(rect.width, rect.height);
    w.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, rect.width / Math.max(rect.height, 1), 0.1, 20);
    this.camera.position.set(0, 0.12, 3.15);

    this.globe = new THREE.Group();
    this.scene.add(this.globe);

    this._buildOccluder();
    this._buildLandDots();
    this._buildAtmosphere();
    this._buildRoutes();
    this._buildParticles();

    // Face Iran toward camera initially
    const iranV = latLngToVec3(32, 53);
    this.globe.rotation.y = -Math.atan2(iranV.x, iranV.z);
    this.globe.rotation.x = 0.22;

    this._bindEvents();
    this._observe();

    if (this.reduced) {
      this.renderer.render(this.scene, this.camera); // single static frame
    } else {
      this.clock = new THREE.Clock();
      this._loop();
    }
  }

  _buildOccluder() {
    this.occluder = new THREE.Mesh(
      new THREE.SphereGeometry(0.982, 48, 48),
      new THREE.MeshBasicMaterial({ color: DEEP })
    );
    this.globe.add(this.occluder);
  }

  _buildLandDots() {
    const step = this.quality === 'low' ? 3.4 : 1.9;
    const dots = buildLandDots(step);
    const pos = new Float32Array(dots.length * 3);
    const rnd = new Float32Array(dots.length);
    dots.forEach(([lat, lng], i) => {
      const v = latLngToVec3(lat, lng, 1.004);
      pos.set([v.x, v.y, v.z], i * 3);
      rnd[i] = Math.random();
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aRnd', new THREE.BufferAttribute(rnd, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uPx: { value: Math.min(window.devicePixelRatio || 1, 2) } },
      transparent: true,
      depthWrite: false,
      vertexShader: /* glsl */ `
        attribute float aRnd;
        uniform float uTime;
        uniform float uPx;
        varying float vA;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float tw = 0.68 + 0.32 * sin(uTime * 0.9 + aRnd * 6.2831);
          vA = tw;
          float size = (1.9 + aRnd * 1.3) * uPx;
          gl_PointSize = size * (3.6 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.12, d) * vA;
          vec3 col = mix(vec3(0.647, 0.709, 0.643), vec3(0.91, 0.88, 0.82), fract(vA * 7.0) * 0.55);
          gl_FragColor = vec4(col, a * 0.95);
        }
      `,
    });
    this.dotsMesh = new THREE.Points(geo, mat);
    this.globe.add(this.dotsMesh);
  }

  _buildAtmosphere() {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {},
      vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vN;
        void main() {
          float rim = pow(0.72 - dot(vN, vec3(0, 0, 1.0)), 3.0);
          gl_FragColor = vec4(0.72, 0.54, 0.28, rim * 0.7);
        }
      `,
    });
    this.atmo = new THREE.Mesh(new THREE.SphereGeometry(1.12, 48, 48), mat);
    this.scene.add(this.atmo);
  }

  _buildRoutes() {
    const [hq, ...offs] = this.points.length ? this.points : [{ lat: 32, lng: 53 }];
    const hqV = latLngToVec3(hq.lat, hq.lng, 1.02);

    this.markers = [];
    this.packets = [];
    this.routeGroup = new THREE.Group();
    this.globe.add(this.routeGroup);

    const dotMat = new THREE.MeshBasicMaterial({ color: GOLD_BRIGHT });
    const hqMat = new THREE.MeshBasicMaterial({ color: GOLD });
    this._addMarker(hqV, hqMat, 0.014, hq.hq);
    this._addLabel(hqV, hq);

    offs.forEach((p) => {
      const v = latLngToVec3(p.lat, p.lng, 1.02);
      this._addMarker(v, dotMat, 0.009, false);
      this._addLabel(v, p);
      // arc from HQ to office
      const mid = hqV.clone().add(v).normalize().multiplyScalar(1 + 0.35 * hqV.distanceTo(v));
      const curve = new THREE.QuadraticBezierCurve3(hqV, mid, v);
      const arcGeo = new THREE.TubeGeometry(curve, 48, 0.0035, 6, false);
      const arcMat = new THREE.MeshBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      this.routeGroup.add(new THREE.Mesh(arcGeo, arcMat));
      // traveling packet
      const packet = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 10, 10),
        new THREE.MeshBasicMaterial({ color: GOLD_BRIGHT, transparent: true, opacity: 0.95 })
      );
      packet.userData = { curve, t: Math.random(), speed: 0.0016 + Math.random() * 0.0012 };
      this.routeGroup.add(packet);
      this.packets.push(packet);
    });
  }

  _addMarker(v, mat, size, isHQ) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(size, 12, 12), mat);
    dot.position.copy(v);
    this.globe.add(dot);
    // pulse ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(size * 1.5, size * 2.1, 32),
      new THREE.MeshBasicMaterial({
        color: isHQ ? GOLD : SAGE,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    ring.position.copy(v.clone().multiplyScalar(1.004));
    ring.lookAt(v.clone().multiplyScalar(2));
    ring.userData = { t: Math.random() * Math.PI * 2, isHQ };
    this.globe.add(ring);
    this.markers.push(ring);
    return dot;
  }

  _addLabel(v, point) {
    if (!this.opts.labels) return;
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'globe-label';
    el.dataset.point = point.id || '';
    el.setAttribute('aria-label', point.name || '');
    this.wrapper.appendChild(el);
    const label = { el, v: v.clone() };
    (this.labels = this.labels || []).push(label);
  }

  _buildParticles() {
    if (this.quality === 'low') return;
    const N = 260;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(1.9 + Math.random() * 0.9);
      pos.set([v.x, v.y, v.z], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.particles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xe8e0d0,
        size: 0.012,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
        depthWrite: false,
      })
    );
    this.scene.add(this.particles);
  }

  _bindEvents() {
    const el = this.renderer.domElement;
    this._onDown = (e) => {
      this.dragging = true;
      this._px = e.clientX;
      this._py = e.clientY;
      el.setPointerCapture?.(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    this._onMove = (e) => {
      if (this.dragging) {
        const dx = e.clientX - this._px;
        const dy = e.clientY - this._py;
        this._px = e.clientX;
        this._py = e.clientY;
        this.globe.rotation.y += dx * 0.0052;
        this.globe.rotation.x = THREE.MathUtils.clamp(this.globe.rotation.x + dy * 0.0028, -0.65, 0.65);
        this.rotVel = dx * 0.0052;
      }
    };
    this._onUp = () => {
      this.dragging = false;
      el.style.cursor = 'grab';
    };
    this._onHover = (e) => {
      if (this.dragging) return;
      const r = this.wrapper.getBoundingClientRect();
      this.parallax.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.16;
      this.parallax.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.1;
    };
    el.addEventListener('pointerdown', this._onDown);
    el.addEventListener('pointermove', this._onMove);
    el.addEventListener('pointerup', this._onUp);
    el.addEventListener('pointerleave', this._onUp);
    this.wrapper.addEventListener('pointermove', this._onHover);

    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this.wrapper);
  }

  _observe() {
    this._io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (this.reduced) return;
          if (en.isIntersecting) this.start();
          else this.stop();
        });
      },
      { threshold: 0.05 }
    );
    this._io.observe(this.wrapper);
    document.addEventListener('visibilitychange', this._vis = () => {
      if (this.reduced) return;
      document.hidden ? this.stop() : this.start();
    });
  }

  _resize() {
    if (this.disposed) return;
    const rect = this.wrapper.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.renderer.setSize(rect.width, rect.height);
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    if (this.reduced) this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this.running || this.disposed || this.reduced) return;
    this.running = true;
    this.clock?.start();
    this._loop();
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  _loop() {
    if (!this.running || this.disposed) return;
    this.raf = requestAnimationFrame(() => this._loop());
    const dt = this.clock.getDelta();
    const t = this.clock.elapsedTime;

    if (!this.dragging) {
      this.globe.rotation.y += 0.0012 + this.rotVel * 0.4;
      this.rotVel *= 0.94;
    }

    // parallax
    this.parallax.x += (this.parallax.tx - this.parallax.x) * 0.06;
    this.parallax.y += (this.parallax.ty - this.parallax.y) * 0.06;
    this.camera.position.x = this.parallax.x;
    this.camera.position.y = 0.12 - this.parallax.y;
    this.camera.lookAt(0, 0, 0);

    // dots twinkle
    if (this.dotsMesh) this.dotsMesh.material.uniforms.uTime.value = t;

    // marker rings pulse
    this.markers.forEach((ring) => {
      ring.userData.t += dt * 1.6;
      const s = 1 + (Math.sin(ring.userData.t) * 0.5 + 0.5) * 1.6;
      ring.scale.setScalar(s);
      ring.material.opacity = Math.max(0, 0.65 * (1 - (s - 1) / 1.6));
    });

    // packets travel
    this.packets.forEach((p) => {
      p.userData.t = (p.userData.t + p.userData.speed * dt * 60) % 1;
      p.position.copy(p.userData.curve.getPoint(p.userData.t));
    });

    if (this.particles) this.particles.rotation.y -= dt * 0.02;

    // labels
    if (this.labels) this._projectLabels();

    this.renderer.render(this.scene, this.camera);
  }

  _projectLabels() {
    const rect = this.wrapper.getBoundingClientRect();
    const v = new THREE.Vector3();
    this.labels.forEach((l) => {
      v.copy(l.v).applyMatrix4(this.globe.matrixWorld).project(this.camera);
      const behind = v.z > 1;
      const x = ((v.x + 1) / 2) * rect.width;
      const y = ((-v.y + 1) / 2) * rect.height;
      const el = l.el;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      el.style.opacity = behind ? 0 : Math.max(0, 1 - Math.abs(v.x) * 0.7);
      el.style.pointerEvents = behind ? 'none' : 'auto';
    });
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this._io?.disconnect();
    this._ro?.disconnect();
    document.removeEventListener('visibilitychange', this._vis);
    this.scene?.traverse((obj) => {
      if (obj.geometry) obj.geometry.dispose?.();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
        else obj.material.dispose?.();
      }
    });
    this.labels?.forEach((l) => l.el.remove());
    this.renderer?.dispose();
    this.renderer?.domElement?.remove();
  }
}

export default TradeGlobe;
