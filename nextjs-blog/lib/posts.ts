import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { remark } from "remark";
import html from "remark-html";

export interface FrontMatterData {
  title: string;
  date: string;
}

export interface PostData extends FrontMatterData {
  id: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  }) as Array<PostData>;
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) =>
    fileName.replace(/\.md$/, "")
  );

  return allPostsData;
}

export async function getPost(id: string) {
  const file = path.join(postsDirectory, `${id}.md`);
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  const htmlContent = await remark().use(html).process(matterResult.content);
  const stringContent = htmlContent.toString();

  return {
    id,
    content: stringContent,
    ...matterResult.data,
  };
}
