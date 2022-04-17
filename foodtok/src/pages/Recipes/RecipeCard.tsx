import { useEffect, useState } from 'react';
import sauce from 'apisauce';
import Image from '../../components/Image';
import { searchData } from '../../types/search';
import { tiktokData } from '../../api/tiktokEmbed';
import { Link } from 'react-router-dom';

const DefaultUrl = () => (
  <div
    className="w-full h-full bg-orange-100 dark:bg-orange-200"
  ></div>
);

const tiktokFetch = sauce.create({
  baseURL: 'https://www.tiktok.com/oembed',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const RecipeCard = ({ recipe }: { recipe: searchData }) => {
  const [recipeData, setRecipeData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      if (recipe.url) {
        const recipeMetaData = await tiktokData(recipe.url);
        if (recipeMetaData?.data?.status_msg) {
          console.log('something went wrong');
          return;
        }
        setRecipeData(recipeMetaData?.data);
      }
    }

    fetchData();
  }, []);

  return (
    <Link
      className="w-full border-orange-200 mb-2 md:flex no-underline"
      to={`${recipe._id}`}
    >
      <header
        className={`
        relative 
        ${recipeData?.thumbnail_url ? 'h-auto' : 'h-72'}
        bg-gray-600
        md:basis-full
        `}
      >
        <div className="absolute inset-0 h-10 z-30 flex m-3">
          <h1
            className={`
              font-black
              uppercase
              text-6xl text-shadow
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
