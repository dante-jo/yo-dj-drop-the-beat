import { NextApiResponseServerIO } from "@/types/chat";
import { randomUUID } from "crypto";
import { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Message {
  content: string;
  author: string;
}

interface FormParseResult {
  fields: {
    [key: string]: string | string[] | undefined;
  };
  files: {
    [key: string]: any; // `formidable`의 File 타입을 사용할 수도 있지만, 여기서는 단순화를 위해 any 사용
  };
}

const chatHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  if (req.method === "POST") {
    try {
      const body = await new Promise<FormParseResult>((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const { fields } = body;
      const { author, content } = fields;
      const messageObj = { key: randomUUID(), content, author };

      // Socket.IO를 사용하여 메시지 전송
      res?.socket?.server?.io?.emit("message", messageObj);

      // 응답을 JSON 형태로 클라이언트에 전송
      return res.status(201).json(messageObj);
    } catch (error) {
      return res.status(500).json({ error: "Form parsing error" });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default chatHandler;
