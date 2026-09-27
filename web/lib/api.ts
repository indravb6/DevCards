import { CategoryData, FlashCardData, PaginatedResponse, SkillData } from "./model";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USER_ID_KEY = "devcards_user_id";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-user-id": getUserId(),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export function getUserId(): string {
  if (typeof window === "undefined") {
    return "";
  }

  let userId = localStorage.getItem(USER_ID_KEY);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }

  return userId;
}

export const api = {
  getCategories: () => request<CategoryData[]>("/categories/"),

  getSkills: (categorySlug: string) => request<SkillData[]>(`/categories/${categorySlug}/skills/`),

  searchSkills: (searchTerm: string) => request<SkillData[]>(`/skills/?search=${searchTerm}`),

  getSkill: (skillSlug: string) => request<SkillData>(`/skills/${skillSlug}/`),

  getFlashcards: (skillSlug: string, page: number = 1) =>
    request<PaginatedResponse<FlashCardData>>(`/skills/${skillSlug}/flashcards/?page=${page}`),

  finishFlashcard: (flashcardId: string) =>
    request(`/flashcards/${flashcardId}/finish/`, {
      method: "POST",
    }),

  restartFlashcards: (skillSlug: string) =>
    request(`/skills/${skillSlug}/flashcards/restart/`, {
      method: "POST",
    }),
};
