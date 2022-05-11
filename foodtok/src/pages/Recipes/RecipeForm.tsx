import ctl from '@netlify/classnames-template-literals';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { useState } from 'react';
import * as React from 'react';
import { addRecipe } from '@apis/recipes';
import { useNavigate } from 'react-router-dom';
import GrowIn from '@components/GrowIn';

interface Model {
  name: string;
  url: string;
  description: string;
}

const RecipeForm = ({
  header = 'Recipe Form',
  defaultValues,
}: {
  header?: string;
  defaultValues: Model;
}) => {
  const [model, setModel] = useState(defaultValues);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const newRecipe = addRecipe();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error: err } = await newRecipe.start(model);
    if (err) {
      setError(err);
    }
    if (data) {
      navigate(`/recipes/${data._id}`);
    }
  };

  const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setModel((old) => ({ ...old, [key]: e.target.value }));

  const onDismissError = () => {
    setError(null);
  };

  const onCancel = () => {
    setModel({ name: '', url: '', description: '' });
    onDismissError();
  };

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
          max-w-sm
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
            <h1
              className={ctl(`
                pt-3 text-4xl font-bold relative
                tracking-wider 
                w-full
                text-black dark:text-white
              `)}
            >
              {header}
            </h1>
          </header>
          <section className="px-6 py-3">
            <TextInput
              name="title"
              value={model.name}
              onChange={onChange('name')}
              divClass="scale-0 animate-grow"
              variance="outline"
            />
            <TextInput
              name="url"
              value={model.url}
              onChange={onChange('url')}
              divClass="scale-0 animate-grow"
              variance="outline"
            />
            <TextInput
              name="description"
              value={model.description}
              onChange={onChange('description')}
              divClass="scale-0 animate-grow"
              variance="outline"
            />
          </section>
          <GrowIn height="3rem" open={!!error}>
            <figure>
              <Button
                className={ctl(`
                rounded-none 
              bg-red-500 dark:bg-red-700
                outline-none border-none
                w-full break-words
              `)}
                type="button"
                onClick={onDismissError}
              >
                <p>{error}</p>
              </Button>
            </figure>
          </GrowIn>
          <footer
            className={ctl(`
              flex justify-between
              px-3 py-4
              rounded-b-lg
            `)}
          >
            <Button
              className="mx-2 prose-p:text-yellow-400"
              type="reset"
              onClick={onCancel}
            >
              cancel
            </Button>
            <Button className="mx-2" type="submit">
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
  },
};

export default RecipeForm;
