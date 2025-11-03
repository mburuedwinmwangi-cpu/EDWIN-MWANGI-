import React from 'react';
import { Answers } from '../types';

interface ResultsContentProps {
    answers: Answers;
}

const buildResults = (a: Answers) => {
    const meal = a["q2_go_to"];
    const base = {
        title: "Here's what your answers suggest…",
        subtitle: "Even meals we trust as 'healthy' can hide sugar, calories, or fat. Food Analyzer reveals the truth in 3 seconds so you can make confident choices.",
        callouts: [
            "Instant scan — no manual logging",
            "Spot hidden sugars, oils & calorie traps",
            "Make smarter choices without strict dieting",
        ]
    };

    if (meal === 'salad') {
        base.title = 'Salads can hide 200–300 calories in dressing alone.';
        base.callouts.unshift('Watch dressings, croutons, and cheese add‑ons');
    } else if (meal === 'smoothie') {
        base.title = 'Smoothies often contain more sugar than soda.';
        base.callouts.unshift('Fruit concentrates & syrups spike sugar fast');
    } else if (meal === 'pasta') {
        base.title = 'Pasta can pack more calories than a burger + fries.';
        base.callouts.unshift('Creamy sauces and portions are the culprits');
    } else if (meal === 'burger') {
        base.title = 'Burgers + fries can top 1,200 calories quickly.';
        base.callouts.unshift('Sauces, cheese & sides push numbers up');
    }
    return base;
};


const ResultsContent: React.FC<ResultsContentProps> = ({ answers }) => {
    const results = buildResults(answers);
    const primaryButtonClasses = "inline-flex items-center justify-center gap-2.5 rounded-full font-bold py-2.5 px-4 border cursor-pointer transition-colors duration-200 bg-gradient-to-br from-brand to-brand-dark text-[#071320] shadow-brand-glow border-transparent";

    return (
        <div>
            <div className="inline-flex items-center gap-2 border border-slate-400/20 py-2.5 px-3 rounded-[16px] text-sm">
                <span>🔍</span>
                <span>Personalized Insight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-3">{results.title}</h2>
            <p className="text-app-muted mt-1.5">{results.subtitle}</p>

            <div className="grid sm:grid-cols-2 gap-3 my-4">
                {results.callouts.map((c, i) => (
                    <div key={i} className="card bg-app-glass border border-slate-200/10 rounded-card p-4 sm:p-5">
                        {c}
                    </div>
                ))}
            </div>

            <div className="card bg-app-glass border border-slate-200/10 rounded-card p-5 mt-4">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex-1 min-w-[240px]">
                        <h3 className="text-lg font-extrabold mb-1 text-white">Know Your Meal in Just 3 Seconds</h3>
                        <p className="text-app-muted text-sm">Scan a meal and instantly reveal calories, sugar, and macros. No guessing. No logging.</p>
                    </div>
                    <a href="https://www.digistore24.com/redir/632164/MarketPulse/" target="_blank" rel="noopener noreferrer" className={`${primaryButtonClasses} whitespace-nowrap`}>
                        Try Free Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResultsContent;