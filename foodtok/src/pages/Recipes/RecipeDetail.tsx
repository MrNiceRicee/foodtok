import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import ctl from '@netlify/classnames-template-literals';
import { getRecipe, updateRecipe } from '@apis/recipes';
import { fetchData } from '@apis/tiktokEmbed';
import { recipe as RecipeType } from '@foodtok-types/recipe';
import CardLoading from '@components//CardLoading';
import Image from '@components//Image';
import { tiktok } from '@foodtok-types/tiktok';
import useUser from '@hooks/useUser';
import Button from '@components/Button';
import { useQuery, useQueryClient } from 'react-query';
import LoadingBar from '@components/LoadingBar';
import { useUserMatch } from './state';
import {
  faPenToSquare,
  faFloppyDisk,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GrowIn from '@components/GrowIn';
const RecipeDetailIngredients = lazy(
  () => import('./Ingredients/RecipeDetailIngredients')
);

const DefaultUrl = () => (
  <div className="w-full h-full bg-orange-100 dark:bg-orange-200 animate-fadeIn z-40"></div>
);

interface ModelInstance {
  name?: string;
  description?: string;
}

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
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tiktokData, setTiktokdata] = useState<tiktok | null | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [userMatch, setUserMatch] = useUserMatch();
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<ModelInstance>({});

  const user = useUser();
  const { isLoading, data, refetch } = getRecipe(id ? id : 0);
  const sendUpdate = updateRecipe(id, setError);

  const { refetch: tiktokRes } = useQuery(
    [`RecipeCard_Tiktok_${data?._id}`, `${user?.id}`],
    () =>
      data && fetchData(data.longUrl || '').then((item) => setTiktokdata(item))
  );

  useEffect(() => {
    if (user?.id === data?.User.id) {
      setUserMatch(true);
    } else {
      setUserMatch(false);
    }
  }, [user?.id, data?.User, id, setUserMatch]);

  useEffect(() => {
    if (!isLoading && data) {
      setModel({
        name: data.name,
        description: data.description || '',
      });
    }
  }, [isLoading]);

  // const onEdit = () => navigate('edit');

  const onClickEdit = async () => {
    if (!editing) {
      setEditing(true);
      return;
    }
    if (edited) {
      setLoading(true);
      const res = await sendUpdate.mutateAsync(model);
      if (res) {
        refetch();
        setError(null);
      }
      setLoading(false);
    }
    setEdited(false);
    setEditing(false);
  };

  const onCancel = () => {
    if (data) {
      if (edited) {
        setModel({
          name: data.name,
          description: data.description || '',
        });
      }
      setEdited(false);
      setEditing(false);
    }
  };

  const onChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setModel((old) => ({ ...old, [key]: e.target.value }));
      setEdited(true);
    };

  const onDismissError = () => setError(null);

  const onRefresh = async () => {
    await refetch();
    tiktokRes();
    queryClient.invalidateQueries([
      'RecipeList',
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
        <strong className="text-xl font-black">{`${
          data?.User.displayName || data?.User.name
        } `}</strong>
        <div className="pt-2 pb-10">
          {editing ? (
            <textarea
              name="description"
              value={model?.description || ''}
              placeholder="-"
              className="w-full dark:text-slate-200 px-2 py-0.5"
              onChange={onChange('description')}
            />
          ) : (
            <span className="font-light w-full px-2">{data?.description}</span>
          )}
        </div>
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
        <GrowIn height="6rem" open={!!error}>
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
              <p>{error}</p>
            </Button>
          </figure>
        </GrowIn>
        {data && (
          <Suspense
            fallback={
              <div className="w-full h-20">
                <LoadingBar />
              </div>
            }
          >
            <RecipeDetailIngredients
              Ingredients={data?.Ingredients}
              RecipeId={data._id}
              UserId={user?.id}
              refresh={onRefresh}
            />
          </Suspense>
        )}
        {userMatch && (
          <div className="w-full">
            <Button type="button" onClick={onRefresh}>
              refresh
            </Button>
            <Button
              type="button"
              onClick={onClickEdit}
              disabled={loading}
              className={`relative ${
                loading ? 'brightness-50 contrast-50' : ''
              }`}
            >
              {edited ? (
                <span>
                  save <FontAwesomeIcon icon={faFloppyDisk} size="lg" />
                </span>
              ) : (
                <span>
                  edit <FontAwesomeIcon icon={faPenToSquare} size="lg" />
                </span>
              )}
              {loading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="lg"
                  className="absolute left-0 top-1/4 animate-spin min-w-[4rem] pointer-events-none cursor-none"
                />
              )}
            </Button>
            {edited && <Button onClick={onCancel}>Cancel</Button>}
          </div>
        )}
      </section>
    </div>
  );
};

export default RecipeDetail;
