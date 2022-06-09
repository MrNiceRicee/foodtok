import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { OnChangeValue } from 'react-select';
import { get, post } from '@apis/ingredient';
import { addRecipeIngredients } from '@apis/recipes';
import Button from '@components/Button';
import useDarkMode from '@hooks/useDarkMode';
import GrowIn from '@components/GrowIn';
import ctl from '@netlify/classnames-template-literals';
import { parseError } from '@apis/util';

const AddNewIngredient = ({
  RecipeId,
  UserId,
}: {
  RecipeId: string;
  UserId: string;
}) => {
  const [mode] = useDarkMode();
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{
    label: string;
    value: number;
  }> | null>(null);

  const fetchIngredients = async (input: string) => {
    const { data } = await get({ filter: { name: input } });
    return data.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
  };

  const addIngredients = addRecipeIngredients(setError, RecipeId);

  const handleOnChange = (
    newValues: OnChangeValue<{ label: string; value: number }, true>
  ) => {
    setSelectedIngredients([...newValues]);
  };

  const handleCreate = async (inputValue: string) => {
    try {
      const created = await post({ UserId, name: inputValue });
      handleOnChange([
        ...selectedIngredients || [],
        {
          label: created.data.data.name,
          value: created.data.data._id,
        },
      ]);
    } catch (err) {
      setError(parseError(err));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (selectedIngredients) {
      const response = await addIngredients.mutateAsync(
        selectedIngredients?.map((item) => ({ _id: item.value }))
      );
      if (response) {
        setSelectedIngredients(null);
        // refetch();
      }
    }
  };

  const onDismissError = () => setError(null);

  return (
    <form
      className="dark:text-black noFocus flex flex-col gap-2 mb-4"
      onSubmit={onSubmit}
    >
      <AsyncCreatableSelect
        defaultOptions
        isClearable
        isMulti
        backspaceRemovesValue
        escapeClearsValue
        isSearchable
        classNamePrefix="react-select"
        onChange={handleOnChange}
        loadOptions={fetchIngredients}
        onCreateOption={handleCreate}
        placeholder="Search Ingredients..."
        maxMenuHeight={160}
        value={selectedIngredients}
        styles={{
          option: (provided, state) => ({
            ...provided,
            backgroundColor: !mode
              ? state.isFocused
                ? '#d4d4d4'
                : '#f1f5f9'
              : state.isFocused
              ? '#404040'
              : '#171717',
            color: !mode ? '#1e293b' : '#f1f5f9',
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: !mode ? '#f5f5f5' : '#171717',
          }),
          control: (provided) => ({
            ...provided,
            color: !mode ? '#1e293b' : '#f1f5f9',
            backgroundColor: !mode ? '#fafafa' : '#171717',
          }),
          multiValue: (provided) => ({
            ...provided,
            color: !mode ? '#1e293b' : '#f1f5f9',
            backgroundColor: !mode ? '#d4d4d4' : '#3f3f46',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: !mode ? '#1e293b' : '#f1f5f9',
            backgroundColor: !mode ? '#d4d4d4' : '#3f3f46',
          }),
          input: (provided) => ({
            ...provided,
            color: !mode ? '#1e293b' : '#f1f5f9',
          }),
        }}
      />
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
    </form>
  );
};

export default AddNewIngredient;
