import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { HomePage } from './pages/HomePage';
import { HOME_SECTION_PATH_REDIRECTS } from './utils/homeSectionNav';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {HOME_SECTION_PATH_REDIRECTS.map((id) => (
          <Route
            key={id}
            path={`/${id}`}
            element={<Navigate to={`/?section=${id}`} replace />}
          />
        ))}
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
