import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { one } from '../../api/recipes';
import LoadingBar from '../../components/LoadingBar';

const RecipeDetail = () => {
  const { id = 0 } = useParams();
  const { isError, isLoading, data } = useQuery(`Recipe_${id}`, () =>
    one(+id).then((res) => res.data)
  );

  if (!isLoading)
    return (
      <div className="h-96 w-full rounded-lg">
        <LoadingBar rounded />
      </div>
    );
  return <div></div>;
};

export default RecipeDetail;
