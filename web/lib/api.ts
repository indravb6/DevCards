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
  getCategories: () => request<CategoryData[]>("/api/categories/"),

  getSkills: (categoryId: string) => request<SkillData[]>(`/api/categories/${categoryId}/skills/`),

  getSkill: (skillId: string) => request<SkillData>(`/api/skills/${skillId}`),

  getFlashcards: (skillId: string, page: number = 1) =>
    request<PaginatedResponse<FlashCardData>>(`/api/skills/${skillId}/flashcards/?page=${page}`),
};
