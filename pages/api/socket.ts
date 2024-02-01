import { Server } from "socket.io";
import { NextApiRequest } from "next";

const SocketHandler = (req: NextApiRequest, res: any) => {
  if (res.socket?.server.io) {
    console.log("이미 바인딩 되었습니다.");
  } else {
    console.log("서버-소켓 연결완료");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
