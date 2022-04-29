import ctl from '@netlify/classnames-template-literals';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useState } from 'react';
import * as React from 'react';

interface defaultValue {
  name: string;
  url: string;
  description: string;
}

const RecipeForm = ({
  header = 'Recipe Form',
  defaultValues,
}: {
  header?: string;
  defaultValues: defaultValue;
}) => {
  const [model, setModel] = useState(defaultValues);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setModel((old) => ({ ...old, [key]: e.target.value }));

  return (
    <div
      className={ctl(`
        m-safe p-safe w-full flex justify-center content-center
        `)}
    >
      <form
        className={ctl(
          `bg-slate-50 dark:bg-slate-700 rounded-lg shadow-lg

          overflow-hidden
          `
        )}
        method="POST"
        onSubmit={onSubmit}
      >
        <header
          className={ctl(`py-4 px-6 shadow-inner text-center 
        bg-slate-300 dark:bg-slate-900
        `)}
        >
          <h2
            className={ctl(`
            prose dark:prose-invert
            font-extrabold text-4xl
            text-slate-800 dark:text-slate-100`)}
          >
            {header}
          </h2>
        </header>
        <section className="px-6">
          <TextInput
            name="title"
            value={model.name}
            onChange={onChange('name')}
          />
          <TextInput name="url" value={model.url} onChange={onChange('url')} />
          <TextInput
            name="description"
            value={model.description}
            onChange={onChange('description')}
          />
        </section>
        <footer className="bg-slate-300 dark:bg-slate-900 py-3 px-6 flex justify-between shadow-inner">
          <Button className="mx-2 prose-p:text-yellow-400">cancel</Button>
          <Button variance="filled" className="mx-2 bg-sky-500" type="submit">
            confirm
          </Button>
        </footer>
      </form>
    </div>
  );
};

RecipeForm.defaultProps = {
  defaultValues: {
    name: '',
    url: '',
    description: '',
  },
};

export default RecipeForm;
