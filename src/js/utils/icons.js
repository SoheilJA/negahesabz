/**
 * Icon refresh — replaces <i data-lucide="..."> placeholders with inline SVGs.
 * Only the icons actually used are bundled (tree-shaken).
 */
import {
  createIcons,
  ArrowRight, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight,
  Coffee, CupSoda, Leaf, Nut, Flower2, Grape, Citrus, Milk, UtensilsCrossed,
  Building2, FlaskConical, SprayCan, CircleDot,
  Ship, TrainFront, LineChart, Apple,
  ArrowDownToLine, ArrowUpFromLine,
  Phone, Mail, MapPin, Globe, Search, X, Menu,
  Check, Info, Send, Package, Factory, Warehouse,
  Languages, Home, ArrowUp, Eye, Smartphone, FileText, BookOpen,
} from 'lucide';

const icons = {
  ArrowRight, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight,
  Coffee, CupSoda, Leaf, Nut, Flower2, Grape, Citrus, Milk, UtensilsCrossed,
  Building2, FlaskConical, SprayCan, CircleDot,
  Ship, TrainFront, LineChart, Apple,
  ArrowDownToLine, ArrowUpFromLine,
  Phone, Mail, MapPin, Globe, Search, X, Menu,
  Check, Info, Send, Package, Factory, Warehouse,
  Languages, Home, ArrowUp, Eye, Smartphone, FileText, BookOpen,
};

export function refreshIcons() {
  try {
    createIcons({ icons, nameAttr: 'data-lucide', attrs: { 'stroke-width': 1.7 } });
  } catch (e) {
    console.warn('[icons]', e.message);
  }
}

/** Icon placeholder string. */
export const icon = (name, cls = '') =>
  `<i data-lucide="${name}" ${cls ? `class="${cls}"` : ''} aria-hidden="true"></i>`;
