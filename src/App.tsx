import React, { Suspense } from 'react';
import CustomNavigator from './navigator/CustomNavigator';
import routes from './navigator/routes';
import GlobalStyles from "./styles/GlobalStyles";
import Layout from './styles/BottomBarLayout';

function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Suspense fallback={<div />}>
          <CustomNavigator routes={routes} initialRouteName="/" />
        </Suspense>
      </Layout>
    </>
  );
}

export default App;