import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idx = parseInt(req.body.untrustedData?.buttonIndex);
  let result = "";

  switch (idx) {
    case 1:
      result = "🔍 Аналітика: активність каналу впала на 30%.";
      break;
    case 2:
      result = "👥 Управління: додано нового користувача @newbie.";
      break;
    case 3:
      result = "📊 Звіт: 5 нових ідей, 2 запити на співзасновників.";
      break;
    default:
      result = "Невідома дія.";
  }

  res.setHeader("Content-Type", "text/html").status(200).send(`
    <html>
      <head>
        <meta property="og:title" content="ChannelSense 🧠" />
        <meta property="og:image" content="https://YOUR_DOMAIN/preview.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://YOUR_DOMAIN/preview.png" />
        <meta name="fc:frame:button:1" content="Назад" />
        <meta name="fc:frame:post_url" content="https://YOUR_DOMAIN/api/frame" />
      </head>
      <body><p>${result}</p></body>
    </html>
  `);
}
