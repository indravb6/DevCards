from google import genai
from google.genai import types
from pydantic import BaseModel

from django.conf import settings


class GeneratedFlashcard(BaseModel):
    question: str
    answer: str
    learn_more: str


class GeneratedFlashcards(BaseModel):
    flashcards: list[GeneratedFlashcard]


client = genai.Client(
    api_key=settings.GEMINI_API_KEY,
)


def generate_flashcards(
    skill_name: str,
    existing_questions: list[str],
    count: int = 5,
) -> list[GeneratedFlashcard]:

    existing_questions_text = "\n".join(
        f"- {question}" for question in existing_questions
    )

    prompt = f"""
Generate {count} high-quality technical flashcards about "{skill_name}".

Target audience:
Software engineers.

Existing questions:
{existing_questions_text or "- None"}

IMPORTANT:
- Do NOT generate questions that are identical to existing questions.
- Do NOT generate questions that are semantically equivalent to existing questions.
- Each question must cover a meaningfully different concept.
- Return exactly {count} new flashcards.

## Question

- Test real technical knowledge.
- Avoid trivial or overly generic questions.
- Prefer questions useful for real engineering work or technical interviews.

## Answer

The answer is displayed directly on the flashcard.

Requirements:
- Plain text only.
- Do NOT use Markdown.
- Target approximately 20-50 words.
- Maximum 60 words.
- Usually 1-3 sentences.
- Answer the question directly.
- Include only the most important technical information.
- Do not repeat the question.

The answer should feel like a strong, concise technical interview answer.

## Learn More

The "learn_more" field is a LONG-FORM MARKDOWN explanation.

IMPORTANT:
- The entire "learn_more" value MUST be valid Markdown.
- Use Markdown formatting naturally.
- Do NOT return plain text only.
- Do NOT wrap the entire response in a code block.
- Use headings with ## and ### when appropriate.
- Use bullet lists when appropriate.
- Use numbered lists when appropriate.
- Use **bold** for important concepts.
- Use `inline code` for code, commands, APIs, variables, or technical terms.
- Use fenced code blocks for multi-line code examples.
- Use tables when they genuinely improve the explanation.

Explain the topic deeply enough for a software engineer to understand it.

Depending on the topic, explain relevant aspects such as:

- What it is
- How it works
- Why it exists
- When to use it
- How to implement or configure it
- Practical examples
- Trade-offs
- Advantages and disadvantages
- Performance considerations
- Scalability considerations
- Security considerations
- Common mistakes
- Limitations
- Real-world use cases
- Comparison with alternatives

Do NOT blindly include every section.
Only include sections that are relevant to the topic.

Example of the expected "learn_more" format:

## How it works

The system uses **multiple components** to handle requests.

### Key components

- **Component A** handles incoming requests.
- **Component B** processes the data.
- **Component C** stores the result.

### Example

```python
result = process_data(input)
print(result)
```"""

    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=GeneratedFlashcards,
            temperature=0.7,
        ),
    )

    result = response.parsed

    if not result:
        raise ValueError("Gemini returned an empty response")

    return result.flashcards
