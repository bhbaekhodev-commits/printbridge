# PrintBridge

> Web-to-Print module for converting web content to high-quality PDFs

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

## Problem Statement

When creating exhibition websites, a common pain point is converting web content to print-ready PDFs:

1. **Layout breaks** when converting web pages to PDF
2. **Manual work** required to adjust layouts for different paper sizes (A4, booklet, etc.)
3. **Text sizing** doesn't automatically fit within designated areas
4. **Repetitive process** for each page/exhibition

PrintBridge solves this by providing a flexible, reusable module that automatically fits web content to print layouts.

## Features

- **Automatic Text Fitting**: Adjusts font size to maximize text within designated areas
- **Smart Image Layout**: Supports multiple fit strategies (cover, contain, fill)
- **Multiple Page Formats**: A4, A5, Letter, Legal, Tabloid
- **Template System**: Pre-built templates with customization options
- **Framework Agnostic**: Core library works anywhere, with React components available
- **TypeScript First**: Fully typed API for great developer experience

## Quick Start

### Installation

```bash
# Core library (framework-agnostic)
npm install @printbridge/core

# React components
npm install @printbridge/react
```

### Basic Usage

```typescript
import { fitTextToArea } from '@printbridge/core';

const text = 'Your exhibition text here...';
const area = { x: 0, y: 0, width: 400, height: 600 };
const constraints = {
  minFontSize: 12,
  maxFontSize: 48,
  lineHeight: 1.5,
  fontFamily: 'Arial',
};

const result = fitTextToArea(text, area, constraints);
console.log(`Optimal font size: ${result.fontSize}pt`);
console.log(`Lines: ${result.lines.join('\n')}`);
```

## Project Structure

This is a monorepo managed with Turborepo:

```
printbridge/
├── packages/
│   ├── core/          # Core layout engine (framework-agnostic)
│   └── react/         # React components
├── apps/
│   └── demo/          # Next.js demo application
└── examples/
    └── exhibition-website/  # Real-world usage example
```

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/printbridge.git
cd printbridge

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Start demo app
npm run dev
```

### Commands

- `npm run build` - Build all packages
- `npm run dev` - Run all packages in development mode
- `npm run test` - Run tests across all packages
- `npm run lint` - Lint all packages
- `npm run format` - Format code with Prettier

## Roadmap

### Phase 1: MVP (Current)
- [x] Core text fitting algorithm
- [x] Image layout engine
- [x] Basic utilities (units, page sizes)
- [x] TypeScript types
- [ ] React components
- [ ] Demo application

### Phase 2: Templates
- [ ] A4 portrait/landscape templates
- [ ] Booklet template (2-up printing)
- [ ] Template customization UI
- [ ] Save/load layouts

### Phase 3: PDF Generation
- [ ] Client-side PDF generation (html2canvas + jsPDF)
- [ ] Server-side PDF generation (Puppeteer)
- [ ] High-quality output options
- [ ] Batch processing

### Phase 4: Advanced Features
- [ ] Collaborative editing
- [ ] Cloud storage integration
- [ ] i18n support
- [ ] Advanced typography controls

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Author

Created to solve real-world exhibition website printing challenges.

## Acknowledgments

- Inspired by the need for seamless web-to-print workflows
- Built with TypeScript, React, and Next.js
- Powered by Turborepo

---

**PrintBridge** - Bridging the gap between web and print.
