import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function AddUser() {
  const [username, setUsername] = useState<string>("");
  const mutation = trpc.useMutation("addUser");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate(username, {
          onSuccess() {
            setUsername("");
          },
        });
      }}
    >
      <input
        type={"text"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input type="submit" />

      {mutation.status === "success" && username === "" && (
        <p>
          <b>{mutation.data.name}</b> added
        </p>
      )}
    </form>
  );
}
