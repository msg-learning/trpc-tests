import Layout from "../components/Layout";
import GlobalStyles from "./global-styles";

import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import type { AppRouter } from "./api/trpc/[trpc]";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";
    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
