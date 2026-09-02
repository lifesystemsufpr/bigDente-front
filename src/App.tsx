import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "./core/theme/ThemeContext";
import { AppRoutes } from "./core/routes";

function App() {
  return (
    <ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
