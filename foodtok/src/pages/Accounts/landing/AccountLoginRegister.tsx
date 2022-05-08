import ctl from '@netlify/classnames-template-literals';
import { useState } from 'react';
import Button from '@components/Button';
import * as React from 'react';
import Login from './Login';
import supabase from '@apis/supabase';

interface Model {
  username: string;
  password: string;
  rePassword: string;
}

const AccountLoginRegister = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [model, setModel] = useState<Model>({
    username: '',
    password: '',
    rePassword: '',
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { user, error } =
      mode === 'login'
        ? await supabase.auth.signIn({
            email: model.username,
            password: model.password,
          })
        : await supabase.auth.signUp(
            {
              email: model.username,
              password: model.password,
            },
            {
              data: {
                name: model.username,
              },
            }
          );
    console.log('error!', error);
    console.log('user', user);
  };

  const loginRegisterState = (key: 'login' | 'register') => () => {
    if (key === 'login')
      setModel((old) => ({
        username: old.username,
        password: '',
        rePassword: '',
      }));
    setMode(key);
  };

  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setModel((old) => ({ ...old, [key]: e.target.value }));
  };

  return (
    <div
      className={ctl(
        `
        w-full h-screen
        flex justify-center items-center relative o
        overflow-hidden
        `
      )}
    >
      <div
        className={ctl(`
          px-4 
        `)}
      >
        <form
          className={ctl(`
            h-full
            relative
            overflow-hidden rounded-md
            shadow-md shadow-slate-700/40 dark:shadow-slate-900
            border
        `)}
          onSubmit={onSubmitHandler}
        >
          <header
            className={ctl(`
              text-center 
              rounded-t-lg
              flex flex-col justify-center items-center
              h-fit
            `)}
          >
            <h1 className="pt-3 text-4xl font-bold text-black dark:text-white tracking-wider relative">
              <span>foodtok</span>
              <span className="absolute inset-0 top-1/2 -translate-y-[55%] left-[.1rem] text-transparent -z-1 text-shadow-xs shadow-pink-500">
                foodtok
              </span>
              <span className="absolute inset-0 top-1/2 -translate-y-[60%] -left-[.2rem] text-transparent -z-1 text-shadow-xs shadow-cyan-500">
                foodtok
              </span>
            </h1>
            <div className="pb-2 pt-2 text-slate-800 dark:text-slate-200">
              <button
                type="button"
                className={ctl(
                  `relative
                  ${
                    mode === 'login'
                      ? `text-pink-500
                        font-semibold`
                      : 'text-slate-400 dark:text-slate-500'
                  }`
                )}
                onClick={loginRegisterState('login')}
              >
                login
              </button>
              {' or '}
              <button
                type="button"
                className={ctl(
                  `relative
                  ${
                    mode === 'register'
                      ? `text-pink-500
                        font-semibold`
                      : 'text-slate-400 dark:text-slate-500'
                  }`
                )}
                onClick={loginRegisterState('register')}
              >
                register
              </button>
            </div>
          </header>
          <Login model={model} mode={mode} onChange={onChange} />
          <footer
            className={ctl(`
              flex justify-end
              px-6 py-4
              rounded-b-lg
            `)}
          >
            <Button type="submit" className="px-9">
              <p className="dark:text-slate-50">ok</p>
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AccountLoginRegister;
