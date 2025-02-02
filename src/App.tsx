import React, { Suspense, useState, useEffect } from "react";
import routes from "./navigator/routes";
import GlobalStyles from "./styles/GlobalStyles";
import Splash from "./pages/splash";
import Navigator from "src/navigator/Navigator";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/colors/theme";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {showSplash ? (
        <Splash />
      ) : (
        <Suspense fallback={<div />}>
          <Navigator routes={routes} initialRouteName="/" />
        </Suspense>
      )}
    </ThemeProvider>
  );
}

export default App;