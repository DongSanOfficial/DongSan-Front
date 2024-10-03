import React, { Suspense } from 'react';
import RoutesSetting from './routes';
import GlobalStyles from "./styles/GlobalStyles";
import Layout from './styles/BottomBarLayout';

function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Suspense fallback={<div />}>
          <RoutesSetting />
        </Suspense>
      </Layout>
    </>
  );
}

export default App;