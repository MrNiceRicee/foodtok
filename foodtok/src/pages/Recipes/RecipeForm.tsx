import ctl from '@netlify/classnames-template-literals';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useState } from 'react';
import * as React from 'react';
import { post } from '@apis/recipes';

interface defaultValue {
  name: string;
  url: string;
  description: string;
  UserId: string;
}

const RecipeForm = ({
  header = 'Recipe Form',
  defaultValues,
}: {
  header?: string;
  defaultValues: defaultValue;
}) => {
  const [model, setModel] = useState(defaultValues);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await post(model);
  };

  const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setModel((old) => ({ ...old, [key]: e.target.value }));

  return (
    <div
      className={ctl(`
        w-full h-screen
        flex justify-center items-center relative o
        overflow-hidden
      `)}
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
          method="POST"
          onSubmit={onSubmit}
        >
          <header
            className={ctl(`
              text-center 
              rounded-t-lg
              h-fit
            `)}
          >
            <h1 className="pt-3 text-4xl font-bold text-black tracking-wider relative">
              <span>{header}</span>
              <span className="absolute inset-0 top-1/2 -translate-y-[55%] left-[.1rem] text-transparent -z-1 text-shadow-xs shadow-pink-500">
                {header}
              </span>
              <span className="absolute inset-0 top-1/2 -translate-y-[60%] -left-[.2rem] text-transparent -z-1 text-shadow-xs shadow-cyan-500">
                {header}
              </span>
            </h1>
          </header>
          <section className="px-6">
            <TextInput
              name="title"
              value={model.name}
              onChange={onChange('name')}
            />
            <TextInput
              name="url"
              value={model.url}
              onChange={onChange('url')}
            />
            <TextInput
              name="description"
              value={model.description}
              onChange={onChange('description')}
            />
            <TextInput
              name="user"
              value={model.UserId}
              onChange={onChange('UserId')}
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
    </div>
  );
};

RecipeForm.defaultProps = {
  defaultValues: {
    name: '',
    url: '',
    description: '',
    UserId: '',
  },
};

export default RecipeForm;
