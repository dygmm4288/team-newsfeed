import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="mypage" element={<MyPage />}></Route>
    </Routes>
  );
}
