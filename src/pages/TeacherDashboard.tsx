// Teacher Dashboard with student reports and analytics
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Users, BarChart3, BookOpen, TrendingUp, Clock, Award } from 'lucide-react';

export default function TeacherDashboard() {
  const { user: authUser, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!authUser || authUser.role !== 'teacher') return null;

  // Mock data for demonstration
  const mockStudents = [
    { id: 1, name: 'Rahul Sharma', grade: 12, progress: 85, lessonsCompleted: 42 },
    { id: 2, name: 'Priya Patel', grade: 11, progress: 92, lessonsCompleted: 38 },
    { id: 3, name: 'Amit Kumar', grade: 12, progress: 78, lessonsCompleted: 35 },
    { id: 4, name: 'Sneha Singh', grade: 11, progress: 88, lessonsCompleted: 41 },
  ];

  const mockClassStats = {
    totalStudents: 45,
    activeStudents: 38,
    averageProgress: 83,
    totalLessonsAssigned: 50,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {authUser.name} - {authUser.subject} Teacher</p>
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
      </div>
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{mockClassStats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                  <p className="text-2xl font-bold">{mockClassStats.activeStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold">{mockClassStats.averageProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Lessons Assigned</p>
                  <p className="text-2xl font-bold">{mockClassStats.totalLessonsAssigned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest student activities in your classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Priya Patel completed Physics Chapter 5</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Rahul Sharma achieved 90% in quiz</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">5 students completed today's assignment</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Class Performance</CardTitle>
                  <CardDescription>Overall class statistics this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Lessons Completed</span>
                      <span className="text-sm text-muted-foreground">156/200</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quiz Average</span>
                      <span className="text-sm text-muted-foreground">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Assignment Submission</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Reports</CardTitle>
                <CardDescription>Individual student performance and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Student Name</th>
                        <th className="text-left p-2 font-medium">Grade</th>
                        <th className="text-left p-2 font-medium">Progress</th>
                        <th className="text-left p-2 font-medium">Lessons Completed</th>
                        <th className="text-left p-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStudents.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-2">{student.name}</td>
                          <td className="p-2">Grade {student.grade}</td>
                          <td className="p-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${student.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </td>
                          <td className="p-2">{student.lessonsCompleted}</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Detailed class performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Advanced Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Detailed charts and insights about student performance will be available here.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Performance breakdown by topics</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-foreground mb-2">Subject Analytics</h3>
                  <p className="text-muted-foreground">
                    Topic-wise performance analysis and recommendations will appear here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Assignments</CardTitle>
                <CardDescription>Manage and assign lessons to your students</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold text-lg text-foreground mb-2">Assignment Management</h3>
                <p className="text-muted-foreground mb-4">
                  Create and assign lessons, quizzes, and homework to your students.
                </p>
                <Button>Create New Assignment</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}