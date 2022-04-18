import ctl from '@netlify/classnames-template-literals';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faBars,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const anchorStyle = (state: boolean) =>
  ctl(`
  cursor-pointer
  w-full h-full relative
  justify-center inline-block text-center
  py-1
  before:bg-orange-400 before:h-0 before:w-full before:hover:h-1 before:focus:h-1 before:active:h-1 before:absolute before:inset-0 before:transition-all before:duration-300 before:ease-out
  text-slate-800 dark:text-slate-100 hover:text-orange-600 active:text-orange-600 focus:text-orange-600 transition-all duration-500 ease-out
  dark:hover:text-orange-400 dark:active:text-orange-400 dark:focus:text-orange-400
  ${state ? 'text-orange-400 before:h-1' : ''}
  `);

const navStyle = ctl(
  `
  bg-slate-100 dark:bg-slate-800 transition-colors
  border-t border-slate-400 dark:border-slate-600
  shadow-t-md dark:shadow-slate-600
  block fixed inset-x-0 bottom-0 z-[9999] mx-auto
  w-full sm:max-w-4xl
  `
);

const NavigationBar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({
    menu: false,
    recipes: location.pathname.includes('recipes'),
    creators: location.pathname.includes('creators'),
  });

  const handleActive = (state: 'menu' | 'recipes' | 'creators'): undefined => {
    const newState = {
      menu: false,
      recipes: false,
      creators: false,
    };
    newState[state] = true;
    setActive(newState);
    return;
  };

  return (
    <nav className={navStyle}>
      <ul className="flex justify-evenly">
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('menu')}
        >
          <div className={anchorStyle(active.menu)}>
            <FontAwesomeIcon
              icon={faBars}
              size="lg"
              style={{
                background: '',
              }}
              className="inline-block"
            />
            <span
              className={`block text-sm relative
            before:content-['open'] before:absolute before:block before:inset-0 before:transition-opacity before:duration-200 before:ease-out
            ${open ? 'before:opacity-0' : ' '}
            after:content-['close'] after:absolute after:block after:inset-0 after:transition-opacity after:duration-200 after:ease-out
            ${!open ? 'after:opacity-0' : ' '}
            `}
            ></span>
          </div>
        </li>
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('recipes')}
        >
          <Link to="recipes" className={anchorStyle(active.recipes)}>
            <FontAwesomeIcon
              icon={faUtensils}
              size="lg"
              className="inline-block"
            />
            <span className="block text-sm">recipes</span>
          </Link>
        </li>
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('creators')}
        >
          <Link to="creators" className={anchorStyle(active.creators)}>
            <FontAwesomeIcon
              icon={faUserFriends}
              size="lg"
              className="inline-block"
            />
            <span className="block text-sm">search</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
