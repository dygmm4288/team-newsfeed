import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="mypage" element={<MyPage />}></Route>
      </Route>
      <Route path="auth" element={<Auth />} />
    </Routes>
  );
}
