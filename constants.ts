
import { Question } from './types';

export const QUESTIONS: Question[] = [
    {
        id: "q1_freq",
        title: "How often do you eat foods you consider 'healthy'?",
        options: [
            { label: "Every day", value: "daily" },
            { label: "A few times a week", value: "weekly" },
            { label: "Rarely", value: "rare" }
        ]
    },
    {
        id: "q2_go_to",
        title: "Which of these is your go‑to meal?",
        options: [
            { label: "Salad 🥗", value: "salad" },
            { label: "Smoothie 🥤", value: "smoothie" },
            { label: "Pasta 🍝", value: "pasta" },
            { label: "Burger 🍔", value: "burger" }
        ]
    },
    {
        id: "q3_priority",
        title: "When choosing food, what matters most to you?",
        options: [
            { label: "Calories", value: "calories" },
            { label: "Ingredients", value: "ingredients" },
            { label: "Convenience", value: "convenience" },
            { label: "Taste", value: "taste" }
        ]
    },
    {
        id: "q4_check",
        title: "How do you usually check nutrition info?",
        options: [
            { label: "I guess", value: "guess" },
            { label: "I read labels", value: "labels" },
            { label: "I use an app", value: "app" },
            { label: "I don't", value: "none" }
        ]
    },
    {
        id: "q5_goal",
        title: "What's your main health goal right now?",
        options: [
            { label: "Lose weight", value: "lose" },
            { label: "Eat cleaner", value: "clean" },
            { label: "Gain energy", value: "energy" },
            { label: "Just curious", value: "curious" }
        ]
    },
    {
        id: "q6_confidence",
        title: "Do you think your favorite meal might be hiding sugar or calories?",
        options: [
            { label: "Yes, definitely", value: "yes" },
            { label: "Maybe…", value: "maybe" },
            { label: "No, it's safe", value: "no" }
        ]
    }
];
