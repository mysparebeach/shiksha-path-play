// Subject card component with progress and visual appeal
import { Subject } from '@/types';
import { ChevronRight, BookOpen, CheckCircle } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export default function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const progress = subject.totalLessons > 0 ? (subject.completedLessons / subject.totalLessons) * 100 : 0;

  return (
    <div
      onClick={onClick}
      className="lesson-card group cursor-pointer overflow-hidden"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{subject.icon}</div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{subject.name}</h3>
              <p className="text-muted-foreground text-sm">{subject.description}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>

        {/* Progress section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{subject.totalLessons} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="font-semibold text-accent">{subject.completedLessons} completed</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-right text-sm font-semibold text-primary">
            {Math.round(progress)}% complete
          </div>
        </div>

        {/* Units preview */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            {subject.units.filter(unit => unit.isUnlocked).length} of {subject.units.length} units unlocked
          </p>
          <div className="flex gap-2">
            {subject.units.slice(0, 3).map((unit, index) => (
              <div
                key={unit.id}
                className={`w-2 h-2 rounded-full ${
                  unit.isUnlocked 
                    ? 'bg-accent' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
            {subject.units.length > 3 && (
              <span className="text-xs text-muted-foreground">+{subject.units.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}