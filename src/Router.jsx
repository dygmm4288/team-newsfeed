import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="my-page" element={<MyPage />}></Route>
          <Route path="auth" element={<Auth />} />
          <Route path="sign-up" element={<SignUp />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
