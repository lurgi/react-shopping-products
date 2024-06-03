import { ToggleCartItemProvider } from "./components/provider/ToggleCartItemProvider";
import { ToastProvider } from "./components/provider/ToastProvider";
import { LanguageProvider } from "./components/provider/LanguageProvider";

import Mall from "./pages/Mall";

function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <ToggleCartItemProvider>
          <Mall />
        </ToggleCartItemProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
