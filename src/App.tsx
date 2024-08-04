import {useState, useEffect, useRef} from "react";
import {gsap} from "gsap";

import Header from "./components/Header";
import Home from "./components/Home";
import Destination from "./components/Destination";
import Crew from "./components/Crew";
import Technology from "./components/Technology";

import "./reset.css";
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const containerRef = useRef(null); // Ref for GSAP animations
  const appInner = useRef(null)

  const handleNavigation = (path: string) => {
    window.history.pushState(null, "", path);
    setCurrentPath(path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: -5},
        { y: 0, duration: 2, animationTimingFunction: "cubic-bezier(.25,.46,.45,.94)"}
      );

      gsap.fromTo(
        appInner.current,
        {backgroundSize: '100%'},
        {backgroundSize: '102%', duration: 3, animationTimingFunction: "cubic-bezier(.25,.46,.45,.94)"}
      );

      // Cleanup function to reset opacity and position when component unmounts
      return () => {
        gsap.to(containerRef.current, { y: 0, duration: 1});
        gsap.to(appInner.current, {backgroundSize: '100%', duration: 3});
      };
    }
  }, [currentPath]);

  const renderComponent = () => {
    switch (currentPath) {
      case "/destination":
        return <Destination/>;
      case "/crew":
        return <Crew/>;
      case "/technology":
        return <Technology/>;
      case "/":
      default:
        return <Home handleExplore={handleNavigation}/>;
    }
  };

  return (
    <div className='app'>
      <Header currentPath={currentPath} onNavClick={handleNavigation} />

      <main ref={appInner} className={`app-inner ${currentPath === "/" ? "home-path" : currentPath.replace("/", "") + "-path"}`}>
        <div className="app-container" ref={containerRef}>
          {renderComponent()}
        </div>
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
