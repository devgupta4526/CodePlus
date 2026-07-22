import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import { getLessonContent, getAllLessonSlugs } from '@/lib/lessons';
import { getLessonBySlug, getAdjacentLessons } from '@/data/course';
import { LessonClient } from './LessonClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = getLessonBySlug(slug);
  if (!meta) return {};

  return {
    title: `${meta.title} — ${meta.chapterTitle}`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | CodePulse`,
      description: meta.description,
      type: 'article',
    },
  };
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lessonData = getLessonContent(slug);

  if (!lessonData) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(slug);

  return (
    <LessonClient
      meta={lessonData.meta}
      content={lessonData.content}
      headings={lessonData.headings}
      prev={prev}
      next={next}
    />
  );
}
