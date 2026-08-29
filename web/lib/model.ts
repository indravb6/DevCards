export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface SkillData {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface FlashCardData {
  id: string;
  question: string;
  answer: string;
  learn_more?: string;
}
