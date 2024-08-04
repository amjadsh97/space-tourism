import {useEffect, useRef, useState} from "react";
import data from "../../data.json";
import {gsap} from "gsap";

const Technology = () => {


  const bgImage = innerWidth > 1170 ? "background-technology-desktop.jpg" : (innerWidth > 768 && innerWidth < 1170) ? "background-technology-tablet.jpg" : innerWidth < 767 ? "background-technology-mobile.jpg" : "background-technology-desktop.jpg"
  const [activeTab, setActiveTab] = useState<string>("Launch vehicle")
  const currentTab = data.technology.find(item => item.name === activeTab)
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);


  useEffect(() => {
    const tl = gsap.timeline();

    // Animation for the active tab
    tl.fromTo(
      [ subtitleRef.current, nameRef.current,descriptionRef.current],
      {opacity: 0, y: 8},
      {opacity: 1, y: 0, duration: 2, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4}
    )
      .add(() => {
        // Cleanup function to reset opacity and position
        gsap.to(
          [ subtitleRef.current, nameRef.current,descriptionRef.current],
          {opacity: 0, y: 8}
        );
      }, "<");

    return () => {
      tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
    };
  }, [activeTab]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        {opacity:0, y:8},
        {
          opacity: 1,
          y:0,
          duration: 2,
          ease: "ease-in",
        }
      )
    }

    return () => {
      tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
    };
  }, [activeTab]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      [listRef.current, titleRef.current],
      {opacity: 0, y: 8},
      {opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4}
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-image", `url(/public/assets/technology/${bgImage}) no-repeat`);
  }, [innerWidth])

  useEffect(() => {
    const appInner  = document.querySelector(".app-inner") as HTMLElement

    if (appInner) {
      appInner.style.background = `url(/public/assets/technology/${bgImage}) no-repeat`;
    }
  }, [])

  return (
    <div className='technology'>
      <div className="crew-wrapper">
        <h2 ref={titleRef} className='content-title'><span>03</span> SPACE LAUNCH 101</h2>
        <div className="tech-inner">
          <div className="tech-wrapper">
            <ul ref={listRef} className="list">
              {data.technology.map((item, index) => (
                <li key={item.name} className={`list-item ${item.name === activeTab ? "active" : ""}`}
                    onClick={() => setActiveTab(item.name)}>{index + 1}</li>
              ))}

            </ul>
            <div className="tech-details">
              {currentTab && (
                <>
                  <p ref={subtitleRef}>THE TERMINOLOGY…</p>
                  <p ref={nameRef} className="name">{currentTab.name}</p>
                  <p ref={descriptionRef} className="description">{currentTab.description}</p>
                </>
              )}
            </div>
          </div>

          <div ref={imageRef} className="image-container">
            {currentTab && <img src={currentTab.images.portrait} alt=""/>}
          </div>
        </div>


      </div>

    </div>
  );
};

export default Technology;
