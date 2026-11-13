
import { initializeTheme } from "./services/preferencesService.js";
import { renderHome } from "./pages/home.js";

// Initialize saved theme
initializeTheme();

// Load homepage
renderHome();
