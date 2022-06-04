import { useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ctl from '@netlify/classnames-template-literals';
import { useNavigate, useParams } from 'react-router-dom';
import { getRecipe, updateRecipe } from '@apis/recipes';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import GrowIn from '@components/GrowIn';

interface IngredientInstance {
  IngredientId: number;
  name: string;
  servingSize: number | string | null;
  servingUnit: string | null;
  edited?: boolean;
  remove?: boolean;
}
interface ModelInstance {
  name: string;
  description: string;
  url: string;
  Ingredients: Array<IngredientInstance>;
}

const RecipeEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState<ModelInstance>({
    name: '',
    description: '',
    url: '',
    Ingredients: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, data } = getRecipe(id ? +id : 0);

  const sendUpdate = updateRecipe(id ? +id : 0, setError);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const updated = await sendUpdate.mutateAsync({
      ...model,
      Ingredients: model.Ingredients.filter((item) => item.edited),
    });

    if (updated) {
      // await refetch();
      setLoading(false);
      setEdited(false);
      navigate(`/recipes/${id}`);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setModel({
        name: data.name ?? '',
        description: data.description ?? '',
        url: data.url ?? '',
        Ingredients: data.Ingredients ?? [],
      });
    }
  }, [isLoading]);

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setModel((old) => ({ ...old, [key]: e.target.value }));
      setEdited(true);
    };

  const onIngredientChange =
    (key: 'name' | 'servingSize' | 'servingUnit', index: number) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const temp = { ...model };
      temp.Ingredients[index][key] = e.target.value;
      temp.Ingredients[index].edited = true;
      setModel(temp);
      setEdited(true);
    };

  const onIngredientChangeRemove = (index: number) => () => {
    const temp = { ...model };
    if (!temp.Ingredients[index].remove) {
      temp.Ingredients[index].remove = true;
    } else {
      temp.Ingredients[index].remove = false;
    }
    temp.Ingredients[index].edited = true;

    setModel(temp);
    setEdited(true);
  };

  const onDismissError = () => {
    setError(null);
    setLoading(false);
  };

  const onCancel = () => {
    if (data) {
      if (!edited) {
        // go back if it's already default
        navigate(-1);
      }
      setModel({
        name: data.name ?? '',
        description: data.description ?? '',
        url: data.url ?? '',
        Ingredients: data.Ingredients || [],
      });
      setEdited(false);
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
          <section className="px-4 dark:text-slate-100">
            <TextInput
              name="title"
              value={model.name || ''}
              onChange={onChange('name')}
              variance="outline"
            />
            <TextInput
              name="url"
              value={model.url || ''}
              disabled={!!data?.url}
              onChange={onChange('url')}
              inputClass={`${data?.url ? 'opacity-50' : ''}`}
              variance="outline"
            />
            <div className="flex flex-col-reverse gap-2">
              <textarea
                name="description"
                value={model.description || ''}
                onChange={onChange('description')}
                placeholder=" "
              />
              <label className="dark:text-slate-100">description</label>
            </div>
          </section>
          <section className="px-4 dark:text-slate-100 py-3">
            <header className="pt-1">
              <h2 className="text-xl font-black inline-block">Ingredients</h2>
            </header>
            <div className="flex gap-2 justify-between">
              <div className="basis-1/4">
                <span>name</span>
              </div>
              <div className="text-right basis-1/4">
                <span>size</span>
              </div>
              <div className="text-right basis-1/4">
                <span>unit</span>
              </div>
              <div className="basis-1/4 text-center">
                <span>delete</span>
              </div>
            </div>
            {model.Ingredients?.map((item, idx) => (
              <div
                className="flex gap-2 justify-between"
                key={item.IngredientId}
              >
                <input
                  className={ctl(`
                    block w-full
                    basis-1/4
                    prose
                    px-0 pb-0
                  focus-within:border-pink-500
                    appearance-none focus:outline-none focus:ring-0
                    bg-transparent outline-none border-b
                    text-slate-400 dark:text-slate-500
                    active:text-slate-900 focus:text-slate-900
                    dark:active:text-slate-200 dark:focus:text-slate-200
                    duration-300
                  `)}
                  value={item.name}
                  placeholder="-"
                  disabled
                  onChange={onIngredientChange('name', idx)}
                />
                <input
                  className={ctl(`
                    block w-full
                    basis-1/4
                    prose
                    px-0 pb-0
                    text-right
                  focus-within:border-pink-500
                    appearance-none focus:outline-none focus:ring-0
                    bg-transparent outline-none border-t-0 border-r-0 border-l-0 border-b
                    border-inherit
                    text-slate-400 dark:text-slate-500
                    active:text-slate-900 focus:text-slate-900
                    dark:active:text-slate-200 dark:focus:text-slate-200
                    duration-300
                  `)}
                  value={`${item.servingSize}`}
                  placeholder="0"
                  type="number"
                  onChange={onIngredientChange('servingSize', idx)}
                />
                <input
                  className={ctl(`
                    block w-full
                    basis-1/4
                    prose
                    px-0 pb-0
                    text-right
                  focus-within:border-pink-500
                    appearance-none focus:outline-none focus:ring-0
                    bg-transparent outline-none border-b
                    text-slate-400 dark:text-slate-500
                    active:text-slate-900 focus:text-slate-900
                    dark:active:text-slate-200 dark:focus:text-slate-200
                    duration-300
                  `)}
                  value={`${item.servingUnit || ''}`}
                  placeholder="-"
                  onChange={onIngredientChange('servingUnit', idx)}
                />
                <div className="basis-1/4 flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="p-2"
                    onChange={onIngredientChangeRemove(idx)}
                    checked={item.remove}
                  />
                </div>
              </div>
            ))}
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
              {!edited ? 'back' : 'cancel'}
            </Button>
            <Button
              className={ctl(
                `mx-2 ${
                  loading ? 'pointer-events-none cursor-none brightness-50' : ''
                }`
              )}
              type="submit"
            >
              {loading ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="lg"
                  className="animate-spin min-w-[4rem] pointer-events-none cursor-none"
                />
              ) : (
                'confirm'
              )}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default RecipeEditForm;
