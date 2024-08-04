import logo from "../../../public/assets/shared/logo.svg";
import { useState} from "react";

interface HeaderProps {
  currentPath: string;
  onNavClick: (param: string) => void
}

const Header = ({currentPath, onNavClick}: HeaderProps) => {
  const [isNavOpened, setIsNavOpened] = useState(false)
  const getLinkClass = (path: string) => (currentPath === path ? 'active' : '');



  const handleNavBar = () => {

    setIsNavOpened(prev => !prev)

  }

  return (
    <header className="header">
      <div className="logo" onClick={() => onNavClick("/")}>
        <img src={logo} alt="logo for space"/>
      </div>
      <span className={`nav-mobile ${isNavOpened ? "opened":""}`} onClick={handleNavBar}></span>
      <nav className="nav">
        <ul className="list">
          <li className="list-item">
            <a
              href="/"
              className={getLinkClass('/')}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('/');
                setIsNavOpened(false)
              }}
            >
              <span>01</span> HOME
            </a>
          </li>
          <li className="list-item">
            <a
              href="/destination"
              className={getLinkClass('/destination')}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('/destination');
                setIsNavOpened(false)
              }}
            >
              <span>02</span> DESTINATION
            </a>
          </li>
          <li className="list-item">
            <a
              href="/crew"
              className={getLinkClass('/crew')}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('/crew');
                setIsNavOpened(false)
              }}
            >
              <span>03</span> CREW
            </a>
          </li>
          <li className="list-item">
            <a
              href="/technology"
              className={getLinkClass('/technology')}
              onClick={(e) => {
                e.preventDefault();
                onNavClick('/technology');
                setIsNavOpened(false)
              }}
            >
              <span>04</span> TECHNOLOGY
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
