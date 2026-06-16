import { useEffect, useMemo, useState } from "react";

import { PortfolioPage } from "./components/PortfolioPage";
import { ProjectCaseStudyPage } from "./components/ProjectCaseStudyPage";
import { getProjectSlug, highlightCards } from "./data/portfolio";
import { resetWindowScrollToTop } from "./utils/scrollReset";

function getCurrentPath() {
  return window.location.pathname;
}

function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const handleLocationChange = () => {
      const nextPath = getCurrentPath();

      if (nextPath.startsWith("/projects/")) {
        resetWindowScrollToTop();
      }

      setPath(nextPath);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const selectedProject = useMemo(() => {
    const match = path.match(/^\/projects\/([^/]+)\/?$/);

    if (!match) {
      return null;
    }

    return highlightCards.find((card) => getProjectSlug(card) === match[1]) ?? null;
  }, [path]);

  if (selectedProject) {
    return <ProjectCaseStudyPage card={selectedProject} />;
  }

  return <PortfolioPage />;
}

export default App;
