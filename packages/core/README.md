# @printbridge/core

Core layout and PDF generation engine for PrintBridge.

## Features

- **Text Auto-Fitting**: Binary search algorithm to find optimal font size
- **Image Layout**: Multiple fit strategies (contain, cover, fill, scale-down)
- **Unit Conversion**: Convert between px, mm, cm, in, pt
- **Page Sizes**: Standard paper formats (A4, A5, Letter, etc.)
- **Framework Agnostic**: Works in Node.js and browser environments

## Installation

```bash
npm install @printbridge/core
```

## Usage

### Text Fitting

```typescript
import { fitTextToArea } from '@printbridge/core';

const result = fitTextToArea(
  'Your text content here',
  { x: 0, y: 0, width: 400, height: 600 }, // Area
  {
    minFontSize: 12,
    maxFontSize: 48,
    lineHeight: 1.5,
    fontFamily: 'Arial',
  }
);

console.log(`Font size: ${result.fontSize}pt`);
console.log(`Lines: ${result.lines.length}`);
console.log(`Overflow: ${result.overflow}`);
```

### Image Layout

```typescript
import { calculateImageLayout } from '@printbridge/core';

const layout = calculateImageLayout(
  { width: 1920, height: 1080 }, // Original image size
  { x: 0, y: 0, width: 400, height: 300 }, // Container
  {
    src: 'image.jpg',
    fit: 'cover',
    position: { x: 50, y: 50 }, // Focal point
  }
);

console.log(`Rendered size: ${layout.width}x${layout.height}`);
```

### Unit Conversion

```typescript
import { mmToPx, pxToMm } from '@printbridge/core';

const pixels = mmToPx(210, 300); // A4 width at 300 DPI
const millimeters = pxToMm(2480, 300); // Convert back
```

### Page Sizes

```typescript
import { getPageDimensions, PAGE_SIZES } from '@printbridge/core';

const a4 = getPageDimensions('A4', 'portrait');
console.log(`A4 portrait: ${a4.width}mm x ${a4.height}mm`);

const a4Landscape = getPageDimensions('A4', 'landscape');
console.log(`A4 landscape: ${a4Landscape.width}mm x ${a4Landscape.height}mm`);
```

## API Reference

### fitTextToArea(text, area, constraints)

Automatically adjusts font size to fit text within the given area.

**Parameters:**
- `text` (string): Text content to fit
- `area` (Rectangle): Target area `{ x, y, width, height }`
- `constraints` (TextConstraints): Font and layout constraints

**Returns:** `RenderedText`
```typescript
{
  fontSize: number;     // Optimal font size in pt
  lines: string[];      // Text split into lines
  actualHeight: number; // Total height of rendered text
  actualWidth: number;  // Maximum line width
  overflow: boolean;    // True if text doesn't fit
}
```

### calculateImageLayout(imageSize, containerArea, config)

Calculates image dimensions and position based on fit strategy.

**Parameters:**
- `imageSize` (object): Original image size `{ width, height }`
- `containerArea` (Rectangle): Container area
- `config` (ImageConfig): Image configuration

**Returns:** `RenderedImage`

### Page Sizes

Supported formats: `A4`, `A5`, `Letter`, `Legal`, `Tabloid`

All dimensions are in millimeters.

## License

MIT
