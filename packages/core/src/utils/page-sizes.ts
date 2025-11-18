import { PageFormat, PageOrientation } from '../types';

/**
 * Page dimensions in mm
 */
interface PageDimensions {
  width: number;
  height: number;
}

/**
 * Standard page sizes in mm
 */
export const PAGE_SIZES: Record<PageFormat, PageDimensions> = {
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  Letter: { width: 215.9, height: 279.4 },
  Legal: { width: 215.9, height: 355.6 },
  Tabloid: { width: 279.4, height: 431.8 },
};

/**
 * Get page dimensions in mm considering orientation
 */
export function getPageDimensions(
  format: PageFormat,
  orientation: PageOrientation
): PageDimensions {
  const size = PAGE_SIZES[format];

  if (orientation === 'landscape') {
    return {
      width: size.height,
      height: size.width,
    };
  }

  return size;
}

/**
 * Get page dimensions in pixels at given DPI
 */
export function getPageDimensionsInPx(
  format: PageFormat,
  orientation: PageOrientation,
  dpi: number = 300
): PageDimensions {
  const dimensions = getPageDimensions(format, orientation);

  return {
    width: (dimensions.width / 25.4) * dpi,
    height: (dimensions.height / 25.4) * dpi,
  };
}

/**
 * Get printable area considering margins (in mm)
 */
export function getPrintableArea(
  format: PageFormat,
  orientation: PageOrientation,
  margin: { top: number; right: number; bottom: number; left: number }
): PageDimensions {
  const dimensions = getPageDimensions(format, orientation);

  return {
    width: dimensions.width - margin.left - margin.right,
    height: dimensions.height - margin.top - margin.bottom,
  };
}
