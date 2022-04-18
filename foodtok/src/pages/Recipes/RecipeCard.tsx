import { useQuery } from 'react-query';
import Image from '../../components/Image';
import { recipe } from '../../types/search';
import { fetchData } from '../../api/tiktokEmbed';
import { Link } from 'react-router-dom';

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn"></div>
);

const RecipeCard = ({ recipe }: { recipe: recipe }) => {
  const { data: recipeData } = useQuery(
    `RecipeDetail_Tiktok_${recipe._id}`,
    () => fetchData(recipe?.url || '').then((item) => item)
  );

  return (
    <Link
      className="w-full border-orange-200 mb-2 md:flex no-underline"
      to={`${recipe._id}`}
    >
      <header
        className={`
        relative 
        ${recipeData?.thumbnail_url ? 'h-auto min-h-[18rem]' : 'h-72'}
        bg-gray-600
        md:basis-full
        rounded-t-lg
        overflow-hidden
        `}
      >
        <div className="absolute inset-0 h-10 z-30 flex m-3">
          <h1
            className={`
              font-black
              uppercase
              text-6xl text-shadow
              transition-colors duration-700
              ${
                recipeData?.thumbnail_url
                  ? 'text-slate-100 shadow-orange-700 '
                  : 'text-slate-700'
              }
            `}
          >
            {recipe.name}
          </h1>
        </div>
        <Image src={recipeData?.thumbnail_url || ''} error={<DefaultUrl />} />
      </header>
      <section className="container flex h-12 prose dark:prose-invert px-2 md:basis-2/3">
        <p className="font-light">
          <strong className="font-black">{`${recipe.Creator.name} `}</strong>
          {recipe.description}
        </p>
      </section>
    </Link>
  );
};

export default RecipeCard;
