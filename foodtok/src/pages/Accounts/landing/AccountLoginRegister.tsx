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

  return (
    <div
      className={ctl(
        `w-full h-screen
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
            overflow-hidden rounded-lg
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
            <h1 className="pt-3 text-4xl font-bold text-slate-800 dark:text-slate-200">
              foodtok
            </h1>
            <div className="pb-2 pt-2 text-slate-800 dark:text-slate-200">
              <button
                className={ctl(
                  `relative
                  ${
                    mode === 'login'
                      ? `text-orange-600 dark:text-orange-400
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
                className={ctl(
                  `relative
                  ${
                    mode === 'register'
                      ? `text-orange-600 dark:text-orange-400
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
