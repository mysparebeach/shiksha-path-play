// Subject lesson view with path-style progression
import { useState } from 'react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { subjects } from '@/data/subjects';
import { Lesson, Question } from '@/types';
import { physicsQuestions, chemistryQuestions, biologyQuestions, mathQuestions, englishQuestions } from '@/data/sampleQuestions';
import GameHeader from '@/components/GameHeader';
import LessonPath from '@/components/LessonPath';
import QuizComponent from '@/components/QuizComponent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Play, CheckCircle } from 'lucide-react';

interface SubjectLessonsProps {
  subjectId: string;
  onBack: () => void;
}

export default function SubjectLessons({ subjectId, onBack }: SubjectLessonsProps) {
  const { user, completeLesson } = useUserProgress();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const subject = subjects.find(s => s.id === subjectId);
  if (!subject) return null;

  // Get sample questions based on subject
  const getQuestionsForSubject = (subjectId: string): Question[] => {
    switch (subjectId) {
      case 'physics': return physicsQuestions;
      case 'chemistry': return chemistryQuestions;
      case 'biology': return biologyQuestions;
      case 'mathematics': return mathQuestions;
      case 'english': return englishQuestions;
      default: return physicsQuestions; // fallback
    }
  };

  // Update lesson completion status based on user progress
  const updatedSubject = {
    ...subject,
    units: subject.units.map(unit => ({
      ...unit,
      lessons: unit.lessons.map(lesson => ({
        ...lesson,
        isCompleted: user.completedLessons.includes(lesson.id),
        isUnlocked: lesson.isUnlocked || user.completedLessons.some(completedId => {
          const completedLesson = unit.lessons.find(l => l.id === completedId);
          return completedLesson && completedLesson.order === lesson.order - 1;
        })
      }))
    }))
  };

  const allLessons = updatedSubject.units.flatMap(unit => unit.lessons);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (lesson.type === 'mcq') {
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    if (!selectedLesson) return;
    
    const xpEarned = Math.round(selectedLesson.xpReward * (score / totalQuestions));
    completeLesson(selectedLesson.id, xpEarned);
    
    setShowQuiz(false);
    setSelectedLesson(null);
  };

  const handleStartTheoryLesson = () => {
    if (!selectedLesson) return;
    
    // For theory lessons, mark as complete immediately
    completeLesson(selectedLesson.id, selectedLesson.xpReward);
    setSelectedLesson(null);
  };

  if (showQuiz && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <GameHeader user={user} />
        <div className="py-8">
          <QuizComponent
            questions={getQuestionsForSubject(subjectId)}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }

  if (selectedLesson && selectedLesson.type === 'theory') {
    return (
      <div className="min-h-screen bg-background">
        <GameHeader user={user} />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="lesson-card">
            <div className="flex items-center gap-4 mb-6">
              <Button
                onClick={() => setSelectedLesson(null)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Theory Lesson</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-4">{selectedLesson.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">{selectedLesson.description}</p>

            <div className="prose prose-gray max-w-none">
              <p className="text-foreground leading-relaxed">
                This is a comprehensive theory lesson covering the fundamental concepts of {selectedLesson.title}. 
                In a real implementation, this would contain detailed educational content, diagrams, examples, 
                and interactive elements to help students understand the concepts thoroughly.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Key Learning Objectives:</h3>
              <ul className="list-disc list-inside space-y-2 text-foreground">
                <li>Understand the fundamental concepts and principles</li>
                <li>Apply theoretical knowledge to practical examples</li>
                <li>Prepare for related quiz questions and exercises</li>
                <li>Build foundation for advanced topics</li>
              </ul>

              <div className="bg-primary/10 p-6 rounded-xl mt-8">
                <h4 className="font-semibold text-primary mb-2">💡 Did you know?</h4>
                <p className="text-foreground">
                  This lesson is part of the official CHSE curriculum and will help you prepare for your board examinations.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="font-semibold text-accent">
                  Complete this lesson to earn {selectedLesson.xpReward} XP
                </span>
              </div>
              <Button
                onClick={handleStartTheoryLesson}
                className="btn-success"
              >
                Mark as Complete
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHeader user={user} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{subject.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{subject.name}</h1>
              <p className="text-muted-foreground">{subject.description}</p>
            </div>
          </div>
        </div>

        {/* Progress overview */}
        <div className="lesson-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {updatedSubject.units.filter(unit => unit.isUnlocked).length}
              </div>
              <div className="text-sm text-muted-foreground">Units Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {allLessons.filter(lesson => lesson.isCompleted).length}
              </div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">
                {allLessons.filter(lesson => lesson.isCompleted).reduce((sum, lesson) => sum + lesson.xpReward, 0)}
              </div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </div>
        </div>

        {/* Units and lessons */}
        {updatedSubject.units.map((unit) => (
          <div key={unit.id} className="mb-12">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground mb-2">{unit.name}</h2>
              <p className="text-muted-foreground">{unit.description}</p>
            </div>
            
            {unit.isUnlocked ? (
              <LessonPath
                lessons={unit.lessons}
                onLessonClick={handleLessonClick}
              />
            ) : (
              <div className="lesson-card text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">Unit Locked</h3>
                <p className="text-muted-foreground">
                  Complete previous lessons to unlock this unit
                </p>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}