// Shiksha Bandhu - Main App Component
import { useState } from 'react';
import Home from './Home';
import SubjectLessons from './SubjectLessons';

type AppView = 'home' | 'subject-lessons';

const Index = () => {
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
