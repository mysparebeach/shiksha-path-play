import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseLessons, useStudentProgress } from '@/hooks/useSupabaseLessons';
import LessonCard from '@/components/LessonCard';
import QuizComponent from '@/components/QuizComponent';

type LessonView = 'list' | 'lesson' | 'quiz';

interface SubjectLessonsProps {
  subjectId: string;
  onBack: () => void;
}

export default function SubjectLessons({ subjectId, onBack }: SubjectLessonsProps) {
  const [currentView, setCurrentView] = useState<LessonView>('list');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const { user } = useAuth();
  const { lessons, loading } = useSupabaseLessons(user?.grade || 11);
  const { progress, updateProgress } = useStudentProgress(user?.id || '');

  // Filter lessons for this subject
  const subjectLessons = lessons.filter(lesson => 
    lesson.subject.toLowerCase() === subjectId.toLowerCase()
  );

  // Group lessons by unit
  const lessonsByUnit = subjectLessons.reduce((acc, lesson) => {
    const unitKey = `${lesson.unit_number}-${lesson.unit_title}`;
    if (!acc[unitKey]) {
      acc[unitKey] = [];
    }
    acc[unitKey].push(lesson);
    return acc;
  }, {} as Record<string, typeof subjectLessons>);

  const handleLessonStart = (lesson: any) => {
    setSelectedLesson(lesson);
    if (lesson.lesson_type === 'mcq') {
      setCurrentView('quiz');
    } else {
      setCurrentView('lesson');
    }
  };

  const handleLessonComplete = (xpEarned: number) => {
    if (selectedLesson) {
      updateProgress(selectedLesson.id, true, xpEarned, 1);
      setCurrentView('list');
      setSelectedLesson(null);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedLesson(null);
  };

  const isLessonUnlocked = (lesson: any, index: number) => {
    // First lesson is always unlocked
    if (index === 0) return true;
    
    // Check if previous lesson is completed
    const sortedLessons = subjectLessons.sort((a, b) => a.order_sequence - b.order_sequence);
    const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
    if (currentIndex === 0) return true;
    
    const previousLesson = sortedLessons[currentIndex - 1];
    const previousProgress = progress.find(p => p.lesson_id === previousLesson.id);
    return previousProgress?.is_completed || false;
  };

  if (currentView === 'quiz' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Lessons
            </Button>
            <h1 className="text-2xl font-bold text-foreground">{selectedLesson.lesson_title} - Quiz</h1>
          </div>
          
          <div className="lesson-card text-center py-12">
            <h2 className="text-xl font-bold mb-4">Quiz Coming Soon!</h2>
            <p className="text-muted-foreground mb-6">
              Interactive quizzes for this lesson are being prepared. For now, you can complete the lesson to earn XP.
            </p>
            <Button onClick={() => handleLessonComplete(selectedLesson.xp_reward)}>
              Complete Lesson ({selectedLesson.xp_reward} XP)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'lesson' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToList}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Lessons
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Theory Lesson</span>
            </div>
          </div>

          <div className="lesson-card">
            <h1 className="text-3xl font-bold text-foreground mb-4">{selectedLesson.lesson_title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{selectedLesson.lesson_description}</p>
            
            <div className="prose prose-slate max-w-none">
              <p>This is a comprehensive lesson covering {selectedLesson.lesson_title.toLowerCase()}. The content would include detailed explanations, examples, and interactive elements to help students understand the concepts thoroughly.</p>
              
              <h2>Key Learning Objectives</h2>
              <ul>
                <li>Understand the fundamental concepts</li>
                <li>Apply knowledge to solve problems</li>
                <li>Connect concepts to real-world applications</li>
              </ul>
              
              <h2>Content Overview</h2>
              <p>This lesson provides in-depth coverage of the topic with clear explanations and practical examples. Students will gain a solid foundation that prepares them for more advanced topics.</p>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-success">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">{selectedLesson.xp_reward} XP</span>
              </div>
              <Button 
                onClick={() => handleLessonComplete(selectedLesson.xp_reward)}
                className="btn-hero"
              >
                Complete Lesson
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading lessons...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subjects
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground capitalize">{subjectId}</h1>
            <p className="text-muted-foreground">Grade {user?.grade || 11} curriculum</p>
          </div>
        </div>

        {subjectLessons.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No lessons available</h3>
            <p className="text-muted-foreground">Lessons for this subject are being prepared.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(lessonsByUnit)
              .sort(([a], [b]) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
              .map(([unitKey, unitLessons]) => {
                const [unitNumber, unitTitle] = unitKey.split('-');
                const sortedLessons = unitLessons.sort((a, b) => a.order_sequence - b.order_sequence);
                
                return (
                  <div key={unitKey} className="lesson-card">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        Unit {unitNumber}: {unitTitle}
                      </h2>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ 
                            width: `${(progress.filter(p => 
                              unitLessons.some(l => l.id === p.lesson_id) && p.is_completed
                            ).length / unitLessons.length) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-4">
                      {sortedLessons.map((lesson, index) => {
                        const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
                        const unlocked = isLessonUnlocked(lesson, index);
                        
                        return (
                          <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            progress={lessonProgress}
                            onStart={() => handleLessonStart(lesson)}
                            isUnlocked={unlocked}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}