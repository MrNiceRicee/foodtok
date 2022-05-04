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

  const loginRegisterState = (key: 'login' | 'register') => () => setMode(key);

  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setModel((old) => ({ ...old, [key]: e.target.value }));
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log('logout error', error);
  };

  return (
    <div
      className={ctl(
        `w-full h-screen
        flex justify-center items-center relative
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
            container
            relative
            overflow-hidden rounded-lg
            shadow-md shadow-slate-700/40 dark:shadow-slate-900
        `)}
          onSubmit={onSubmitHandler}
        >
          <header
            className={ctl(`
              text-center 
              bg-slate-300/20 dark:bg-slate-700/20
              backdrop-blur
              rounded-t-lg
              shadow-inner
              h-20
              flex 
         `)}
          >
            <Button
              variance="none"
              className={ctl(`w-full h-full
              rounded-none py-0 
              rounded-tl-lg
              ${
                mode === 'login'
                  ? 'shadow-inner shadow-slate-600/30 dark:shadow-slate-900/30'
                  : 'shadow-none'
              }
              hover:bg-slate-500/10 after:bg-slate-500/10 focus:bg-slate-500/10
              dark:hover:bg-slate-900/30 dark:after:bg-slate-900/30 dark:focus:bg-slate-900/30  
              bg-inherit`)}
              type="button"
              onClick={loginRegisterState('login')}
            >
              <h2
                className={ctl(`
                prose dark:prose-invert
                font-extrabold
                transition-all duration-200
                ${mode === 'login' ? 'text-2xl' : 'text-sm font-light'}
              `)}
              >
                Login
              </h2>
            </Button>
            <Button
              variance="none"
              className={ctl(`w-full h-full
              rounded-none py-0 
              rounded-tr-lg
              ${
                mode === 'register'
                  ? 'shadow-inner shadow-slate-600/30 dark:shadow-slate-900/30'
                  : 'shadow-none'
              }
              hover:bg-slate-500/10 after:bg-slate-500/10 focus:bg-slate-500/10
              dark:hover:bg-slate-900/30 dark:after:bg-slate-900/30 dark:focus:bg-slate-900/30
              bg-inherit`)}
              type="button"
              onClick={loginRegisterState('register')}
            >
              <h2
                className={ctl(`
                prose dark:prose-invert
                font-extrabold
                transition-all duration-200
                ${mode === 'register' ? 'text-2xl' : 'text-sm font-light'}
              `)}
              >
                Register
              </h2>
            </Button>
          </header>
          <Login model={model} mode={mode} onChange={onChange} />
          <footer
            className={ctl(`
              flex justify-end
              px-6 py-4
              bg-slate-300/40 dark:bg-slate-700/40
              backdrop-blur
              rounded-b-lg
            `)}
          >
            <Button
              type="button"
              className="bg-emerald-500 shadow-slate-500/40 px-9"
              onClick={handleLogout}
            >
              <p className="dark:text-slate-50">logout</p>
            </Button>
            <Button
              type="submit"
              className="bg-emerald-500 shadow-slate-500/40 px-9"
            >
              <p className="dark:text-slate-50">ok</p>
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default AccountLoginRegister;
