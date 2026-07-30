import fs from 'fs';
import path from 'path';
import { type ImageNote } from '@/types';

const IMAGE_NOTES_BASE_DIR = path.join(process.cwd(), 'public', 'ImageNotes', 'Java');

/** Known slug to folder mappings (case-insensitive fallback used if not mapped directly) */
const SLUG_TO_FOLDER_MAP: Record<string, string> = {
  'oop-fundamentals': 'OOPs',
  'how-java-works': 'java-overview',
};

/** Get list of image notes for a given lesson slug (Server-only) */
export function getImageNotesForLesson(slug: string): ImageNote[] {
  try {
    if (!fs.existsSync(IMAGE_NOTES_BASE_DIR)) {
      return [];
    }

    // Determine target folder name
    let targetFolder = SLUG_TO_FOLDER_MAP[slug];

    if (!targetFolder) {
      const subdirs = fs.readdirSync(IMAGE_NOTES_BASE_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      const match = subdirs.find(
        dir => dir.toLowerCase() === slug.toLowerCase() ||
               dir.toLowerCase().replace(/[^a-z0-9]/g, '') === slug.toLowerCase().replace(/[^a-z0-9]/g, '')
      );
      if (match) {
        targetFolder = match;
      }
    }

    if (!targetFolder) {
      return [];
    }

    const folderPath = path.join(IMAGE_NOTES_BASE_DIR, targetFolder);
    if (!fs.existsSync(folderPath)) {
      return [];
    }

    const files = fs.readdirSync(folderPath);
    // ONLY static images allowed
    const validExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);

    const imageNotes: ImageNote[] = [];

    files.forEach((file, index) => {
      const ext = path.extname(file).toLowerCase();
      if (!validExtensions.has(ext)) return;

      const baseName = path.basename(file, ext);

      // Extract true serial number from Image_XX or Image-XX (e.g. Image_12 -> order 12)
      const imageNumMatch = baseName.match(/Image[_\s-]?(\d+)/i) || baseName.match(/^(\d+)/);
      const order = imageNumMatch ? parseInt(imageNumMatch[1], 10) : index + 1;

      // Extract section number if present
      const sectionMatch = baseName.match(/^(\d+)_/);
      const sectionNumber = sectionMatch ? parseInt(sectionMatch[1], 10) : undefined;

      // Format clean readable title
      let cleanTitle = baseName
        .replace(/^\d+_/, '')
        .replace(/^Image_\d+_/, '')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .trim();

      cleanTitle = cleanTitle
        .replace(/\bDefinit\b/i, 'Definition')
        .replace(/\bObjec\b/i, 'Object')
        .replace(/\bProcedur\b/i, 'Procedural')
        .replace(/\bTem\b/i, 'Template')
        .replace(/\bCor\b/i, 'Core')
        .replace(/\bAnal\b/i, 'Analogy')
        .replace(/\bInt\b/i, 'Interface')
        .replace(/\bAdv\b/i, 'Advantage')
        .replace(/\bRelationshi\b/i, 'Relationship')
        .replace(/\bOverloadi\b/i, 'Overloading')
        .replace(/\bOverridin\b/i, 'Overriding')
        .replace(/\bQuesti\b/i, 'Questions');

      if (!cleanTitle || cleanTitle.length < 2) {
        cleanTitle = `Visual Note ${order}`;
      }

      // Keywords for section matching
      const keywords = cleanTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2);

      imageNotes.push({
        id: `${slug}-note-${order}-${index + 1}`,
        filename: file,
        url: `/ImageNotes/Java/${targetFolder}/${file}`,
        type: 'image',
        title: cleanTitle,
        order,
        sectionNumber,
        keywords,
      });
    });

    // Strictly sort by image serial number order ascending
    imageNotes.sort((a, b) => a.order - b.order);
    return imageNotes;
  } catch (err) {
    console.error(`Error loading image notes for ${slug}:`, err);
    return [];
  }
}
