import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Router />
    </BrowserRouter>
  );
}

export default App;
