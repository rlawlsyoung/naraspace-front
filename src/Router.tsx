import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/Main';
import User from './pages/User';

import GlobalStyle from './styles/GlobalStyle';

function Router() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
      <Header />
    </BrowserRouter>
  );
}

export default Router;
