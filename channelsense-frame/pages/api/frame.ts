import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "text/html").status(200).send(`
    <html>
      <head>
        <meta property="og:title" content="ChannelSense 🧠" />
        <meta property="og:image" content="https://YOUR_DOMAIN/preview.png" />
        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:image" content="https://YOUR_DOMAIN/preview.png" />
        <meta name="fc:frame:button:1" content="Аналітика" />
        <meta name="fc:frame:button:2" content="Управління" />
        <meta name="fc:frame:button:3" content="Звіт" />
        <meta name="fc:frame:post_url" content="https://YOUR_DOMAIN/api/handle-frame" />
      </head>
      <body></body>
    </html>
  `);
}
