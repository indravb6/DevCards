import { CategoryData, FlashCardData, PaginatedResponse, SkillData } from "./model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getCategories: () => request<CategoryData[]>("/categories/"),

  getSkills: (categorySlug: string) => request<SkillData[]>(`/categories/${categorySlug}/skills/`),

  getSkill: (skillSlug: string) => request<SkillData>(`/skills/${skillSlug}/`),

  getFlashcards: (skillSlug: string, page: number = 1) =>
    request<PaginatedResponse<FlashCardData>>(`/skills/${skillSlug}/flashcards/?page=${page}`),
};
