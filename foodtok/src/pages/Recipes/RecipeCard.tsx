import { useQuery } from 'react-query';
import ctl from '@netlify/classnames-template-literals';
import Image from '@components//Image';
import { recipe as recipeType } from '@foodtok-types/recipe';
import { fetchData } from '@apis/tiktokEmbed';
import { Link } from 'react-router-dom';
const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn"></div>
);

// ${recipeData?.thumbnail_url ? 'h-auto min-h-[18rem]' : 'h-96'}

const RecipeCard = ({ recipe }: { recipe: recipeType }) => {
  const { data: recipeData } = useQuery(`RecipeCard_Tiktok_${recipe._id}`, () =>
    fetchData(recipe?.longUrl || '').then((item) => item)
  );

  return (
    <div className="relative">
      <Link
        className=" border-orange-200 py-3 no-underline"
        to={`/recipes/${recipe._id}`}
      >
        <header
          className={ctl(`
          relative
          bg-gray-600
          aspect-vertical
          md:basis-full
          rounded-t-lg
          overflow-hidden
        `)}
        >
          <Image src={recipeData?.thumbnail_url || ''} error={<DefaultUrl />} />
        </header>
        <section className="container flex flex-col prose dark:prose-invert">
          <h3
            className={ctl(`
              font-black
              uppercase
              text-xl
              tracking-wide
              mb-0
            `)}
          >
            {recipe.name}
          </h3>
          <p className="font-light h-16 truncate whitespace-normal">
            <strong className="font-normal">{`${
              recipe.User.displayName || recipe.User.name
            } `}</strong>
            <span className="">
              {recipe.description && recipe.description.length > 30
                ? `${recipe.description?.slice(0, 30)}...`
                : recipe.description}
            </span>
          </p>
        </section>
      </Link>
    </div>
  );
};

export default RecipeCard;
