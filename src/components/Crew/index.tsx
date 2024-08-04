import {useEffect, useRef, useState} from "react";
import data from "../../data.json";
import {gsap} from "gsap";

const Crew = () => {
  const bgImage = innerWidth > 1170 ? "background-crew-desktop.jpg" : (innerWidth > 768 && innerWidth < 1170) ? "background-crew-tablet.jpg" : innerWidth < 767 ? "background-crew-mobile.jpg" : "background-crew-desktop.jpg"
  const [activeTab, setActiveTab] = useState<string>("Douglas Hurley")
  const currentTab = data.crew.find(item => item.name === activeTab)

  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement | null>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dotsRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const appInner  = document.querySelector(".app-inner") as HTMLElement

    console.log(appInner)
    if (appInner) {
      appInner.style.background = `url(/assets/crew/${bgImage}) no-repeat`;
    }
  }, [])

  useEffect(() => {
    const tl = gsap.timeline();

    // Animation for the active tab
    tl.fromTo(
      [titleRef.current, roleRef.current, nameRef.current, bioRef.current],
      {opacity: 0, y: 8},
      {opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4}
    )


    return () => {
      tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
    };
  }, [activeTab]);

  useEffect(() => {
    const tl = gsap.timeline();

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        {y: -10, opacity: 0},
        {
          opacity: 1,
          y: 0,
          duration: 2, // Adjust duration for smoother animation
          ease: "ease"
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, [activeTab]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      dotsRef.current,
      {opacity: 0, y: 8,},
      {opacity: 1, y: 0,duration: 1,delay:2, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4}
    ,'>')

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const crewElem = document.querySelector(".crew")
    const titleElem = document.querySelector(".crew .content-title")
    if (innerWidth < 768 && crewElem && titleElem) {
      crewElem.append(titleElem)
    }
  }, [])


  return (
    <div className='crew'>
      <div className="crew-wrapper">
        <h2 ref={titleRef} className='content-title'><span>02</span> Meet your crew</h2>
        {currentTab && (
          <>
            <p ref={roleRef} className="role">{currentTab.role}</p>
            <p ref={nameRef} className="name">{currentTab.name}</p>
            <p ref={bioRef} className="bio">{currentTab.bio}</p>
          </>
        )}

        <ul ref={dotsRef} className="dots">
          {data.crew.map(item => (
            <li key={item.name} className={`dot-item ${item.name === activeTab ? "active" : ""}`}
                onClick={() => setActiveTab(item.name)}></li>
          ))}

        </ul>
      </div>
      <div className="image-container">
        {currentTab && <img ref={imageRef} src={currentTab.images.png} alt=""/>}
      </div>
    </div>

  );
};

export default Crew;
