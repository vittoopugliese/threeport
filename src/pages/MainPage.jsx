import {useEffect} from "react";
import {ThreeDee} from "./../components/ThreeDee";

export const MainPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <main>
      <p className="controls">WASD, SHIFT, SPACE</p>
      <ThreeDee />
    </main>
  );
};
