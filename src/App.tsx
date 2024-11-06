import React, { Suspense } from "react";
import CustomNavigator from "./navigator/CustomNavigator";
import routes from "./navigator/routes";
import GlobalStyles from "./styles/GlobalStyles";
import Layout from "./styles/BottomBarLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/colors/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Suspense fallback={<div />}>
            <CustomNavigator routes={routes} initialRouteName="/" />
          </Suspense>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
