import { NextApiResponseServerIO } from "@/types/chat";
import { randomUUID } from "crypto";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const chatHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  const form = new IncomingForm();

  if (req.method === "POST") {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "Form parsing error" });
      }

      const content = fields.content;
      const author = fields.author;
      const messageObj = { key: randomUUID(), content, author };
      res?.socket?.server?.io?.emit("message", messageObj);
      return res.status(201).json(messageObj);
    });
  } else {
    // POST 요청이 아닌 경우 응답 처리
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default chatHandler;
