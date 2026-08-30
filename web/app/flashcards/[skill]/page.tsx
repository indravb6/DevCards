import FlashCard from "@/features/FlashCard/FlashCard";
import { api } from "../../../lib/api";

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{
    skill: string;
  }>;
}) {
  const { skill: skillSlug } = await params;
  const skill = await api.getSkill(skillSlug);

  return <FlashCard skill={skill} />;
}
