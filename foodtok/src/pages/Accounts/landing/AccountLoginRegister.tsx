import ctl from '@netlify/classnames-template-literals';
import { useState } from 'react';
import Button from '@components/Button';
import * as React from 'react';
import Login from './Login';
import Register from './Register';
import { useEffect } from 'react';

interface LoginModel {
  username: string;
  password: string;
}

interface RegisterModel extends LoginModel {
  rePassword: string;
}

const AccountLoginRegister = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [model, setModel] = useState<LoginModel | RegisterModel>({
    username: '',
    password: '',
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const loginRegisterState = (key: 'login' | 'register') => () => setMode(key);

  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setModel((old) => ({ ...old, [key]: e.target.value }));
  };

  useEffect(() => {
    console.log(model);
  }, [model]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className={ctl(`
          w-full px-4
          h-fit
          flex
      `)}
      >
        <form
          className={ctl(`
            w-full h-full
            min-h-[20em]
            
            overflow-hidden rounded-lg
            shadow-lg shadow-slate-700/20 dark:shadow-slate-900
        `)}
          onSubmit={onSubmitHandler}
        >
          <header
            className={ctl(`
              text-center 
              bg-slate-300 dark:bg-slate-700
              shadow-inner
              h-20
              flex 
         `)}
          >
            <Button
              variance="none"
              className="w-full h-full rounded-none shadow-none py-0 bg-inherit"
              type="button"
              onClick={loginRegisterState('login')}
            >
              <h2 className="prose dark:prose-invert font-extrabold">Login</h2>
            </Button>
            <Button
              variance="none"
              className="w-full h-full rounded-none shadow-none py-0 bg-inherit"
              type="button"
              onClick={loginRegisterState('register')}
            >
              <h2 className="prose dark:prose-invert font-extrabold">
                Register
              </h2>
            </Button>
          </header>
          {mode === 'login' ? (
            <Login model={model} onChange={onChange} />
          ) : (
            <Register model={model as RegisterModel} onChange={onChange} />
          )}
        </form>
      </div>
    </div>
  );
};

export default AccountLoginRegister;
