import { useState } from 'react';
import ctl from '@netlify/classnames-template-literals';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faUserLarge,
  faMagnifyingGlass,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';

const anchorStyle = (state: boolean, open: boolean, bar = true) =>
  ctl(`
  cursor-pointer
  w-full h-full flex flex-col
  justify-center inline-block text-center
  pb-1 pt-2
  ${
    bar &&
    `
    before:bg-orange-400 before:h-0 before:w-full
    before:hover:h-1 before:focus:h-1 before:active:h-1
    before:absolute before:inset-0
    before:transition-color before:duration-300 before:ease-out

    md:before:w-0 md:before:h-full
    md:before:left-full md:before:-translate-x-full
    md:before:hover:h-full md:before:focus:h-full md:before:active:h-full
    `
  }
  text-slate-800 dark:text-slate-100 hover:text-orange-600 active:text-orange-600 focus:text-orange-600 transition-color duration-300 ease-out
  dark:hover:text-orange-400 dark:active:text-orange-400 dark:focus:text-orange-400
  ${
    state &&
    `
    text-orange-400 
    before:h-1
    md:before:h-full
    md:before:w-[.5rem]
    `
  }
  ${
    open
      ? 'md:justify-center md:items-center'
      : 'md:justify-center md:items-end pt-5 pr-4 prose:span'
  }
  md:pt-5
  `);

const NavigationBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const [active, setActive] = useState({
    account: location.pathname.includes('account'),
    recipes: location.pathname.includes('recipes'),
    search: location.pathname.includes('search'),
  });

  const handleActive = (state: 'account' | 'recipes' | 'search'): undefined => {
    const newState = {
      account: false,
      recipes: false,
      search: false,
    };
    newState[state] = true;
    setActive(newState);
    return;
  };

  return (
    <nav
      className={ctl(
        `
      bg-slate-100 dark:bg-slate-800
      border-t border-slate-400 dark:border-slate-600
      shadow-t-md dark:shadow-slate-600
      block fixed inset-x-0 bottom-0 z-[9999] mx-auto
      overflow-hidden
      transition-all duration-200

      md:bottom-1/2 md:translate-y-1/2 md:mx-0
      ${!open ? 'md:-translate-x-[70%]' : ''}
      md:max-w-[10rem]
      md:rounded-r-lg
      `
      )}
    >
      <ul
        className={ctl(`
          flex justify-evenly
          md:flex-col
        `)}
      >
        <li className="w-full relative hidden md:inline-block">
          <button
            className={anchorStyle(false, open, false)}
            onClick={() => setOpen((old) => !old)}
            type="button"
          >
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              size="lg"
              className={`inline-block translate-all duration-500 ease-out ${
                open ? '' : 'rotate-180'
              }`}
            />
            <span
              className={ctl(
                `block text-sm select-none ${open || 'md:text-transparent'}`
              )}
            >
              {open ? 'close' : 'open'}
            </span>
          </button>
        </li>
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('account')}
        >
          <Link to="account" className={anchorStyle(active.account, open)}>
            <FontAwesomeIcon
              icon={faUserLarge}
              size="lg"
              className="inline-block"
            />
            <span
              className={ctl(
                `block text-sm select-none ${open || 'md:text-transparent'}`
              )}
            >
              account
            </span>
          </Link>
        </li>
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('recipes')}
        >
          <Link to="recipes" className={anchorStyle(active.recipes, open)}>
            <FontAwesomeIcon
              icon={faUtensils}
              size="lg"
              className="inline-block"
            />
            <span
              className={ctl(
                `block text-sm select-none ${open || 'md:text-transparent'}`
              )}
            >
              recipes
            </span>
          </Link>
        </li>
        <li
          className="w-full inline-block relative"
          onClick={() => handleActive('search')}
        >
          <Link to="search" className={anchorStyle(active.search, open)}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="lg"
              className="inline-block"
            />
            <span
              className={ctl(
                `block text-sm select-none ${open || 'md:text-transparent'}`
              )}
            >
              search
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
