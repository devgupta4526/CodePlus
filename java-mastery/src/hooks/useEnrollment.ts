'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const SUPABASE_CONFIGURED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' &&
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

export interface UseEnrollmentReturn {
  user: User | null;
  enrollments: string[];
  loading: boolean;
  error: string | null;
  enrollingCourseId: string | null;
  isEnrolled: (courseId: string) => boolean;
  enroll: (courseId: string) => Promise<void>;
}

export function useEnrollment(): UseEnrollmentReturn {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [loading, setLoading] = useState(Boolean(SUPABASE_CONFIGURED));
  const [error, setError] = useState<string | null>(
    SUPABASE_CONFIGURED ? null : 'Supabase is not configured for this environment.',
  );
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);

  const fetchEnrollments = useCallback(async (
    userId: string,
    supabase: ReturnType<typeof createClient>,
  ) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', userId);

      if (fetchError) throw fetchError;
      setEnrollments((data ?? []).map((row: { course_id: string }) => row.course_id));
      setError(null);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Could not load enrollments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: currentUser }, error: authError }) => {
      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      setUser(currentUser);
      if (currentUser) {
        void fetchEnrollments(currentUser.id, supabase);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          void fetchEnrollments(currentUser.id, supabase);
        } else {
          setEnrollments([]);
          setLoading(false);
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [fetchEnrollments]);

  const isEnrolled = useCallback(
    (courseId: string) => enrollments.includes(courseId),
    [enrollments],
  );

  const enroll = useCallback(
    async (courseId: string) => {
      if (!SUPABASE_CONFIGURED) {
        throw new Error('Supabase is not configured for this environment.');
      }
      if (!user) {
        throw new Error('Sign in before enrolling in a course.');
      }
      if (enrollments.includes(courseId)) return;

      const supabase = createClient();
      setEnrollingCourseId(courseId);
      setError(null);

      try {
        const { error: insertError } = await supabase
          .from('enrollments')
          .upsert(
            {
              user_id: user.id,
              course_id: courseId,
            },
            { onConflict: 'user_id,course_id', ignoreDuplicates: true },
          );

        if (insertError) throw insertError;
        setEnrollments((previous) =>
          previous.includes(courseId) ? previous : [...previous, courseId],
        );
      } catch (enrollError) {
        const message = enrollError instanceof Error
          ? enrollError.message
          : 'Enrollment failed. Please try again.';
        setError(message);
        throw new Error(message);
      } finally {
        setEnrollingCourseId(null);
      }
    },
    [enrollments, user],
  );

  return {
    user,
    enrollments,
    loading,
    error,
    enrollingCourseId,
    isEnrolled,
    enroll,
  };
}
