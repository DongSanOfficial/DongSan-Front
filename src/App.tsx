import React, { Suspense } from "react";
import routes from "./navigator/routes";
import GlobalStyles from "./styles/GlobalStyles";
import Navigator from "src/navigator/Navigator";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/colors/theme";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Suspense fallback={<div />}>
        <Navigator
          routes={routes}
          initialRouteName={isRootPath ? "/splash" : location.pathname}
        />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
