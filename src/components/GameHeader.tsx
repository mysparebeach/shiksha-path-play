// Game-style header with XP, streak, and user info
import { User } from '@/types';
import { Crown, Flame, Trophy, Zap } from 'lucide-react';

interface GameHeaderProps {
  user: User;
  onProfileClick?: () => void;
}

export default function GameHeader({ user, onProfileClick }: GameHeaderProps) {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
              श
            </div>
            <div>
              <h1 className="font-bold text-xl text-foreground">Shiksha Bandhu</h1>
              <p className="text-xs text-muted-foreground">CHSE Learning Platform</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {/* XP Display */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-success to-success-glow px-4 py-2 rounded-full text-success-foreground shadow-md">
              <Zap className="w-4 h-4" />
              <span className="font-bold">{user.totalXP.toLocaleString()} XP</span>
            </div>

            {/* Streak Display */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full text-white shadow-md">
              <Flame className="w-4 h-4" />
              <span className="font-bold">{user.currentStreak} day{user.currentStreak !== 1 ? 's' : ''}</span>
            </div>

            {/* User Profile */}
            <button
              onClick={onProfileClick}
              className="flex items-center gap-3 bg-muted hover:bg-muted/80 px-4 py-2 rounded-xl transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">Level {Math.floor(user.totalXP / 1000) + 1}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Progress bar for daily goal */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Daily Goal Progress</span>
            <span>{Math.min(user.completedLessons.length % user.dailyGoal, user.dailyGoal)}/{user.dailyGoal} lessons</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${Math.min((user.completedLessons.length % user.dailyGoal / user.dailyGoal) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}