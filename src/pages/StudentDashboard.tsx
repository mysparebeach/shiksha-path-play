// Student Dashboard - existing Home functionality
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSupabaseLessons, useStudentProgress } from '@/hooks/useSupabaseLessons';
import GameHeader from '@/components/GameHeader';
import AchievementCard from '@/components/AchievementCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Trophy, Target, TrendingUp, LogOut, BookOpen, Play, CheckCircle } from 'lucide-react';

interface StudentDashboardProps {
  onSubjectSelect: (subjectId: string) => void;
}

export default function StudentDashboard({ onSubjectSelect }: StudentDashboardProps) {
  const { user: authUser, logout } = useAuth();
  const { lessons, loading: lessonsLoading } = useSupabaseLessons(authUser?.grade || 11);
  const { progress, loading: progressLoading } = useStudentProgress(authUser?.id || '');
  const [selectedTab, setSelectedTab] = useState('subjects');

  if (!authUser || authUser.role !== 'student') return null;

  const completedLessons = progress.filter(p => p.is_completed);
  const totalXP = completedLessons.reduce((sum, lesson) => {
    const lessonData = lessons.find(l => l.id === lesson.lesson_id);
    return sum + (lessonData?.xp_reward || 0);
  }, 0);
  const userLevel = Math.floor(totalXP / 1000) + 1;
  const xpForNextLevel = ((userLevel) * 1000) - totalXP;

  // Group lessons by subject
  const lessonsBySubject = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.subject]) {
      acc[lesson.subject] = [];
    }
    acc[lesson.subject].push(lesson);
    return acc;
  }, {} as Record<string, typeof lessons>);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground">Shiksha Bandhu</h1>
          <div className="text-sm text-muted-foreground">
            {totalXP} XP • Level {userLevel}
          </div>
        </div>
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
            <h3 className="font-bold text-lg text-foreground">{totalXP.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>

          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg text-foreground">0</h3>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>

          <div className="lesson-card text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-bold text-lg text-foreground">{completedLessons.length}</h3>
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
            {lessonsLoading ? (
              <div className="text-center py-8">Loading lessons...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(lessonsBySubject).map(([subject, subjectLessons]) => {
                  const subjectProgress = progress.filter(p => 
                    subjectLessons.some(l => l.id === p.lesson_id)
                  );
                  const completedCount = subjectProgress.filter(p => p.is_completed).length;
                  const totalCount = subjectLessons.length;
                  
                  return (
                    <Card 
                      key={subject} 
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => onSubjectSelect(subject.toLowerCase())}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-primary-foreground" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{subject}</CardTitle>
                            <CardDescription>
                              {completedCount}/{totalCount} lessons completed
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full bg-muted rounded-full h-2 mb-4">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            {subjectLessons.reduce((sum, lesson) => sum + lesson.xp_reward, 0)} XP available
                          </span>
                          <div className="flex gap-1">
                            {completedCount > 0 && <CheckCircle className="w-4 h-4 text-success" />}
                            <Play className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            
            {/* Quick start suggestion */}
            {completedLessons.length === 0 && !lessonsLoading && (
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
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Achievements Coming Soon!</h3>
              <p className="text-muted-foreground">
                Complete lessons to unlock achievements and badges. This feature will be available soon.
              </p>
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