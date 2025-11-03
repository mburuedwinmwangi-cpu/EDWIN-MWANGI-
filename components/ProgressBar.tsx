
import React from 'react';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const percentage = Math.round((currentStep / totalSteps) * 100);

    return (
        <div className="h-2.5 rounded-full bg-slate-400/20 overflow-hidden my-4" aria-hidden="true">
            <div
                className="h-full bg-gradient-to-r from-accent to-brand transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
