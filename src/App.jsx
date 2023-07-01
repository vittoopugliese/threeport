import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./components/Header/Header";
import {useEffect, useState} from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {OnPageLoad} from "./components/Shared/OnPageLoad";
import { ThreeDee } from "./components/Shared/ThreeDee";

function App() {
  const [pageLoading, setpageLoading] = useState(true);

  useEffect(() => {
    AOS.init();

    setTimeout(() => {
      setpageLoading(false);
    }, 1250);
  }, []);

  return (
    <>
      {pageLoading ? (
        <OnPageLoad />
      ) : (
        <BrowserRouter>
          <div className="appContainer" data-aos="fade-up">
            {/* <Header data-aos="fade-down" /> */}
            <Routes>
              <Route path="/" element={<ThreeDee />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
