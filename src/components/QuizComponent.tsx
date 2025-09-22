// Quiz component for multiple choice questions
import { useState } from 'react';
import { Question } from '@/types';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number, totalQuestions: number) => void;
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(score + (isCorrect ? 1 : 0), questions.length);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary">
            Score: {score}/{questions.length}
          </span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="lesson-card mb-6">
        <div className="flex items-start gap-3 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            currentQuestion.difficulty === 'easy' ? 'bg-accent text-accent-foreground' :
            currentQuestion.difficulty === 'medium' ? 'bg-primary text-primary-foreground' :
            'bg-destructive text-destructive-foreground'
          }`}>
            {currentQuestion.difficulty === 'easy' ? 'E' : 
             currentQuestion.difficulty === 'medium' ? 'M' : 'H'}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-2">
              {currentQuestion.text}
            </h3>
            <p className="text-sm text-muted-foreground capitalize">
              {currentQuestion.difficulty} difficulty
            </p>
          </div>
        </div>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedAnswer === index
                  ? showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-destructive bg-destructive/10 text-destructive'
                    : 'border-primary bg-primary/10'
                  : showExplanation && index === currentQuestion.correctAnswer
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border hover:border-muted-foreground bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showExplanation && (
                  <div>
                    {index === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-accent" />
                    ) : selectedAnswer === index ? (
                      <XCircle className="w-5 h-5 text-destructive" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-muted/50 p-4 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Explanation</h4>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          {!showExplanation ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn-hero flex-1"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className="btn-success flex-1"
            >
              {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}