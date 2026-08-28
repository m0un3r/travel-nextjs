import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Tours from "./pages/Tours";
import ToursSlug from "./pages/ToursSlug";
import LocationSlug from "./pages/LocationSlug";
import BlogSlug from "./pages/BlogSlug";
import CategorySlug from "./pages/CategorySlug";
import LegalSlug from "./pages/LegalSlug";
import NotFound from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/tours", element: <Tours /> },
  { path: "/tours/:slug", element: <ToursSlug /> },
  { path: "/location/:slug", element: <LocationSlug /> },
  { path: "/blog/:slug", element: <BlogSlug /> },
  { path: "/categories/:slug", element: <CategorySlug /> },
  { path: "/legal-pages/:slug", element: <LegalSlug /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
