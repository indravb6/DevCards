import FlashCard from "@/features/FlashCard/FlashCard";
import { api } from "../../../lib/api";

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{
    skillId: string;
  }>;
}) {
  const { skillId } = await params;
  const skill = await api.getSkill(skillId);

  return <FlashCard skill={skill} />;
}
