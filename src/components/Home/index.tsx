import {useEffect, useRef} from "react";
import {gsap} from "gsap";

interface HomeProps {
  handleExplore:(param:string) => void
}
const Home = ({handleExplore}:HomeProps) => {

  const bgImage = innerWidth > 1170 ? "background-home-desktop.jpg" : (innerWidth > 768 && innerWidth < 1170) ? "background-home-tablet.jpg" : innerWidth < 767 ? "background-home-mobile.jpg" : "background-home-desktop.jpg"
  const homeSubtitle = useRef<HTMLParagraphElement>(null);
  const homeTitle = useRef<HTMLHeadingElement>(null);
  const homeDescription = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    const tl = gsap.timeline();

    // Animation for the active tab
    tl.fromTo(
      [homeSubtitle.current, homeTitle.current, homeDescription.current],
      {opacity: 0, y: 4},
      {opacity: 1, y: 0, duration: 2, ease: "cubic-bezier(.25,.46,.45,.94)", stagger: 0.6}
    )
      .add(() => {
        // Cleanup function to reset opacity and position
        gsap.to(
          [homeSubtitle.current, homeTitle.current,homeDescription.current],
          {opacity: 0, y: 8}
        );
      }, "<");

    return () => {
      tl.kill(); // Cleanup timeline on component unmount or when activeTab changes
    };
  }, []);


  useEffect(() => {
    document.documentElement.style.setProperty("--bg-image", `url(/assets/home/${bgImage}) no-repeat`);
  }, [innerWidth])



  return (
    <div className='home'>
      <div className="home-content">
        <p ref={homeSubtitle} className='home-content__subtitle'>SO, YOU WANT TO TRAVEL TO</p>
        <h2 ref={homeTitle} className='home-content__title'>SPACE</h2>
        <p ref={homeDescription} className='home-content__description'>Let’s face it; if you want to go to space, you
          might as well genuinely
          go to outer space and not hover kind
          of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world
          experience!
        </p>
      </div>

      <button onClick={() => handleExplore("/destination")} className='home-content__button'>Explore</button>
    </div>
  );
};

export default Home;
