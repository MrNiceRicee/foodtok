import TextInput from '@components/TextInput';
import * as React from 'react';
import ctl from '@netlify/classnames-template-literals';
import GrowIn from '@components/GrowIn';

interface model {
  username: string;
  password: string;
  rePassword: string;
}

// this is a function type
// eslint-disable-next-line no-unused-vars
type onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;

const Login = ({
  model,
  mode,
  onChange,
}: {
  model: model;
  mode: string;
  onChange: onChange;
}) => {
  return (
    <section
      className={ctl(`
        px-6
        py-4
        border-t border-b border-slate-50/30
        shadow-sm shadow-slate-900
        flex flex-col
        gap-3
      `)}
    >
      <TextInput
        name="email"
        value={model.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange('username', e)
        }
        divClass="scale-0 animate-grow"
        autoComplete="email"
        type="email"
        variance="outline"
      />
      <TextInput
        name="password"
        value={model.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange('password', e)
        }
        divClass="scale-0 animate-grow"
        variance="outline"
        type="password"
        autoComplete="current-password"
        minLength={6}
      />
      <GrowIn open={mode === 'register'}>
        <TextInput
          name="rePassword"
          value={model.rePassword}
          title="re-password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange('rePassword', e)
          }
          variance="outline"
          type="password"
          autoComplete="new-password"
          minLength={6}
        />
      </GrowIn>
    </section>
  );
};

Login.defaultProps = {
  mode: 'login',
};

export default Login;
