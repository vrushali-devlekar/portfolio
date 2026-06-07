import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Cursor from "./components/layout/Cursor";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Cursor />
      <AppRoutes />
    </>
  );
}

export default App;
