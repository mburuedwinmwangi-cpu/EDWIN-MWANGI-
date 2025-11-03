import React, { useState, useEffect, useMemo } from 'react';
import { QUESTIONS } from './constants';
import { Answers } from './types';
import ProgressBar from './components/ProgressBar';
import QuizContent from './components/QuizContent';
import ResultsContent from './components/ResultsContent';

// Base button styles are defined here and applied via a utility function for reuse
const baseButtonClasses = "inline-flex items-center justify-center gap-2.5 rounded-full font-bold py-2.5 px-4 border cursor-pointer transition-colors duration-200";

const PrimaryButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button className={`${baseButtonClasses} bg-gradient-to-br from-brand to-brand-dark text-[#071320] shadow-brand-glow border-transparent ${className}`} {...props}>
        {children}
    </button>
);

const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
    <button className={`${baseButtonClasses} bg-transparent border-slate-400/20 text-app-text enabled:hover:bg-slate-400/10 disabled:opacity-50 disabled:cursor-not-allowed ${className}`} {...props}>
        {children}
    </button>
);

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        try {
            const savedAnswers = localStorage.getItem('fa_quiz_answers');
            if (savedAnswers) {
                setAnswers(JSON.parse(savedAnswers));
            }
        } catch (e) {
            console.error("Failed to load answers from localStorage", e);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('fa_quiz_answers', JSON.stringify(answers));
        } catch (e) {
            console.error("Failed to save answers to localStorage", e);
        }
    }, [answers]);

    const handleSelect = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
        setTimeout(() => {
            if (currentStep < QUESTIONS.length) {
                setCurrentStep(prev => prev + 1);
            }
        }, 200);
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const currentQuestion = useMemo(() => {
      return quizStarted && currentStep < QUESTIONS.length ? QUESTIONS[currentStep] : null
    }, [currentStep, quizStarted])

    const isQuizComplete = quizStarted && currentStep >= QUESTIONS.length;

    return (
        <>
            <main className="shell min-h-screen flex items-center justify-center py-10">
                <section className="card bg-app-glass border border-slate-200/10 rounded-card p-6 sm:p-7 w-full">
                    {!quizStarted ? (
                         <div>
                             <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight">Is Your 'Healthy Meal' <span className="bg-gradient-to-r from-accent to-brand bg-clip-text text-transparent">Really Healthy</span>?</h1>
                             <p className="text-app-muted mt-2 max-w-2xl">Take this 30‑second quiz to find hidden sugar, calories, and fat in everyday meals. Get personalized insights + a free tool to scan your food in seconds.</p>
                             <div className="mt-6">
                                <PrimaryButton onClick={() => setQuizStarted(true)}>
                                    Start Quiz
                                </PrimaryButton>
                             </div>
                         </div>
                    ) : (
                        <>
                            <ProgressBar currentStep={currentStep} totalSteps={QUESTIONS.length} />
                            {isQuizComplete ? (
                                <ResultsContent answers={answers} />
                            ) : (
                                currentQuestion && (
                                    <QuizContent
                                        question={currentQuestion}
                                        currentStep={currentStep}
                                        totalSteps={QUESTIONS.length}
                                        selectedAnswer={answers[currentQuestion.id]}
                                        onSelect={handleSelect}
                                        onNext={handleNext}
                                        onBack={handleBack}
                                    />
                                )
                            )}
                        </>
                    )}
                </section>
            </main>
            <footer className="text-center text-xs text-app-muted py-4 border-t border-slate-200/10 px-5 max-w-4xl mx-auto">
                © {new Date().getFullYear()} Food Analyzer
            </footer>
        </>
    );
};


// Add these button components to a global scope or export them for use
declare global {
    var btn_primary: typeof PrimaryButton;
    var btn_ghost: typeof GhostButton;
}

// A trick to make components available without explicit imports in this file.
const AppWithButtons: React.FC = () => {
    (window as any).btn_primary = PrimaryButton;
    (window as any).btn_ghost = GhostButton;
    return <App />;
};

export default AppWithButtons;