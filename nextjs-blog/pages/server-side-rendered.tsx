export interface ServerSideRenderedProps {
  message: string;
}

export default function ServerSideRendered({
  message,
}: ServerSideRenderedProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export async function getServerSideProps() {
  const todo = {
    title: "message",
  };

  return {
    props: {
      message: todo.title,
    },
  };
}
