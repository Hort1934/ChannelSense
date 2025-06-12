import { FrameRequest, FrameResponse } from "frames.js";

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json()) as FrameRequest;

  const buttonIndex = body.untrustedData.buttonIndex;

  let responseText = "👋 Вітаємо в ChannelSense!";

  if (buttonIndex === 1) {
    // Аналітика
    responseText = `📊 Аналітика:
На цьому тижні активність знизилась на 30%.
Топ-тема: пошук cofounder-ів.`;
  } else if (buttonIndex === 2) {
    // Управління
    responseText = `🛠️ Управління:
Ви можете додати учасників, пінити касти або створювати нагадування.
(Команди через текстове поле)`;
  } else if (buttonIndex === 3) {
    // Звіт
    responseText = `📋 Звіт активності:
Сьогодні в /founders:
• 5 нових ідей
• 2 запити на співзасновників`;
  }

  const frameRes: FrameResponse = {
    image: `${process.env.NEXT_PUBLIC_HOST}/static/card.png`, // або кастомний
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/api/frame`,
    textInput: "Постав своє питання",
    buttons: ["Аналітика", "Управління", "Звіт"],
    imageAspectRatio: "1.91:1",
    ogImage: `${process.env.NEXT_PUBLIC_HOST}/static/card.png`,
    metadata: {
      message: responseText,
    },
  };

  return new Response(JSON.stringify(frameRes), {
    headers: { "Content-Type": "application/json" },
  });
}
