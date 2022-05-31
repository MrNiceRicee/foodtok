import { useState } from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { get } from '@apis/ingredient';
import { Ingredient } from '@foodtok-types/ingredient';

const selectStyle = {};

const AddNewIngredient = () => {
  const [value, setValue] = useState<string | null>(null);

  const fetchIngredients = async (input: string) => {
    console.log(input);
    const res = await get({ name: input });
    // return res.data.data.filter((i) =>
    //   i.name.toLowerCase().includes(input.toLowerCase())
    // );
    return res.data.data;
  };
  return (
    <div className="dark:bg-gray-800 dark:text-black noFocus">
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        isClearable
        isMulti
        classNamePrefix="react-select"
        getOptionLabel={(option: Ingredient) => option.name}
        loadOptions={fetchIngredients}
        maxMenuHeight={100}
      />
    </div>
  );
};

export default AddNewIngredient;
