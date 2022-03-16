import { BaseStyles, ThemeProvider } from "@primer/react";
import { SSRProvider } from "@react-aria/ssr";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const props = { ...pageProps };
  return (
    <SSRProvider>
      <ThemeProvider>
        <BaseStyles />
        <Component {...props} />
      </ThemeProvider>
    </SSRProvider>
  );
}

export default App;
