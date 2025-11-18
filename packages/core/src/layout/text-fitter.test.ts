import { describe, it, expect, beforeEach } from 'vitest';
import { fitTextToArea, SimpleTextMeasurer, setTextMeasurer } from './text-fitter';
import { Rectangle, TextConstraints } from '../types';

describe('fitTextToArea', () => {
  beforeEach(() => {
    // Reset to default measurer
    setTextMeasurer(new SimpleTextMeasurer());
  });

  it('should fit short text in large area', () => {
    const text = 'Hello World';
    const area: Rectangle = { x: 0, y: 0, width: 500, height: 300 };
    const constraints: TextConstraints = {
      minFontSize: 12,
      maxFontSize: 72,
      lineHeight: 1.5,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    expect(result.overflow).toBe(false);
    expect(result.fontSize).toBeGreaterThanOrEqual(constraints.minFontSize);
    expect(result.fontSize).toBeLessThanOrEqual(constraints.maxFontSize);
    expect(result.lines.length).toBeGreaterThan(0);
  });

  it('should use minimum font size for very long text in small area', () => {
    const text = 'This is a very long text that will definitely overflow the given area';
    const area: Rectangle = { x: 0, y: 0, width: 100, height: 50 };
    const constraints: TextConstraints = {
      minFontSize: 8,
      maxFontSize: 24,
      lineHeight: 1.2,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    // Binary search stops at 0.5 precision, so allow small tolerance
    expect(result.fontSize).toBeLessThanOrEqual(constraints.minFontSize + 1);
    expect(result.fontSize).toBeGreaterThanOrEqual(constraints.minFontSize);
  });

  it('should handle empty text', () => {
    const text = '';
    const area: Rectangle = { x: 0, y: 0, width: 200, height: 200 };
    const constraints: TextConstraints = {
      minFontSize: 12,
      maxFontSize: 48,
      lineHeight: 1.5,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    expect(result.lines).toEqual([]);
    expect(result.actualHeight).toBe(0);
    expect(result.actualWidth).toBe(0);
  });

  it('should respect padding constraints', () => {
    const text = 'Test';
    const area: Rectangle = { x: 0, y: 0, width: 200, height: 200 };
    const constraints: TextConstraints = {
      minFontSize: 12,
      maxFontSize: 48,
      lineHeight: 1.5,
      fontFamily: 'Arial',
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
    };

    const result = fitTextToArea(text, area, constraints);

    // With padding, available space is reduced
    // Font size should be smaller than without padding
    const constraintsNoPadding: TextConstraints = {
      ...constraints,
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    };
    const resultNoPadding = fitTextToArea(text, area, constraintsNoPadding);

    expect(result.fontSize).toBeLessThanOrEqual(resultNoPadding.fontSize);
  });

  it('should wrap text into multiple lines', () => {
    const text = 'This is a test sentence that should wrap';
    const area: Rectangle = { x: 0, y: 0, width: 150, height: 200 };
    const constraints: TextConstraints = {
      minFontSize: 12,
      maxFontSize: 24,
      lineHeight: 1.5,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    // Should have multiple lines
    expect(result.lines.length).toBeGreaterThan(1);
  });

  it('should maximize font size within constraints', () => {
    const text = 'Hi';
    const area: Rectangle = { x: 0, y: 0, width: 400, height: 400 };
    const constraints: TextConstraints = {
      minFontSize: 12,
      maxFontSize: 72,
      lineHeight: 1.5,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    // For very short text in large area, should use close to max font size
    expect(result.fontSize).toBeGreaterThan(constraints.maxFontSize * 0.5);
  });

  it('should indicate overflow when text does not fit', () => {
    const text = 'This text is way too long to fit in this tiny area even at minimum size';
    const area: Rectangle = { x: 0, y: 0, width: 50, height: 30 };
    const constraints: TextConstraints = {
      minFontSize: 10,
      maxFontSize: 20,
      lineHeight: 1.2,
      fontFamily: 'Arial',
    };

    const result = fitTextToArea(text, area, constraints);

    expect(result.overflow).toBe(true);
    expect(result.fontSize).toBe(constraints.minFontSize);
  });
});
