import Head from "next/head";
import Image from "next/image";

export default function Cats() {
  return (
    <>
      <Head>
        <title>A nice picture of a cat</title>
      </Head>
      <Image width={100} height={100} src="/images/cat.jpg" alt="just a cat" />
    </>
  );
}
