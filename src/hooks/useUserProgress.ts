// Hook for managing user progress and gamification
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { User, Achievement, Quest } from '@/types';
import { achievements } from '@/data/achievements';

const defaultUser: User = {
  id: 'user-1',
  name: 'Student',
  email: 'student@example.com',
  totalXP: 0,
  currentStreak: 0,
  longestStreak: 0,
  completedLessons: [],
  dailyGoal: 3, // lessons per day
  joinedDate: new Date().toISOString(),
};

export function useUserProgress() {
  const [user, setUser] = useLocalStorage<User>('shikshabandhu-user', defaultUser);
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage<Achievement[]>('shikshabandhu-achievements', []);
  const [lastActiveDate, setLastActiveDate] = useLocalStorage<string>('shikshabandhu-last-active', '');

  // Check and update streak on app load
  useEffect(() => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastActiveDate === today) {
      // Already active today, no change needed
      return;
    } else if (lastActiveDate === yesterday) {
      // Continuing streak
      setUser(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1)
      }));
    } else if (lastActiveDate && lastActiveDate !== today) {
      // Streak broken
      setUser(prev => ({
        ...prev,
        currentStreak: 1
      }));
    }
    
    setLastActiveDate(today);
  }, [lastActiveDate, setLastActiveDate, setUser]);

  const completeLesson = (lessonId: string, xpEarned: number) => {
    setUser(prev => {
      const newCompletedLessons = [...prev.completedLessons];
      if (!newCompletedLessons.includes(lessonId)) {
        newCompletedLessons.push(lessonId);
      }

      const newUser = {
        ...prev,
        totalXP: prev.totalXP + xpEarned,
        completedLessons: newCompletedLessons
      };

      // Check for new achievements
      checkAchievements(newUser);
      
      return newUser;
    });
  };

  const checkAchievements = (currentUser: User) => {
    const newUnlockedAchievements = [...unlockedAchievements];
    
    achievements.forEach(achievement => {
      // Skip if already unlocked
      if (newUnlockedAchievements.some(a => a.id === achievement.id)) {
        return;
      }

      let shouldUnlock = false;

      switch (achievement.requirement.type) {
        case 'lessons':
          if (achievement.requirement.subject) {
            // Count lessons for specific subject
            const subjectLessons = currentUser.completedLessons.filter(
              lessonId => lessonId.startsWith(achievement.requirement.subject!)
            );
            shouldUnlock = subjectLessons.length >= achievement.requirement.value;
          } else {
            shouldUnlock = currentUser.completedLessons.length >= achievement.requirement.value;
          }
          break;
        case 'xp':
          shouldUnlock = currentUser.totalXP >= achievement.requirement.value;
          break;
        case 'streak':
          shouldUnlock = currentUser.currentStreak >= achievement.requirement.value;
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement = {
          ...achievement,
          isUnlocked: true,
          unlockedAt: new Date().toISOString()
        };
        newUnlockedAchievements.push(unlockedAchievement);
        
        // Award XP for unlocking achievement
        setUser(prev => ({
          ...prev,
          totalXP: prev.totalXP + achievement.xpReward
        }));
      }
    });

    if (newUnlockedAchievements.length > unlockedAchievements.length) {
      setUnlockedAchievements(newUnlockedAchievements);
    }
  };

  const updateDailyGoal = (goal: number) => {
    setUser(prev => ({
      ...prev,
      dailyGoal: goal
    }));
  };

  const updateUserProfile = (updates: Partial<User>) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  return {
    user,
    unlockedAchievements,
    completeLesson,
    updateDailyGoal,
    updateUserProfile,
    checkAchievements
  };
}