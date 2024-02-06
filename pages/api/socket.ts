import { NextApiResponseServerIO } from "@/types/chat";
import { Http2Server } from "http2";
import { NextApiRequest } from "next";
import { Server } from "socket.io";

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket?.server.io) {
    return res.end();
  }

  console.log("서버-소켓 연결완료");
  const io = new Server(res.socket.server as unknown as Http2Server);
  res.socket.server.io = io;

  return res.end();
};

export default SocketHandler;
