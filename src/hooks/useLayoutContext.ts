import { useOutletContext } from 'react-router-dom';
import type { Product } from '../types';

interface LayoutContext {
  onOpenDetails: (product: Product) => void;
}

export function useLayoutContext() {
  return useOutletContext<LayoutContext>();
}
