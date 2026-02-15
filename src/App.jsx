// Okay so this line is for Browswer to know the URL has changed without reloading the page from the server.
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Layout from './layouts/Layout';
const Home = lazy(() => import('./pages/Home'));
const Activities = lazy(() => import('./pages/Activities'));
const Projects = lazy(() => import('./pages/Projects'));
const Sprints = lazy(() => import('./pages/Sprints'));
import { PageTransition } from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading…</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <Home />
            </PageTransition>
          } />
          <Route path="/activities" element={
            <PageTransition>
              <Activities />
            </PageTransition>
          } />
          <Route path="/projects" element={
            <PageTransition>
              <Projects />
            </PageTransition>
          } />
          <Route path="/sprints" element={
            <PageTransition>
              <Sprints />
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
