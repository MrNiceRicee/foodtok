import { useEffect, useState } from 'react';
import ctl from '@netlify/classnames-template-literals';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faUserLarge,
  faMagnifyingGlass,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useQueryClient } from 'react-query';

const anchorStyle = (state: boolean, open: boolean, bar = true) =>
  ctl(`
    cursor-pointer
    w-full h-full flex flex-col
    justify-center inline-block text-center
    pb-3 pt-[0.5rem]
    ${
      bar &&
      `
      before:bg-cyan-400 before:h-0 before:w-full
      before:hover:h-1 before:focus:h-1 before:active:h-1
      before:absolute before:inset-0
      before:transition-all before:duration-300 before:ease-in-out

      md:before:w-0 md:before:h-full
      md:before:left-full md:before:-translate-x-full
      md:before:hover:h-full md:before:focus:h-full md:before:active:h-full
      `
    }
    text-slate-800 dark:text-slate-100
    transition-color duration-200 ease-out
    hover:text-cyan-600 active:text-cyan-600 focus:text-cyan-600
    dark:hover:text-cyan-400 dark:active:text-cyan-400 dark:focus:text-cyan-400
    ${
      state
        ? `
      text-cyan-400 
      dark:text-cyan-400
      before:h-1
      md:before:h-full
      md:before:w-[.5rem]
      `
        : 'before:bg-inherit'
    }
    ${
      open
        ? 'md:justify-center md:items-center'
        : 'md:justify-center md:items-end pt-5 pr-4 prose:span md:before:w-[.25rem]'
    }
    md:pt-5
  `);

const NavigationBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const [active, setActive] = useState({
    account: false,
    recipes: false,
    search: false,
  });

  useEffect(() => {
    setActive({
      account: location.pathname.includes('account'),
      recipes: location.pathname.includes('recipes'),
      search: location.pathname.includes('search'),
    });
  }, [location]);

  const handleActive = (state: 'account' | 'recipes' | 'search') => {
    setActive({
      account: state === 'account',
      recipes: state === 'recipes',
      search: state === 'search',
    });
    if (location.pathname === '/recipes')
      queryClient.invalidateQueries(['RecipeList']);
    if (location.pathname === '/search')
      queryClient.invalidateQueries(['SearchList']);
  };

  return (
    <nav
      className={ctl(
        `
        bg-slate-50 dark:bg-black
        border-t border-slate-400 dark:border-slate-600
        shadow-t-sm dark:shadow-slate-600
        block fixed inset-x-0 bottom-0 z-[9999] mx-auto
        overflow-hidden
        transition-all duration-300 ease-out

        md:bottom-1/2 md:translate-y-1/2 md:mx-0
        ${!open ? 'md:-translate-x-[70%]' : ''}
        md:max-w-[10rem]
        md:rounded-r-md
        md:shadow-none md:border-y md:border-r
        md:mx-safe
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
