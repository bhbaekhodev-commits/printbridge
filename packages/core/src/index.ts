/**
 * PrintBridge Core
 *
 * Core layout and PDF generation engine for web-to-print functionality
 */

// Type definitions
export * from './types';

// Layout engines
export {
  fitTextToArea,
  measureTextBounds,
  setTextMeasurer,
  getTextMeasurer,
  SimpleTextMeasurer,
  type TextMeasurer,
} from './layout/text-fitter';

export {
  calculateImageLayout,
  calculateGridLayout,
  calculateMasonryLayout,
} from './layout/image-layout';

// Utilities
export {
  unitConverter,
  mmToPx,
  pxToMm,
  ptToPx,
  pxToPt,
  DEFAULT_DPI,
} from './utils/units';

export {
  PAGE_SIZES,
  getPageDimensions,
  getPageDimensionsInPx,
  getPrintableArea,
} from './utils/page-sizes';

// Version
export const VERSION = '0.1.0';
