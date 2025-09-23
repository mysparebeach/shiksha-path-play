// Shiksha Bandhu - Main App Component
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Auth from './Auth';
import Home from './Home';
import SubjectLessons from './SubjectLessons';

type AppView = 'home' | 'subject-lessons';

const Index = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentView('subject-lessons');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedSubject('');
  };

  // Show auth pages if user is not logged in
  if (!user) {
    return <Auth />;
  }

  return (
    <>
      {currentView === 'home' && (
        <Home onSubjectSelect={handleSubjectSelect} />
      )}
      {currentView === 'subject-lessons' && selectedSubject && (
        <SubjectLessons 
          subjectId={selectedSubject} 
          onBack={handleBackToHome}
        />
      )}
    </>
  );
};

export default Index;
