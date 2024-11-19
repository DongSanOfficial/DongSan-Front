import React, { Suspense, useEffect, useState } from "react";

import CustomNavigator from "./navigator/CustomNavigator";
import routes from "./navigator/routes";
import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./styles/BottomBarLayout";
import Splash from "./pages/splash";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/colors/theme";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          {showSplash ? (
            <Splash />
          ) : (
            <Suspense fallback={<div />}>
              <CustomNavigator routes={routes} initialRouteName="/" />
            </Suspense>
          )}
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
