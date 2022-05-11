import { useState } from 'react';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { Users } from '@foodtok-types/users';
import { updateUser } from '@apis/user';
import axios, { AxiosError } from 'axios';
import GrowIn from '@components/GrowIn';
import ctl from '@netlify/classnames-template-literals';

type key = 'displayName';

const EditForm = ({ user, id }: { user?: Users; id?: string }) => {
  const [model, setModel] = useState<{ displayName: string | undefined }>({
    displayName: user?.displayName,
  });
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const userUpdate = updateUser(id);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (model.displayName === user?.displayName) return;
    try {
      await userUpdate.mutateAsync({
        displayName: model.displayName,
      });
      setError(null);
    } catch (err) {
      const catchError = err as Error | AxiosError;
      if (axios.isAxiosError(catchError)) {
        setError(catchError.response?.data || catchError.message);
      } else {
        setError(catchError.message);
      }
    }
  };

  const onChange = (key: key, e: React.ChangeEvent<HTMLInputElement>) => {
    setModel((old) => ({ ...old, [key]: e.target.value }));
  };

  const onDismissError = () => {
    setError(null);
  };

  const toggleEditing = () => {
    setEditing((old) => {
      if (old) {
        setModel({
          displayName: user?.displayName,
        });
      }
      return !old;
    });
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <form
        className={ctl(`
          h-full
          max-w-sm
          relative
          overflow-hidden rounded-md
          shadow-md shadow-slate-700/40 dark:shadow-slate-900
          border
        `)}
        onSubmit={onSubmitHandler}
      >
        <header
          className={ctl(`
            text-center 
            rounded-t-lg
            h-fit
            pb-2
          `)}
        >
          <button
            className={ctl(`
                pt-3 text-4xl font-bold relative
                tracking-wider 
                text-black dark:text-white
                 w-full
              `)}
            type="button"
            onClick={toggleEditing}
          >
            Edit Account
          </button>
        </header>
        <GrowIn open={editing}>
          <section className="px-6 py-3">
            <TextInput
              name="name"
              value={model.displayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange('displayName', e)
              }
              divClass="scale-0 animate-grow"
              type="text"
              variance="outline"
            />
          </section>
          <GrowIn height="5rem" open={!!error}>
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
                <p>Oops! {error}</p>
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
            <Button type="submit" className="px-9">
              <p className="dark:text-slate-50">ok</p>
            </Button>
          </footer>
        </GrowIn>
      </form>
    </div>
  );
};

export default EditForm;
