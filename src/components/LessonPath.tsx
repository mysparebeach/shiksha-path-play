// Duolingo-style lesson path with nodes and connectors
import { Lesson } from '@/types';
import { Lock, CheckCircle, Play, Star } from 'lucide-react';

interface LessonPathProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

export default function LessonPath({ lessons, onLessonClick }: LessonPathProps) {
  const getPathPosition = (index: number) => {
    const isEven = index % 2 === 0;
    return isEven ? 'justify-start pl-8' : 'justify-end pr-8';
  };

  const getConnectorDirection = (index: number) => {
    const isEven = index % 2 === 0;
    const nextIsEven = (index + 1) % 2 === 0;
    
    if (isEven && !nextIsEven) return 'curve-right';
    if (!isEven && nextIsEven) return 'curve-left';
    return 'straight';
  };

  return (
    <div className="relative w-full max-w-md mx-auto py-8">
      <div className="relative">
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="relative mb-16">
            {/* Winding Path Connector */}
            {index < lessons.length - 1 && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1 h-16 z-0">
                <div className={`w-full h-full rounded-full transition-all duration-500 ${
                  lesson.isCompleted 
                    ? 'bg-gradient-to-b from-success to-success/70' 
                    : 'bg-muted/30'
                }`} />
                {/* Curved connector */}
                <div className={`absolute top-12 ${getConnectorDirection(index)} w-8 h-8 border-2 rounded-full ${
                  lesson.isCompleted ? 'border-success' : 'border-muted/30'
                } transform rotate-45`} />
              </div>
            )}

            {/* Lesson Node Container */}
            <div className={`flex w-full ${getPathPosition(index)}`}>
              <div className="flex flex-col items-center relative z-10">
                {/* Lesson Node */}
                <button
                  onClick={() => lesson.isUnlocked && onLessonClick(lesson)}
                  disabled={!lesson.isUnlocked}
                  className={`relative w-16 h-16 rounded-full border-4 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    lesson.isCompleted 
                      ? 'bg-gradient-to-br from-success to-success/80 border-success text-background shadow-lg shadow-success/20' 
                      : lesson.isUnlocked 
                      ? 'bg-gradient-to-br from-primary to-primary/80 border-primary text-background shadow-lg shadow-primary/20 animate-pulse' 
                      : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                  }`}
                >
                  {lesson.isCompleted ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : lesson.isUnlocked ? (
                    <Play className="w-8 h-8" />
                  ) : (
                    <Lock className="w-8 h-8" />
                  )}
                  
                  {/* Glow effect for current lesson */}
                  {lesson.isUnlocked && !lesson.isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-lg animate-pulse" />
                  )}
                </button>

                {/* Lesson Info */}
                <div className="text-center mt-3 max-w-24">
                  <h4 className="font-bold text-sm text-foreground leading-tight">{lesson.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{lesson.description}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 bg-accent/10 rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-accent" />
                    <span className="text-xs font-bold text-accent">{lesson.xpReward}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}