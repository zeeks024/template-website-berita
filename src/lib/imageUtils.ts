export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export type ImageProcessResult = {
    success: boolean;
    dataUrl?: string;
    error?: string;
};

/**
 * Validates file size and type
 */
export const validateImageFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
        return "File harus berupa gambar (JPEG, PNG, WEBP).";
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
        return `Ukuran file terlalu besar. Maksimal ${MAX_FILE_SIZE_MB}MB.`;
    }
    return null;
};

/**
 * Reads file as DataURL
 */
export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) resolve(e.target.result as string);
            else reject(new Error("Gagal membaca file"));
        };
        reader.onerror = () => reject(new Error("Gagal membaca file"));
        reader.readAsDataURL(file);
    });
};

/**
 * Smart Resize: Fits image into 16:9 ratio. 
 * If aspect ratio doesn't match, fills background with blurred version of the image.
 */
export const fitTo16By9 = (imgSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            // Target size (High Quality) - 16:9
            const TARGET_WIDTH = 1280;
            const TARGET_HEIGHT = 720;

            canvas.width = TARGET_WIDTH;
            canvas.height = TARGET_HEIGHT;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject("Canvas context error");

            // 1. Draw Blurred Background (Full Cover)
            ctx.filter = 'blur(20px) brightness(0.7)';
            // Draw slightly larger to avoid edges
            const scaleBg = Math.max(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height);
            const wBg = img.width * scaleBg;
            const hBg = img.height * scaleBg;
            ctx.drawImage(img, (TARGET_WIDTH - wBg) / 2, (TARGET_HEIGHT - hBg) / 2, wBg, hBg);

            // 2. Draw Main Image (Contain)
            ctx.filter = 'none'; // Reset filter

            // Calculate scale to fit
            const scaleFg = Math.min(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height);
            const wFg = img.width * scaleFg;
            const hFg = img.height * scaleFg;

            // Draw centered
            // Add slight shadow
            ctx.shadowColor = "rgba(0,0,0,0.5)";
            ctx.shadowBlur = 20;
            ctx.drawImage(img, (TARGET_WIDTH - wFg) / 2, (TARGET_HEIGHT - hFg) / 2, wFg, hFg);

            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = () => reject("Gagal memuat gambar");
        img.src = imgSrc;
    });
};

/**
 * Center Crop: Crops the center of the image to force 16:9
 */
export const cropTo16By9 = (imgSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const TARGET_WIDTH = 1280;
            const TARGET_HEIGHT = 720;
            canvas.width = TARGET_WIDTH;
            canvas.height = TARGET_HEIGHT;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject("Context error");

            // "Cover" logic
            const scale = Math.max(TARGET_WIDTH / img.width, TARGET_HEIGHT / img.height);
            const w = img.width * scale;
            const h = img.height * scale;

            // Draw centered
            ctx.drawImage(img, (TARGET_WIDTH - w) / 2, (TARGET_HEIGHT - h) / 2, w, h);

            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = imgSrc;
    });
};

export type CropArea = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const cropToRegion = (
    imgSrc: string,
    cropArea: CropArea,
    targetWidth: number = 1280,
    targetHeight: number = 720
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject("Context error");

            ctx.drawImage(
                img,
                cropArea.x,
                cropArea.y,
                cropArea.width,
                cropArea.height,
                0,
                0,
                targetWidth,
                targetHeight
            );

            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = () => reject("Gagal memuat gambar");
        img.src = imgSrc;
    });
};
