import React from 'react';
import { Route, Routes } from 'react-router-dom';

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

interface NavigatorProps {
  routes: RouteConfig[];
  initialRouteName: string;
}

const Navigator = ({ routes }: NavigatorProps) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
};

export default Navigator;
