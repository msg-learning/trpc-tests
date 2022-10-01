import styled from "styled-components";
import { trpc } from "../lib/trpc";

const Remove = styled.button`
  background-color: transparent;
  color: red;
  padding: 0;
  margin-left: 8px;
  height: 12px;
  width: 12px;
  border: 0;
`;

export default function Users() {
  const users = trpc.useQuery(["users"]);
  const mutation = trpc.useMutation("removeUser");
  const utils = trpc.useContext();

  const onRemove = (id: number) => {
    mutation.mutate(id, {
      onSuccess() {
        utils.invalidateQueries(["users"]);
      },
    });
  };

  if (!users.data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.data.map((user) => (
        <li key={user.id}>
          {user.name} <Remove onClick={() => onRemove(user.id)}>x</Remove>
        </li>
      ))}
    </ul>
  );
}
