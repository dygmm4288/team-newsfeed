import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-page" element={<div>my page</div>} />
      <Route path="/auth" element={<div>login page</div>} />
    </Routes>
  );
}
