import { Rectangle, TextConstraints, RenderedText } from '../types';

/**
 * Text measurement interface
 * This will be implemented differently in browser vs Node.js environment
 */
export interface TextMeasurer {
  measureText(
    text: string,
    fontSize: number,
    fontFamily: string,
    fontWeight?: string
  ): { width: number; height: number };
}

/**
 * Simple text measurer for server-side (approximation)
 * In production, use canvas.measureText() in browser or proper font metrics library
 */
export class SimpleTextMeasurer implements TextMeasurer {
  measureText(
    text: string,
    fontSize: number,
    _fontFamily: string,
    _fontWeight?: string
  ): { width: number; height: number } {
    // Approximate: average character width is about 0.6 * fontSize
    // This is a rough estimate; real implementation should use proper font metrics
    const avgCharWidth = fontSize * 0.6;
    const width = text.length * avgCharWidth;
    const height = fontSize;

    return { width, height };
  }
}

/**
 * Default text measurer instance
 */
let defaultMeasurer: TextMeasurer = new SimpleTextMeasurer();

/**
 * Set custom text measurer (e.g., for browser environment)
 */
export function setTextMeasurer(measurer: TextMeasurer): void {
  defaultMeasurer = measurer;
}

/**
 * Get current text measurer
 */
export function getTextMeasurer(): TextMeasurer {
  return defaultMeasurer;
}

/**
 * Split text into words for wrapping
 */
function splitIntoWords(text: string): string[] {
  return text.split(/\s+/).filter((word) => word.length > 0);
}

/**
 * Wrap text into lines that fit within given width
 */
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  fontWeight?: string,
  measurer: TextMeasurer = defaultMeasurer
): string[] {
  const words = splitIntoWords(text);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const { width } = measurer.measureText(testLine, fontSize, fontFamily, fontWeight);

    if (width <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length > 0 ? lines : [''];
}

/**
 * Calculate if text fits in area at given font size
 */
function doesTextFit(
  text: string,
  area: Rectangle,
  fontSize: number,
  constraints: TextConstraints,
  measurer: TextMeasurer = defaultMeasurer
): { fits: boolean; lines: string[]; actualHeight: number } {
  const padding = constraints.padding || { top: 0, right: 0, bottom: 0, left: 0 };
  const availableWidth = area.width - padding.left - padding.right;
  const availableHeight = area.height - padding.top - padding.bottom;

  const lines = wrapText(
    text,
    availableWidth,
    fontSize,
    constraints.fontFamily,
    constraints.fontWeight,
    measurer
  );

  const lineHeight = fontSize * constraints.lineHeight;
  const totalHeight = lines.length * lineHeight;

  return {
    fits: totalHeight <= availableHeight,
    lines,
    actualHeight: totalHeight,
  };
}

/**
 * Binary search to find maximum font size that fits
 */
function findMaxFontSize(
  text: string,
  area: Rectangle,
  constraints: TextConstraints,
  measurer: TextMeasurer = defaultMeasurer
): { fontSize: number; lines: string[]; actualHeight: number; overflow: boolean } {
  let minSize = constraints.minFontSize;
  let maxSize = constraints.maxFontSize;
  let bestFit = minSize;
  let bestLines: string[] = [];
  let bestHeight = 0;

  // Binary search for optimal font size
  while (maxSize - minSize > 0.5) {
    const midSize = (minSize + maxSize) / 2;
    const result = doesTextFit(text, area, midSize, constraints, measurer);

    if (result.fits) {
      bestFit = midSize;
      bestLines = result.lines;
      bestHeight = result.actualHeight;
      minSize = midSize; // Try larger
    } else {
      maxSize = midSize; // Try smaller
    }
  }

  // Check if even minimum size doesn't fit
  const minResult = doesTextFit(text, area, constraints.minFontSize, constraints, measurer);
  const overflow = !minResult.fits;

  if (overflow) {
    // Use minimum size even if it overflows
    return {
      fontSize: constraints.minFontSize,
      lines: minResult.lines,
      actualHeight: minResult.actualHeight,
      overflow: true,
    };
  }

  return {
    fontSize: bestFit,
    lines: bestLines,
    actualHeight: bestHeight,
    overflow: false,
  };
}

/**
 * Fit text to area with automatic font size adjustment
 *
 * This is the core algorithm that adjusts font size to maximize text within given area
 *
 * @param text - Text content to fit
 * @param area - Rectangle area to fit text into
 * @param constraints - Text constraints including font size limits
 * @param measurer - Optional text measurer (uses default if not provided)
 * @returns Rendered text result with optimal font size and line breaks
 */
export function fitTextToArea(
  text: string,
  area: Rectangle,
  constraints: TextConstraints,
  measurer?: TextMeasurer
): RenderedText {
  const usedMeasurer = measurer || defaultMeasurer;

  if (!text || text.trim().length === 0) {
    return {
      fontSize: constraints.minFontSize,
      lines: [],
      actualHeight: 0,
      actualWidth: 0,
      overflow: false,
    };
  }

  const result = findMaxFontSize(text, area, constraints, usedMeasurer);

  // Calculate actual width (max line width)
  let maxLineWidth = 0;
  for (const line of result.lines) {
    const { width } = usedMeasurer.measureText(
      line,
      result.fontSize,
      constraints.fontFamily,
      constraints.fontWeight
    );
    maxLineWidth = Math.max(maxLineWidth, width);
  }

  return {
    fontSize: result.fontSize,
    lines: result.lines,
    actualHeight: result.actualHeight,
    actualWidth: maxLineWidth,
    overflow: result.overflow,
  };
}

/**
 * Calculate text bounds without fitting
 * Useful for measuring existing text at specific font size
 */
export function measureTextBounds(
  text: string,
  fontSize: number,
  constraints: TextConstraints,
  maxWidth: number,
  measurer?: TextMeasurer
): { lines: string[]; width: number; height: number } {
  const usedMeasurer = measurer || defaultMeasurer;

  const lines = wrapText(
    text,
    maxWidth,
    fontSize,
    constraints.fontFamily,
    constraints.fontWeight,
    usedMeasurer
  );

  let maxLineWidth = 0;
  for (const line of lines) {
    const { width } = usedMeasurer.measureText(
      line,
      fontSize,
      constraints.fontFamily,
      constraints.fontWeight
    );
    maxLineWidth = Math.max(maxLineWidth, width);
  }

  const height = lines.length * fontSize * constraints.lineHeight;

  return {
    lines,
    width: maxLineWidth,
    height,
  };
}
