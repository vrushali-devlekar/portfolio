import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import Preloader from "./components/layout/Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [revealStarted, setRevealStarted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartReveal = () => {
    setRevealStarted(true);
  };

  const handleComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <Preloader
          revealStarted={revealStarted}
          onStartReveal={handleStartReveal}
          onComplete={handleComplete}
        />
      )}
      <div className={`app-content-wrapper ${revealStarted ? "content-loaded" : "content-loading"}`}>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
