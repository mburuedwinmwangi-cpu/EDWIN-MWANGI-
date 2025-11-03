
export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  title: string;
  options: Option[];
}

export interface Answers {
  [key: string]: string;
}
