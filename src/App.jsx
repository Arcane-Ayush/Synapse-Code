// Okay so this line is for Browswer to know the URL has changed without reloading the page from the server.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense, lazy } from "react";
import Layout from "./layouts/Layout";
const Home = lazy(() => import("./pages/Home"));
const Activities = lazy(() => import("./pages/Activities"));
const Projects = lazy(() => import("./pages/Projects"));
const Team = lazy(() => import("./pages/Team"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Sprints = lazy(() => import("./pages/Sprints"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const ActivityDetail = lazy(() => import("./pages/ActivityDetail"));
const SprintDetail = lazy(() => import("./pages/SprintDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
import { PageTransition } from "./components/PageTransition";
import ProtectedRoute from "./components/ProtectedRoute";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="p-8 text-center text-muted-foreground">Loading…</div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/activities"
            element={
              <PageTransition>
                <Activities />
              </PageTransition>
            }
          />
          <Route
            path="/activities/:id"
            element={
              <PageTransition>
                <ActivityDetail />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <Projects />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <PageTransition>
                <ProjectDetail />
              </PageTransition>
            }
          />
          <Route
            path="/team"
            element={
              <PageTransition>
                <Team />
              </PageTransition>
            }
          />
          <Route
            path="/sprints"
            element={
              <PageTransition>
                <Sprints />
              </PageTransition>
            }
          />
          <Route
            path="/sprints/:id"
            element={
              <PageTransition>
                <SprintDetail />
              </PageTransition>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageTransition>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </PageTransition>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <PageTransition>
                <Profile />
              </PageTransition>
            }
          />
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
