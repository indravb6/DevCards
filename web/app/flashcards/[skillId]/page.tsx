import FlashCard from "@/features/FlashCard/FlashCard";

export default async function FlashcardsPage({
  params,
}: {
  params: Promise<{
    skillId: string;
  }>;
}) {
  const { skillId } = await params;

  return <FlashCard skillId={skillId} />;
}
