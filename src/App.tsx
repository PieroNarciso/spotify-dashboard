import { useState } from 'react';
import Layout from './layouts/Layout';
import { api, AUTH_LINK } from '@/api';

const App: React.FC = () => {

  return (
    <Layout>
      <a href={AUTH_LINK}>LOGIN</a>
    </Layout>
  );
};

export default App;
