import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter-tight";
import App from "./App";
import "./design-system.css";
import "./styles.css";

createRoot(document.getElementById("root")!).render(<App />);
