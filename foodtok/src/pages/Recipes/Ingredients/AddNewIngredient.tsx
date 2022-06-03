import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { OnChangeValue } from 'react-select';
import { get, post } from '@apis/ingredient';
import { useQueryClient } from 'react-query';
import { addRecipeIngredients } from '@apis/recipes';
import Button from '@components/Button';
import useDarkMode from '@hooks/useDarkMode';
import axios from 'axios';
import GrowIn from '@components/GrowIn';
import ctl from '@netlify/classnames-template-literals';

const AddNewIngredient = ({
  RecipeId,
  UserId,
}: {
  RecipeId: string;
  UserId: string;
}) => {
  const [mode] = useDarkMode();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Array<{
    label: string;
    value: number;
  }> | null>(null);

  const fetchIngredients = async (input: string) => {
    console.log('input', input);
    const { data } = await get({ filter: { name: input } });
    const manipulated = data.data.map((item) => ({
      label: item.name,
      value: item._id,
    }));
    console.log(manipulated);
    return manipulated;
  };

  const handleOnChange = (
    newValues: OnChangeValue<{ label: string; value: number }, true>
  ) => {
    setSelectedIngredients([...newValues]);
  };

  const handleCreate = async (inputValue: string) => {
    await post({ UserId, name: inputValue });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (selectedIngredients) {
      try {
        await addRecipeIngredients(
          RecipeId,
          selectedIngredients.map((items) => ({ _id: items.value }))
        );
        queryClient.invalidateQueries([
          `Recipe_${RecipeId}`,
          `RecipeCard_Tiktok_${RecipeId}`,
          `${UserId}`,
        ]);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return setError(err.response?.data);
        }
        setError('something went wrong');
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
        }}
      />
      <Button>Submit</Button>
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
