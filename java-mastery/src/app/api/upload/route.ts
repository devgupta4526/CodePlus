import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No video file provided' }, { status: 400 });
    }

    const mimeType = file.type;
    const isVideo = mimeType.startsWith('video/') || /\.(mp4|webm|ogg|mov|mkv)$/i.test(file.name);
    if (!isVideo) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Please upload a valid video file (MP4, WebM, MOV).' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Sanitize filename and create unique timestamped name
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizedName}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, buffer);

    const videoUrl = `/uploads/videos/${filename}`;

    return NextResponse.json({
      success: true,
      url: videoUrl,
      filename: file.name,
      size: file.size,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Video upload failed' },
      { status: 500 }
    );
  }
}
