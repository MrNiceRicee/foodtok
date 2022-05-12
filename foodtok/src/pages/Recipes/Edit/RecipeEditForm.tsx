import { useEffect, useState } from 'react';
import ctl from '@netlify/classnames-template-literals';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipe, updateRecipe } from '@apis/recipes';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import GrowIn from '@components/GrowIn';

interface ModelInstance {
  name: string;
  description: string;
  url: string;
}

const RecipeEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<ModelInstance>({
    name: '',
    description: '',
    url: '',
  });

  const [error, setError] = useState<string | null>(null);
  const { isLoading, data } = getRecipe(id ? +id : 0);

  const sendUpdate = updateRecipe(id ? +id : 0, setError);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('model', model);
    const updated = await sendUpdate.mutateAsync(model);

    if (updated) {
      navigate(`/recipes/${id}`);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setModel({
        name: data.name ?? '',
        description: data.description ?? '',
        url: data.url ?? '',
      });
    }
  }, [isLoading]);

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setModel((old) => ({ ...old, [key]: e.target.value }));

  const onDismissError = () => {
    setError(null);
  };

  const onCancel = () => {
    if (data) {
      setModel({
        name: data.name ?? '',
        description: data.description ?? '',
        url: data.url ?? '',
      });
    }
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
          px-4
        `)}
          method="POST"
          onSubmit={onSubmit}
        >
          <header
            className={ctl(`
              text-center 
              rounded-t-lg
              h-fit
              py-3
            `)}
          >
            <h1
              className={ctl(`
                text-4xl font-bold relative
                tracking-wider 
                w-full
                text-black dark:text-white
              `)}
            >
              Editing Recipe
            </h1>
          </header>
          <section className="px-4">
            <TextInput
              name="title"
              value={model.name || ''}
              onChange={onChange('name')}
              divClass="scale-0 animate-grow"
              variance="outline"
            />
            <TextInput
              name="url"
              value={model.url || ''}
              onChange={onChange('url')}
              divClass="scale-0 animate-grow"
              variance="outline"
            />
            <TextInput
              name="description"
              value={model.description || ''}
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

export default RecipeEditForm;
