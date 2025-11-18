import { Unit, UnitConverter } from '../types';

/**
 * Standard DPI for print quality
 */
export const DEFAULT_DPI = 300;

/**
 * Conversion factors to pixels at 96 DPI (screen)
 */
const CONVERSION_FACTORS = {
  px: 1,
  pt: 96 / 72, // 1 pt = 1/72 inch
  mm: 96 / 25.4, // 1 inch = 25.4 mm
  cm: 96 / 2.54, // 1 inch = 2.54 cm
  in: 96, // 1 inch = 96 px at 96 DPI
};

/**
 * Unit converter implementation
 */
export const unitConverter: UnitConverter = {
  /**
   * Convert pixels to specified unit
   */
  fromPx(value: number, unit: Unit, dpi: number = DEFAULT_DPI): number {
    if (unit === 'px') return value;

    // Adjust for DPI difference from standard 96 DPI
    const dpiRatio = dpi / 96;
    const adjustedValue = value / dpiRatio;

    const factor = CONVERSION_FACTORS[unit];
    return adjustedValue / factor;
  },

  /**
   * Convert specified unit to pixels
   */
  toPx(value: number, unit: Unit, dpi: number = DEFAULT_DPI): number {
    if (unit === 'px') return value;

    const factor = CONVERSION_FACTORS[unit];
    const pxValue = value * factor;

    // Adjust for DPI difference from standard 96 DPI
    const dpiRatio = dpi / 96;
    return pxValue * dpiRatio;
  },
};

/**
 * Convert mm to pixels at given DPI
 */
export function mmToPx(mm: number, dpi: number = DEFAULT_DPI): number {
  return unitConverter.toPx(mm, 'mm', dpi);
}

/**
 * Convert pixels to mm at given DPI
 */
export function pxToMm(px: number, dpi: number = DEFAULT_DPI): number {
  return unitConverter.fromPx(px, 'mm', dpi);
}

/**
 * Convert points to pixels at given DPI
 */
export function ptToPx(pt: number, dpi: number = DEFAULT_DPI): number {
  return unitConverter.toPx(pt, 'pt', dpi);
}

/**
 * Convert pixels to points at given DPI
 */
export function pxToPt(px: number, dpi: number = DEFAULT_DPI): number {
  return unitConverter.fromPx(px, 'pt', dpi);
}
