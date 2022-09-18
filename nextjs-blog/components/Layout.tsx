import Link from "next/link";

import * as S from "./Layout.styles";

export default function Layout({ children }) {
  return (
    <S.Layout>
      <S.Nav>
        <S.Navbar>
          <S.NavbarItem>
            <Link href="/">Home</Link>
          </S.NavbarItem>
          <S.NavbarItem>
            <Link href="/posts">Posts</Link>
          </S.NavbarItem>
          <S.NavbarItem>
            <Link href="/cats">Cats</Link>
          </S.NavbarItem>
        </S.Navbar>
      </S.Nav>
      {children}
    </S.Layout>
  );
}
