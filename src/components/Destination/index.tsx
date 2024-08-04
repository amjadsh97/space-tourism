import { useEffect, useRef, useState } from "react";
import data from "../../data.json";
import { gsap } from "gsap";

const Destination = () => {
  const [activeTab, setActiveTab] = useState<string>("Moon");
  const bgImage = window.innerWidth > 1170
    ? "background-destination-desktop.jpg"
    : (window.innerWidth > 768 && window.innerWidth < 1170)
      ? "background-destination-tablet.jpg"
      : "background-destination-mobile.jpg";

  const currentTab = data.destinations.find(item => item.name === activeTab);
  const destinationName = useRef<HTMLHeadingElement | null>(null);
  const destinationDescription = useRef<HTMLParagraphElement | null>(null);
  const previewValues = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--bg-image", `url(/assets/destination/${bgImage}) no-repeat`);
  }, [bgImage]);

  useEffect(() => {
    if (destinationName.current && destinationDescription.current && previewValues.current) {
      const tl = gsap.timeline();

      // Hide previous content immediately
      tl.set([destinationName.current, destinationDescription.current, ...Array.from(previewValues.current.children || [])], { opacity: 0 })
        .fromTo(
          [destinationName.current, destinationDescription.current, ...Array.from(previewValues.current.children || [])],
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 2, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4 }
        );

      return () => {
        tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
      };
    }
  }, [activeTab]);
  window.gsap = gsap
  useEffect(() => {
    setTimeout(() => {
      if (imageRef.current) {
        const tl = gsap.timeline();


        // Start animation
        tl.fromTo(
          imageRef.current,
          { scale: 0.8, rotateX: 0, rotateY: 0, rotateZ: 0 },
          {
            scale: 1,
            opacity: 1,
            rotateX: 10,
            rotateY: 10,
            rotateZ: 10,
            duration: 2,
            ease: "circ.out"
          }
        );

        return () => {
          tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
        };
      }

    },200)
  }, [activeTab]);


  useEffect(() => {
    if (tabs.current) {
      const tl = gsap.timeline();

      tl.fromTo(
        tabs.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 1, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.4 }
      );

      return () => {
        tl.kill(); // Cleanup timeline on component unmount
      };
    }
  }, []);

  return (
    <div className='destination'>
      <h2 className='content-title'><span>01</span> Pick your destination</h2>
      <div className="destination-content">
        {currentTab && (
          <div className="preview">
            <div className="image-wrapper" ref={imageRef}>
              <img src={currentTab.images.png} alt="" />
            </div>
            <div className="preview-details">
              <ul ref={tabs} className="tabs">
                {data.destinations.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => setActiveTab(item.name)}
                    className={`tab-item ${item.name === activeTab ? "active" : ""}`}
                  >
                    {item.name.toLocaleUpperCase()}
                  </li>
                ))}
              </ul>
              <h3 ref={destinationName} className='destination-name'>{currentTab.name}</h3>
              <p ref={destinationDescription} className='destination-description'>{currentTab.description}</p>
              <div ref={previewValues} className="preview-values">
                <p className='value-item'>
                  <span className='label'>AVG. DISTANCE</span>
                  <span className='value'>{currentTab.distance}</span>
                </p>
                <p className='value-item'>
                  <span className='label'>Est. travel time</span>
                  <span className='value'>{currentTab.travel}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Destination;
