import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [grade, setGrade] = useState<'11' | '12'>('11');
  const [subject, setSubject] = useState('');
  const { signup, isLoading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (role === 'student') {
        await signup(email, password, name, role, parseInt(grade) as 11 | 12);
      } else {
        await signup(email, password, name, role, undefined, subject);
      }
      toast({
        title: "Account created!",
        description: `Welcome to Shiksha Bandhu, ${role}. Let's start learning!`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different details.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-accent rounded-full p-3">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Join Shiksha Bandhu
          </CardTitle>
          <CardDescription>
            Start your CHSE preparation journey today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-3">
              <Label>I am a</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as 'student' | 'teacher')}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="font-normal">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="font-normal">Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            {role === 'student' && (
              <div className="space-y-3">
                <Label>Select your Grade</Label>
                <RadioGroup
                  value={grade}
                  onValueChange={(value) => setGrade(value as '11' | '12')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="11" id="grade11" />
                    <Label htmlFor="grade11" className="font-normal">Grade 11</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12" id="grade12" />
                    <Label htmlFor="grade12" className="font-normal">Grade 12</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {role === 'teacher' && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Physics, Mathematics, Chemistry"
                  required
                />
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}