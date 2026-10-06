import { Bounce, ToastContainer } from "react-toastify";
import "../src/styles/global.css";
import "../src/styles/theme.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import { Home } from "./pages/Home";

function App() {
  return (
    <TaskContextProvider>
      <Home />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </TaskContextProvider>
  );
}

export default App;
