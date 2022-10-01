import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

import fs from "fs";
import path from "path";

export interface User {
  name: string;
  id: number;
}

const read = () => {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "users.json"), {
      encoding: "utf8",
    }) || "[]"
  );
  return data as Array<User>;
};

const write = (data: Array<User>) => {
  fs.writeFileSync(
    path.join(process.cwd(), "users.json"),
    JSON.stringify(data)
  );
};

export const appRouter = trpc
  .router()
  .mutation("removeUser", {
    input: z.number(),
    resolve({ input }) {
      const users = read();
      write(users.filter((user) => user.id !== input));
    },
  })
  .mutation("addUser", {
    input: z.string(),
    resolve({ input }) {
      const users = read();
      const user = { name: input, id: Date.now() };
      users.push(user);
      write(users);
      return user;
    },
  })
  .query("users", {
    resolve() {
      return read();
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
