import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {MainPage} from "./pages/MainPage";
import {LoadingSpinner} from "./components/LoadingSpinner";

function App() {
  const [pageLoading, setpageLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    setTimeout(() => {
      setpageLoading(false);
    }, 1254);
  }, []);

  return (
    <>
      {pageLoading ? (
        <div className="appContainer" data-aos="fade-up">
          <LoadingSpinner size={10} />
        </div>
      ) : (
        <BrowserRouter>
          <div className="appContainer" data-aos="fade-up">
            <Routes>
              <Route path="/" element={<MainPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
