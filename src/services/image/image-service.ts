export async function convertImageFormat(
  file: File,
  outputFormat: "jpeg" | "png" | "webp",
  quality = 0.92
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;

  if (outputFormat === "jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const mimeType =
    outputFormat === "jpeg"
      ? "image/jpeg"
      : outputFormat === "png"
        ? "image/png"
        : "image/webp";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Image conversion failed")),
      mimeType,
      quality
    );
  });
}

export async function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect = true,
  quality = 0.92
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  let targetWidth = width;
  let targetHeight = height;

  if (maintainAspect) {
    const ratio = Math.min(width / img.width, height / img.height);
    targetWidth = Math.round(img.width * ratio);
    targetHeight = Math.round(img.height * ratio);
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Resize failed")),
      outputType,
      quality
    );
  });
}

export async function compressImage(
  file: File,
  quality = 0.8
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  const img = await loadImage(url);
  URL.revokeObjectURL(url);

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;

  if (file.type !== "image/png") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const mimeType =
    file.type === "image/png" ? "image/png" : "image/jpeg";

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Compression failed")),
      mimeType,
      quality
    );
  });
}

export function estimateCompressedSize(
  originalSize: number,
  quality: number
): number {
  return Math.round(originalSize * (0.3 + quality * 0.7));
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
