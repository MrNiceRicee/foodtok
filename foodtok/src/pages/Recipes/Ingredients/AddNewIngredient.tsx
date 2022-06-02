import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { get } from '@apis/ingredient';
import { Ingredient } from '@foodtok-types/ingredient';

const selectStyle = {};

const AddNewIngredient = () => {
  const [selectedIngredients, setSelectedIngredients] =
    useState<Array<Ingredient> | null>(null);

  const fetchIngredients = async (input: string) => {
    const { data } = await get({ filter: { name: input } });
    return data.data;
  };

  const handleOnChange = (
    newValues: OnChangeValue<Ingredient, true>,
    actionMeta: ActionMeta<Ingredient>
  ) => {
    console.log(newValues);
    setSelectedIngredients([...newValues]);
    console.log(actionMeta);
  };
  return (
    <div className="dark:bg-gray-800 dark:text-black noFocus">
      <AsyncCreatableSelect
        defaultOptions
        isClearable
        isMulti
        classNamePrefix="react-select"
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.name}
        onChange={handleOnChange}
        loadOptions={fetchIngredients}
        maxMenuHeight={115}
      />
    </div>
  );
};

export default AddNewIngredient;
