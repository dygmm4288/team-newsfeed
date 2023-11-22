import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
