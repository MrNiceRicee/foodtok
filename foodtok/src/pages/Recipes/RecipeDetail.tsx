import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import { getRecipe } from '@apis/recipes';
import { fetchData } from '@apis/tiktokEmbed';
import { recipe as RecipeType } from '@foodtok-types/recipe';
import CardLoading from '@components//CardLoading';
import Image from '@components//Image';
import { tiktok } from '@foodtok-types/tiktok';
import useUser from '@hooks/useUser';
import Button from '@components/Button';
import { useQuery, useQueryClient } from 'react-query';
import RecipeDetailIngredients from './Ingredients/RecipeDetailIngredients';

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn z-40"></div>
);

const Thumbnail = ({
  recipe,
  tiktokData,
}: {
  recipe?: RecipeType;
  tiktokData?: tiktok;
}) => {
  return (
    <header
      className={ctl(`
        relative 
        ${tiktokData?.thumbnail_url ? 'h-auto' : 'h-[42rem]'}
        md:basis-2/3
        rounded-t-lg
        overflow-hidden
      `)}
    >
      <div className="flex pointer-events-none">
        <h1
          className={ctl(`
          font-black
          uppercase
          text-6xl text-shadow
          transition-colors duration-700
          ${
            tiktokData?.thumbnail_url
              ? 'text-slate-100 shadow-orange-700 '
              : 'text-slate-700'
          }
        `)}
        >
          {recipe?.name}
        </h1>
      </div>
      <a
        href={recipe?.url || undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={tiktokData?.thumbnail_url || ''} error={<DefaultUrl />} />
      </a>
    </header>
  );
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tiktokData, setTiktokdata] = useState<tiktok | null | undefined>();
  const [userMatch, setUserMatch] = useState(false);

  const user = useUser();
  const { isLoading, data, refetch } = getRecipe(id ? +id : 0);

  const { refetch: tiktokRes } = useQuery(
    [`RecipeCard_Tiktok_${data?._id}`, `${user?.id}`],
    () =>
      data && fetchData(data.longUrl || '').then((item) => setTiktokdata(item))
  );

  useEffect(() => {
    if (user?.id === data?.User.id) {
      setUserMatch(true);
    }
  }, [user, data, id, setUserMatch]);

  const onEdit = () => navigate('edit');

  const onRefresh = () => {
    refetch();
    tiktokRes();
    queryClient.invalidateQueries([
      `Recipe_${data?._id}`,
      `RecipeCard_Tiktok_${data?._id}`,
      `${user?.id}`,
    ]);
  };

  if (isLoading) return <CardLoading rKey="Loading_Recipe_Detail" />;

  return (
    <div className="w-full border-orange-200 py-3 pb-10 mb-10 md:flex no-underline">
      <Thumbnail
        recipe={data}
        tiktokData={tiktokData ? tiktokData : undefined}
      />
      <section
        className="container flex flex-col 
          px-2 md:basis-2/3
          prose dark:prose-invert
        "
      >
        <strong className="text-xl font-black">{`${data?.User.name} `}</strong>
        <p className="font-light w-full px-2 flex flex-col">
          {data?.description}
        </p>
        {tiktokData ? (
          <>
            <strong className="text-xl font-black">
              @{tiktokData?.author_name}
            </strong>
            <p className="font-light w-full px-2 flex flex-col mt-0">
              {tiktokData?.title}
            </p>
          </>
        ) : null}
        {userMatch && (
          <div>
            <Button type="button" onClick={onRefresh}>
              refresh
            </Button>
            <Button type="button" onClick={onEdit}>
              edit recipe
            </Button>
          </div>
        )}
        {data?.Ingredients && user?.id && (
          <RecipeDetailIngredients
            Ingredients={data?.Ingredients}
            RecipeId={data._id}
            UserId={user.id}
          />
        )}
      </section>
    </div>
  );
};

export default RecipeDetail;
