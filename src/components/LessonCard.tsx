import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, Play, BookOpen, Brain } from 'lucide-react';
import type { CurriculumLesson, StudentProgress } from '@/hooks/useSupabaseLessons';

interface LessonCardProps {
  lesson: CurriculumLesson;
  progress?: StudentProgress;
  onStart: () => void;
  isUnlocked: boolean;
}

export default function LessonCard({ lesson, progress, onStart, isUnlocked }: LessonCardProps) {
  const isCompleted = progress?.is_completed || false;
  
  const getIcon = () => {
    if (isCompleted) return <CheckCircle className="w-5 h-5 text-success" />;
    if (!isUnlocked) return <Lock className="w-5 h-5 text-muted-foreground" />;
    return lesson.lesson_type === 'mcq' ? <Brain className="w-5 h-5 text-primary" /> : <BookOpen className="w-5 h-5 text-primary" />;
  };

  const getTypeColor = () => {
    switch (lesson.lesson_type) {
      case 'mcq': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`transition-all duration-200 ${isUnlocked ? 'hover:shadow-md cursor-pointer' : 'opacity-60'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getIcon()}
            <div>
              <CardTitle className="text-base font-semibold">{lesson.lesson_title}</CardTitle>
              <CardDescription className="text-sm mt-1">{lesson.lesson_description}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className={getTypeColor()}>
            {lesson.lesson_type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Unit {lesson.unit_number}</span>
            <span>•</span>
            <span>{lesson.xp_reward} XP</span>
            {progress?.score !== undefined && progress.total_questions > 0 && (
              <>
                <span>•</span>
                <span>{progress.score}/{progress.total_questions} points</span>
              </>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={onStart}
            disabled={!isUnlocked}
            variant={isCompleted ? "outline" : "default"}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Review
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {isUnlocked ? 'Start' : 'Locked'}
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}