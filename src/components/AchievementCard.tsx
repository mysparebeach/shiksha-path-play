// Achievement card component for gamification
import { Achievement } from '@/types';
import { Lock, Zap } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
  isNew?: boolean;
}

export default function AchievementCard({ achievement, isNew = false }: AchievementCardProps) {
  return (
    <div className={`relative p-4 rounded-xl border-2 transition-all ${
      achievement.isUnlocked 
        ? 'border-success bg-gradient-to-br from-success/10 to-success-glow/10' 
        : 'border-border bg-card'
    } ${isNew ? 'animate-scale-in' : ''}`}>
      
      {/* New badge */}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-success to-success-glow text-success-foreground text-xs font-bold px-2 py-1 rounded-full">
          NEW!
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`text-2xl p-2 rounded-lg ${
          achievement.isUnlocked 
            ? 'bg-success/20' 
            : 'bg-muted'
        }`}>
          {achievement.isUnlocked ? achievement.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className={`font-bold text-sm ${
            achievement.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {achievement.name}
          </h3>
          <p className={`text-xs mt-1 ${
            achievement.isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'
          }`}>
            {achievement.description}
          </p>
          
          {/* XP reward */}
          <div className="flex items-center gap-1 mt-2">
            <Zap className="w-3 h-3 text-success" />
            <span className="text-xs font-semibold text-success">
              +{achievement.xpReward} XP
            </span>
          </div>

          {/* Unlock date */}
          {achievement.isUnlocked && achievement.unlockedAt && (
            <p className="text-xs text-muted-foreground mt-1">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* Progress indicator for locked achievements */}
      {!achievement.isUnlocked && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {achievement.requirement.type === 'lessons' && `Complete ${achievement.requirement.value} lesson${achievement.requirement.value !== 1 ? 's' : ''}`}
            {achievement.requirement.type === 'xp' && `Earn ${achievement.requirement.value} XP`}
            {achievement.requirement.type === 'streak' && `Maintain ${achievement.requirement.value}-day streak`}
            {achievement.requirement.subject && ` in ${achievement.requirement.subject}`}
          </p>
        </div>
      )}
    </div>
  );
}