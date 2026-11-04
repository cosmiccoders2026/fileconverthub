
export type ImageOutputFormat = "jpeg" | "png" | "webp";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Unable to load image."));
    img.src = src;
  });
}

async function createCanvas(
  file: File,
  maxWidth?: number,
  maxHeight?: number
): Promise<HTMLCanvasElement> {
  const url = URL.createObjectURL(file);

  try {
    const img = await loadImage(url);

    let width = img.naturalWidth;
    let height = img.naturalHeight;

    if (maxWidth || maxHeight) {
      const scale = Math.min(
        1,
        (maxWidth ?? width) / width,
        (maxHeight ?? height) / height
      );

      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas is not supported by this browser.");
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Image encoding failed."));
          return;
        }

        if (blob.type !== mimeType) {
          reject(
            new Error(
              `Your browser does not support ${mimeType} encoding.`
            )
          );
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

function getMimeType(format: ImageOutputFormat): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
  }
}

export async function convertImageFormat(
  file: File,
  outputFormat: ImageOutputFormat,
  quality = 0.85
): Promise<Blob> {
  const canvas = await createCanvas(file);

  const mimeType = getMimeType(outputFormat);

  if (outputFormat === "jpeg") {
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context unavailable.");

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }

  return canvasToBlob(
    canvas,
    mimeType,
    outputFormat === "png" ? undefined : quality
  );
}

export async function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect = true,
  quality = 0.85
): Promise<Blob> {
  const url = URL.createObjectURL(file);

  try {
    const img = await loadImage(url);

    let targetWidth = Math.max(1, Math.round(width));
    let targetHeight = Math.max(1, Math.round(height));

    if (maintainAspect) {
      const ratio = Math.min(
        targetWidth / img.naturalWidth,
        targetHeight / img.naturalHeight
      );

      targetWidth = Math.max(1, Math.round(img.naturalWidth * ratio));
      targetHeight = Math.max(1, Math.round(img.naturalHeight * ratio));
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context unavailable.");

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const outputType =
      file.type === "image/png" ? "image/png" : "image/jpeg";

    if (outputType === "image/jpeg") {
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.globalCompositeOperation = "source-over";
    }

    return canvasToBlob(
      canvas,
      outputType,
      outputType === "image/png" ? undefined : quality
    );
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function compressImage(
  file: File,
  quality = 0.7,
  outputFormat?: ImageOutputFormat
): Promise<Blob> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  const format =
    outputFormat ??
    (file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpeg");

  const mimeType = getMimeType(format);

  const canvas = await createCanvas(file);

  if (format === "jpeg") {
    const ctx = canvas.getContext("2d");

    if (!ctx) throw new Error("Canvas context unavailable.");

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
  }

  return canvasToBlob(
    canvas,
    mimeType,
    format === "png"
      ? undefined
      : Math.min(1, Math.max(0.1, quality))
  );
}

export function estimateCompressedSize(
  originalSize: number,
  quality: number
): number {
  // This is only a rough estimate.
  // Use compressedBlob.size for actual results.
  return Math.round(originalSize * (0.3 + quality * 0.7));
}
