import { NextApiRequest, NextApiResponse } from "next";
import { getPost, getPostIds } from "../../../lib/posts";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const postIds = getPostIds();
  const id = request.query.id;

  if (typeof id !== "string") {
    return response.status(500).json({
      message: "a post id is required",
    });
  }

  if (request.method === "POST") {
    if (postIds.includes(id)) {
      return response.status(500).json({
        message: "the post id already exists",
      });
    }
    return response.status(200).json(request.query);
  }

  if (request.method === "GET") {
    if (postIds.includes(id)) {
      const post = await getPost(id);
      return response.status(200).json(post);
    } else {
      return response.status(404).json({ message: `post #${id} not found` });
    }
  }

  response
    .status(404)
    .json({ message: "/api/user/id - Only available as POST" });
}
