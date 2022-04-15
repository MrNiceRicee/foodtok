const RecipeIndex = () => {
  const hundred = Array(100).fill('');
  return (
    <div className="prose flex flex-col flex-nowrap dark:text-slate-100">
      {hundred.map((item, index) => (
        <div key={index}>{`oi oi wait a minute thats soo cool! ${index}`}</div>
      ))}
    </div>
  );
};

export default RecipeIndex;
