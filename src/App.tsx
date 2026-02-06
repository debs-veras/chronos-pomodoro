import "../src/styles/global.css";
import "../src/styles/theme.css";

import { Home } from "./pages/Home";
import { TaskContextProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}

export default App;
