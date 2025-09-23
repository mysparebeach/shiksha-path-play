// Home page with subject selection and user overview
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgress } from '@/hooks/useUserProgress';
import { subjects } from '@/data/subjects';
import GameHeader from '@/components/GameHeader';
import SubjectCard from '@/components/SubjectCard';
import AchievementCard from '@/components/AchievementCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Crown, Trophy, Target, TrendingUp, LogOut } from 'lucide-react';

interface HomeProps {
  onSubjectSelect: (subjectId: string) => void;
}

export default function Home({ onSubjectSelect }: HomeProps) {
  const { user: authUser, logout } = useAuth();
  const { user, unlockedAchievements } = useUserProgress();
  const [selectedTab, setSelectedTab] = useState('subjects');

  if (!authUser) return null;

  const recentAchievements = unlockedAchievements
    .sort((a, b) => new Date(b.unlockedAt || '').getTime() - new Date(a.unlockedAt || '').getTime())
    .slice(0, 3);

  const totalLessonsCompleted = user.completedLessons.length;
  const userLevel = Math.floor(user.totalXP / 1000) + 1;
  const xpForNextLevel = ((userLevel) * 1000) - user.totalXP;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-between items-center p-4">
        <GameHeader user={user} />
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="border-primary/20 hover:bg-primary/10"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {authUser.name}! 🎓
          </h2>
          <p className="text-muted-foreground">
            Grade {authUser.grade} CHSE preparation journey. You're doing great!
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">{user.totalXP.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>

          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-foreground">{user.currentStreak}</h3>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>

          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">{totalLessonsCompleted}</h3>
            <p className="text-sm text-muted-foreground">Lessons Done</p>
          </div>

          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-success-glow rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-success-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">Level {userLevel}</h3>
            <p className="text-sm text-muted-foreground">{xpForNextLevel} XP to next level</p>
          </div>
        </div>

        {/* Main content tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => onSubjectSelect(subject.id)}
                />
              ))}
            </div>
            
            {/* Quick start suggestion */}
            {totalLessonsCompleted === 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
                <h3 className="font-bold text-lg text-foreground mb-2">🚀 Ready to start learning?</h3>
                <p className="text-muted-foreground mb-4">
                  Begin with any subject that interests you. Physics and Mathematics are great starting points for science students!
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => onSubjectSelect('physics')}
                    className="btn-hero"
                  >
                    Start with Physics
                  </Button>
                  <Button 
                    onClick={() => onSubjectSelect('mathematics')}
                    variant="outline"
                  >
                    Try Mathematics
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">No achievements yet</h3>
                  <p className="text-muted-foreground">
                    Complete your first lesson to unlock your first achievement!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <div className="lesson-card text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Leaderboard Coming Soon!</h3>
              <p className="text-muted-foreground">
                Compete with other CHSE students and see how you rank. This feature will be available soon.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}