import Button from '@components/Button';
import TextInput from '@components/TextInput';
import * as React from 'react';

interface model {
  username: string;
  password: string;
}

// this is a function type
// eslint-disable-next-line no-unused-vars
type onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;

const Login = ({ model, onChange }: { model: model; onChange: onChange }) => {
  return (
    <>
      <section className="px-6">
        <TextInput
          name="username"
          value={model.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange('username', e)
          }
        />
        <TextInput
          name="password"
          value={model.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange('password', e)
          }
        />
      </section>
      <footer className="px-6 pt-2 pb-6">
        <Button type="submit">ok</Button>
      </footer>
    </>
  );
};

export default Login;
