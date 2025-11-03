
import React from 'react';
import { Question } from '../types';

interface QuizContentProps {
    question: Question;
    currentStep: number;
    totalSteps: number;
    selectedAnswer?: string;
    onSelect: (id: string, value: string) => void;
    onNext: () => void;
    onBack: () => void;
}

const OptionButton: React.FC<{
    label: string;
    value: string;
    questionId: string;
    isActive: boolean;
    onSelect: (id: string, value: string) => void;
}> = ({ label, value, questionId, isActive, onSelect }) => {
    const activeClasses = 'bg-brand/10 border-brand/40';
    const baseClasses = 'bg-white/5 border-slate-400/20 hover:bg-white/10';

    return (
        <button
            className={`flex items-center w-full text-left gap-3 p-3.5 rounded-option border cursor-pointer transition-colors duration-200 text-white font-bold ${isActive ? activeClasses : baseClasses}`}
            onClick={() => onSelect(questionId, value)}
        >
            <span>{label}</span>
        </button>
    );
};

const QuizContent: React.FC<QuizContentProps> = ({
    question,
    currentStep,
    totalSteps,
    selectedAnswer,
    onSelect,
    onNext,
    onBack
}) => {
    const PrimaryButton = (window as any).btn_primary;
    const GhostButton = (window as any).btn_ghost;

    return (
        <div>
            <div className="text-sm text-app-muted">Question {currentStep + 1} of {totalSteps}</div>
            <h2 className="text-lg sm:text-xl lg:text-2xl mt-2 mb-4 text-white font-bold">{question.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.options.map(option => (
                    <OptionButton
                        key={option.value}
                        label={option.label}
                        value={option.value}
                        questionId={question.id}
                        isActive={selectedAnswer === option.value}
                        onSelect={onSelect}
                    />
                ))}
            </div>
            <div className="flex justify-between items-center mt-4">
                <GhostButton onClick={onBack} disabled={currentStep === 0}>
                    ← Back
                </GhostButton>
                <PrimaryButton onClick={onNext} disabled={selectedAnswer === undefined}>
                    Continue
                </PrimaryButton>
            </div>
        </div>
    );
};

export default QuizContent;
