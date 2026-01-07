// Okay so this line is for Browswer to know the URL has changed without reloading the page from the server.
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './layouts/Layout';
import { Home } from './pages/Home';
import { Activities } from './pages/Activities';
import { Projects } from './pages/Projects';
import { Sprints } from './pages/Sprints';
import { PageTransition } from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
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
