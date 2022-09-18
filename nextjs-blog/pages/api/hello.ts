import { NextApiRequest, NextApiResponse } from "next";

export interface HelloEndpointData {
  message: string;
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<HelloEndpointData>
) {
  response.status(200).json({ message: "hello world" });
}
