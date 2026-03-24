import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppRoutes } from "./ui/routes/AppRoutes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppRoutes />
	</StrictMode>
);