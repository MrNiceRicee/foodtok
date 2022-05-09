import { useState } from 'react';
import TextInput from '@components/TextInput';
import Button from '@components/Button';
import { Users } from '@foodtok-types/users';
import { updateUser } from '@apis/user';

type key = 'displayName';

const EditForm = ({ user, id }: { user?: Users; id?: string }) => {
  const [model, setModel] = useState<{ displayName: string | undefined }>({
    displayName: user?.displayName,
  });

  const userUpdate = updateUser(id);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    userUpdate.mutate({ displayName: model.displayName });
  };

  const onChange = (key: key, e: React.ChangeEvent<HTMLInputElement>) => {
    setModel((old) => ({ ...old, [key]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center pt-10">
      <form className="" onSubmit={onSubmitHandler}>
        <header>Edit Account</header>
        <section>
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
        <footer className="flex justify-end">
          <Button type="submit" className="px-9">
            <p className="dark:text-slate-50">ok</p>
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default EditForm;
