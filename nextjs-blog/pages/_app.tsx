import Layout from "../components/Layout";
import GlobalStyles from "./global-styles";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
