import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  console.log(id);
  
  return <div>{id}</div>;
};

export default RecipeDetail;
