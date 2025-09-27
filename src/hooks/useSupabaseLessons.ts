import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CurriculumLesson {
  id: string;
  subject: string;
  grade: number;
  unit_number: number;
  unit_title: string;
  lesson_title: string;
  lesson_description: string;
  lesson_type: 'theory' | 'mcq' | 'practical';
  xp_reward: number;
  order_sequence: number;
  is_active: boolean;
}

export interface LessonQuestion {
  id: string;
  lesson_id: string;
  question_text: string;
  question_type: string;
  choices: string[];
  correct_answer: string;
  explanation: string;
  marks: number;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  is_completed: boolean;
  is_unlocked: boolean;
  score: number;
  total_questions: number;
  completed_at: string | null;
}

export function useSupabaseLessons(grade?: number) {
  const [lessons, setLessons] = useState<CurriculumLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLessons() {
      try {
        let query = supabase
          .from('curriculum_lessons')
          .select('*')
          .eq('is_active', true)
          .order('order_sequence');

        if (grade) {
          query = query.eq('grade', grade);
        }

        const { data, error } = await query;

        if (error) throw error;

        setLessons((data || []).map(lesson => ({
          ...lesson,
          lesson_type: lesson.lesson_type as 'theory' | 'mcq' | 'practical'
        })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lessons');
      } finally {
        setLoading(false);
      }
    }

    fetchLessons();
  }, [grade]);

  return { lessons, loading, error };
}

export function useStudentProgress(studentId: string) {
  const [progress, setProgress] = useState<StudentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      if (!studentId) return;

      try {
        const { data, error } = await supabase
          .from('student_lesson_progress')
          .select('*')
          .eq('student_id', studentId);

        if (error) throw error;

        setProgress(data || []);
      } catch (err) {
        console.error('Failed to fetch student progress:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [studentId]);

  const updateProgress = async (lessonId: string, isCompleted: boolean, score: number = 0, totalQuestions: number = 0) => {
    try {
      const { error } = await supabase
        .from('student_lesson_progress')
        .upsert({
          student_id: studentId,
          lesson_id: lessonId,
          is_completed: isCompleted,
          is_unlocked: true,
          score,
          total_questions: totalQuestions,
          completed_at: isCompleted ? new Date().toISOString() : null,
        });

      if (error) throw error;

      // Refresh progress
      const { data } = await supabase
        .from('student_lesson_progress')
        .select('*')
        .eq('student_id', studentId);

      setProgress(data || []);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  return { progress, loading, updateProgress };
}