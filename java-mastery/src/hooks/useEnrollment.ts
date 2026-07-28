'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const SUPABASE_CONFIGURED =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url';

export interface UseEnrollmentReturn {
  user: User | null;
  enrollments: string[];     // array of course IDs the user is enrolled in
  loading: boolean;
  isEnrolled: (courseId: string) => boolean;
  enroll: (courseId: string) => Promise<void>;
}

export function useEnrollment(): UseEnrollmentReturn {
  const [user, setUser] = useState<User | null>(null);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        fetchEnrollments(user.id, supabase);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          fetchEnrollments(currentUser.id, supabase);
        } else {
          setEnrollments([]);
          setLoading(false);
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchEnrollments(userId: string, supabase: ReturnType<typeof createClient>) {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', userId);

      if (!error && data) {
        setEnrollments(data.map((row: { course_id: string }) => row.course_id));
      }
    } catch {
      // Gracefully handle if table doesn't exist yet
    } finally {
      setLoading(false);
    }
  }

  const isEnrolled = useCallback(
    (courseId: string) => enrollments.includes(courseId),
    [enrollments],
  );

  const enroll = useCallback(
    async (courseId: string) => {
      if (!user || !SUPABASE_CONFIGURED) return;
      const supabase = createClient();
      try {
        const { error } = await supabase.from('enrollments').insert({
          user_id: user.id,
          course_id: courseId,
          payment_status: 'free',
        });
        if (!error) {
          setEnrollments((prev) => [...prev, courseId]);
        }
      } catch {
        // Ignore — table may not exist in dev
      }
    },
    [user],
  );

  return { user, enrollments, loading, isEnrolled, enroll };
}
