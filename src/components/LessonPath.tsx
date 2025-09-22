// Duolingo-style lesson path with nodes and connectors
import { Lesson } from '@/types';
import { Lock, CheckCircle, Play, Star } from 'lucide-react';

interface LessonPathProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

export default function LessonPath({ lessons, onLessonClick }: LessonPathProps) {
  return (
    <div className="lesson-path">
      {lessons.map((lesson, index) => (
        <div key={lesson.id} className="flex flex-col items-center">
          {/* Lesson Node */}
          <button
            onClick={() => lesson.isUnlocked && onLessonClick(lesson)}
            disabled={!lesson.isUnlocked}
            className={`lesson-node ${
              lesson.isCompleted 
                ? 'completed' 
                : lesson.isUnlocked 
                ? 'current' 
                : 'locked'
            }`}
          >
            {lesson.isCompleted ? (
              <CheckCircle className="w-6 h-6" />
            ) : lesson.isUnlocked ? (
              <Play className="w-6 h-6" />
            ) : (
              <Lock className="w-6 h-6" />
            )}
          </button>

          {/* Lesson Info */}
          <div className="text-center mt-2 mb-4">
            <h4 className="font-semibold text-sm text-foreground">{lesson.title}</h4>
            <p className="text-xs text-muted-foreground">{lesson.description}</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star className="w-3 h-3 text-success" />
              <span className="text-xs font-semibold text-success">{lesson.xpReward} XP</span>
            </div>
          </div>

          {/* Connector (except for last item) */}
          {index < lessons.length - 1 && (
            <div className={`lesson-connector ${lesson.isCompleted ? 'completed' : ''}`} />
          )}
        </div>
      ))}
    </div>
  );
}