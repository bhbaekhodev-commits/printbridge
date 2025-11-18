/**
 * Core type definitions for PrintBridge
 */

/**
 * Represents a 2D rectangle with position and dimensions
 */
export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Represents a point in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Page format configurations
 */
export type PageFormat = 'A4' | 'A5' | 'Letter' | 'Legal' | 'Tabloid';

/**
 * Page orientation
 */
export type PageOrientation = 'portrait' | 'landscape';

/**
 * Page configuration
 */
export interface PageConfig {
  format: PageFormat;
  orientation: PageOrientation;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  dpi?: number; // Default: 300
}

/**
 * Text alignment options
 */
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Vertical alignment options
 */
export type VerticalAlign = 'top' | 'middle' | 'bottom';

/**
 * Font weight options
 */
export type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Text constraints for auto-fitting algorithm
 */
export interface TextConstraints {
  minFontSize: number; // Minimum font size in pt
  maxFontSize: number; // Maximum font size in pt
  lineHeight: number; // Line height multiplier (e.g., 1.5)
  fontFamily: string;
  fontWeight?: FontWeight;
  textAlign?: TextAlign;
  verticalAlign?: VerticalAlign;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

/**
 * Rendered text result from auto-fitting
 */
export interface RenderedText {
  fontSize: number;
  lines: string[];
  actualHeight: number;
  actualWidth: number;
  overflow: boolean; // True if text doesn't fit even at minimum font size
}

/**
 * Image fit strategies
 */
export type ImageFit = 'cover' | 'contain' | 'fill' | 'scale-down';

/**
 * Image configuration
 */
export interface ImageConfig {
  src: string;
  alt?: string;
  fit: ImageFit;
  position?: {
    x: number; // 0-100 percentage for focal point
    y: number; // 0-100 percentage for focal point
  };
}

/**
 * Rendered image result
 */
export interface RenderedImage {
  width: number;
  height: number;
  x: number;
  y: number;
  cropRect?: Rectangle; // Crop rectangle if needed
}

/**
 * Layout element types
 */
export type ElementType = 'text' | 'image' | 'container';

/**
 * Base layout element
 */
export interface LayoutElement {
  id: string;
  type: ElementType;
  area: Rectangle;
  zIndex?: number;
}

/**
 * Text layout element
 */
export interface TextElement extends LayoutElement {
  type: 'text';
  content: string;
  constraints: TextConstraints;
  rendered?: RenderedText;
}

/**
 * Image layout element
 */
export interface ImageElement extends LayoutElement {
  type: 'image';
  config: ImageConfig;
  rendered?: RenderedImage;
}

/**
 * Container layout element (for grouping)
 */
export interface ContainerElement extends LayoutElement {
  type: 'container';
  children: LayoutElement[];
}

/**
 * Template configuration
 */
export interface Template {
  id: string;
  name: string;
  description?: string;
  pageConfig: PageConfig;
  elements: LayoutElement[];
}

/**
 * Layout strategy for automatic placement
 */
export type LayoutStrategy = 'grid' | 'masonry' | 'flow' | 'custom';

/**
 * PDF generation options
 */
export interface PDFGenerationOptions {
  template: Template;
  engine?: 'client' | 'server'; // client: html2canvas+jsPDF, server: Puppeteer
  quality?: number; // 0-100, default 90
  compression?: boolean;
  metadata?: {
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string[];
    creator?: string;
  };
}

/**
 * Measurement units
 */
export type Unit = 'px' | 'mm' | 'cm' | 'in' | 'pt';

/**
 * Convert between units
 */
export interface UnitConverter {
  fromPx(value: number, unit: Unit, dpi?: number): number;
  toPx(value: number, unit: Unit, dpi?: number): number;
}
