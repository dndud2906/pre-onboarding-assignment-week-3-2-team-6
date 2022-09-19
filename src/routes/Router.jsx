import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/index';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<div>404 Page...</div>} />
      </Routes>
    </BrowserRouter>
  );
}
