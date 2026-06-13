import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = 'C:/Users/lenovo/OneDrive/Pictures/Desktop/مجلد جديد0000000000/src/imports/image.png';
const dest = path.join(__dirname, 'src/imports/image.png');

// Ensure destination directory exists
const destDir = path.dirname(dest);
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied top banner image from Desktop!');
} else {
    console.log('Source image not found on Desktop. Skipping copy.');
}
