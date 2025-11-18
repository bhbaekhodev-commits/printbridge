import { Rectangle, ImageConfig, RenderedImage } from '../types';

/**
 * Calculate rendered image dimensions and position based on fit strategy
 *
 * @param imageSize - Original image dimensions
 * @param containerArea - Container area to fit image into
 * @param config - Image configuration including fit strategy
 * @returns Rendered image with calculated dimensions and position
 */
export function calculateImageLayout(
  imageSize: { width: number; height: number },
  containerArea: Rectangle,
  config: ImageConfig
): RenderedImage {
  const { fit, position } = config;
  const containerWidth = containerArea.width;
  const containerHeight = containerArea.height;
  const imageAspect = imageSize.width / imageSize.height;
  const containerAspect = containerWidth / containerHeight;

  let result: RenderedImage;

  switch (fit) {
    case 'contain':
      result = calculateContainFit(imageSize, containerArea, imageAspect, containerAspect);
      break;

    case 'cover':
      result = calculateCoverFit(imageSize, containerArea, imageAspect, containerAspect, position);
      break;

    case 'fill':
      result = calculateFillFit(containerArea);
      break;

    case 'scale-down':
      result = calculateScaleDownFit(imageSize, containerArea, imageAspect, containerAspect);
      break;

    default:
      result = calculateContainFit(imageSize, containerArea, imageAspect, containerAspect);
  }

  return result;
}

/**
 * Contain: Scale image to fit within container while maintaining aspect ratio
 */
function calculateContainFit(
  _imageSize: { width: number; height: number },
  containerArea: Rectangle,
  imageAspect: number,
  containerAspect: number
): RenderedImage {
  let width: number;
  let height: number;

  if (imageAspect > containerAspect) {
    // Image is wider than container
    width = containerArea.width;
    height = width / imageAspect;
  } else {
    // Image is taller than container
    height = containerArea.height;
    width = height * imageAspect;
  }

  // Center the image
  const x = containerArea.x + (containerArea.width - width) / 2;
  const y = containerArea.y + (containerArea.height - height) / 2;

  return { width, height, x, y };
}

/**
 * Cover: Scale image to cover entire container while maintaining aspect ratio
 * May crop the image
 */
function calculateCoverFit(
  _imageSize: { width: number; height: number },
  containerArea: Rectangle,
  imageAspect: number,
  containerAspect: number,
  position?: { x: number; y: number }
): RenderedImage {
  let width: number;
  let height: number;
  let cropRect: Rectangle | undefined;

  if (imageAspect > containerAspect) {
    // Image is wider - fit height, crop width
    height = containerArea.height;
    width = height * imageAspect;

    // Calculate crop
    const excessWidth = width - containerArea.width;
    const focalX = position?.x ?? 50; // Default to center
    const cropX = (excessWidth * focalX) / 100;

    cropRect = {
      x: cropX,
      y: 0,
      width: containerArea.width,
      height: containerArea.height,
    };
  } else {
    // Image is taller - fit width, crop height
    width = containerArea.width;
    height = width / imageAspect;

    // Calculate crop
    const excessHeight = height - containerArea.height;
    const focalY = position?.y ?? 50; // Default to center
    const cropY = (excessHeight * focalY) / 100;

    cropRect = {
      x: 0,
      y: cropY,
      width: containerArea.width,
      height: containerArea.height,
    };
  }

  return {
    width,
    height,
    x: containerArea.x,
    y: containerArea.y,
    cropRect,
  };
}

/**
 * Fill: Stretch image to fill container (ignores aspect ratio)
 */
function calculateFillFit(containerArea: Rectangle): RenderedImage {
  return {
    width: containerArea.width,
    height: containerArea.height,
    x: containerArea.x,
    y: containerArea.y,
  };
}

/**
 * Scale-down: Same as contain, but never scale up beyond original size
 */
function calculateScaleDownFit(
  imageSize: { width: number; height: number },
  containerArea: Rectangle,
  imageAspect: number,
  containerAspect: number
): RenderedImage {
  const containFit = calculateContainFit(imageSize, containerArea, imageAspect, containerAspect);

  // Don't scale up beyond original size
  if (containFit.width > imageSize.width || containFit.height > imageSize.height) {
    const x = containerArea.x + (containerArea.width - imageSize.width) / 2;
    const y = containerArea.y + (containerArea.height - imageSize.height) / 2;

    return {
      width: imageSize.width,
      height: imageSize.height,
      x,
      y,
    };
  }

  return containFit;
}

/**
 * Calculate grid layout for multiple images
 *
 * @param images - Array of image configurations
 * @param containerArea - Container area to fit images into
 * @param columns - Number of columns (auto-calculated if not provided)
 * @param gap - Gap between images in pixels
 * @returns Array of rectangles for each image
 */
export function calculateGridLayout(
  images: ImageConfig[],
  containerArea: Rectangle,
  columns?: number,
  gap: number = 0
): Rectangle[] {
  const count = images.length;
  if (count === 0) return [];

  // Auto-calculate columns if not provided
  const cols = columns || Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const totalGapX = (cols - 1) * gap;
  const totalGapY = (rows - 1) * gap;

  const cellWidth = (containerArea.width - totalGapX) / cols;
  const cellHeight = (containerArea.height - totalGapY) / rows;

  const rectangles: Rectangle[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    rectangles.push({
      x: containerArea.x + col * (cellWidth + gap),
      y: containerArea.y + row * (cellHeight + gap),
      width: cellWidth,
      height: cellHeight,
    });
  }

  return rectangles;
}

/**
 * Calculate masonry layout for multiple images
 * (Pinterest-style layout with varying heights)
 *
 * @param images - Array of image configurations with sizes
 * @param containerArea - Container area
 * @param columns - Number of columns
 * @param gap - Gap between images
 * @returns Array of rectangles for each image
 */
export function calculateMasonryLayout(
  images: Array<ImageConfig & { size: { width: number; height: number } }>,
  containerArea: Rectangle,
  columns: number = 3,
  gap: number = 0
): Rectangle[] {
  if (images.length === 0) return [];

  const totalGapX = (columns - 1) * gap;
  const columnWidth = (containerArea.width - totalGapX) / columns;

  // Track the current height of each column
  const columnHeights = new Array(columns).fill(0);
  const rectangles: Rectangle[] = [];

  for (const image of images) {
    // Find column with minimum height
    let minHeight = Infinity;
    let minColumn = 0;
    for (let col = 0; col < columns; col++) {
      if (columnHeights[col] < minHeight) {
        minHeight = columnHeights[col];
        minColumn = col;
      }
    }

    // Calculate image height maintaining aspect ratio
    const aspectRatio = image.size.width / image.size.height;
    const imageHeight = columnWidth / aspectRatio;

    const x = containerArea.x + minColumn * (columnWidth + gap);
    const y = containerArea.y + columnHeights[minColumn];

    rectangles.push({
      x,
      y,
      width: columnWidth,
      height: imageHeight,
    });

    // Update column height
    columnHeights[minColumn] += imageHeight + gap;
  }

  return rectangles;
}
