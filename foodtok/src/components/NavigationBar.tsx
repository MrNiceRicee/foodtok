import ctl from '@netlify/classnames-template-literals';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const anchorStyle = (state: boolean) =>
  ctl(`
  w-full h-full relative
  justify-center block text-center
  py-1
  before:bg-orange-400 before:h-0 before:w-full before:hover:h-1 before:focus:h-1 before:active:h-1 before:absolute before:inset-0 before:transition-all before:duration-300 before:ease-out
  text-slate-800 dark:text-slate-100 hover:text-orange-600 active:text-orange-600 focus:text-orange-600 transition-all duration-500 ease-out
  dark:hover:text-orange-400 dark:active:text-orange-400 dark:focus:text-orange-400
  `);

const navStyle = ctl(
  `
  bg-slate-100 dark:bg-slate-800 transition-colors
  border-t border-slate-400 dark:border-slate-600
  shadow-t-md dark:shadow-slate-600
  block fixed inset-x-0 bottom-0 z-auto mx-auto
  w-full sm:max-w-4xl
  `
);

const NavigationBar = () => {
  const [open, setOpen] = useState(false);
  const [menuHover, setMenuHover] = useState(false);

  const handleMenu = () => setOpen((old) => !old);
  const hovering = () => setMenuHover(true);
  const leftHover = () => setMenuHover(false);

  return (
    <nav className={navStyle}>
      <ul className="flex justify-evenly">
        <li className="w-full inline-block relative" onClick={handleMenu}>
          <Link
            to="/"
            className={anchorStyle(true)}
            onMouseEnter={hovering}
            onMouseLeave={leftHover}
            onFocus={hovering}
            onBlur={leftHover}
          >
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
          </Link>
        </li>
        <li className="w-full inline-block relative">
          <Link to="recipes" className={anchorStyle(true)}>
            <FontAwesomeIcon
              icon={faUtensils}
              size="lg"
              className="inline-block"
            />
            <span className="block text-sm">recipes</span>
          </Link>
        </li>
        <li className="w-full inline-block relative">
          <Link to="creators" className={anchorStyle(true)}>
            <FontAwesomeIcon
              icon={faUtensils}
              size="lg"
              className="inline-block"
            />
            <span className="block text-sm">creators</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
