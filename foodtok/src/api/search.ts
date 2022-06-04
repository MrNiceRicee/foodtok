import useUser from '@hooks/useUser';
import { useInfiniteQuery } from 'react-query';
import { search } from './recipes';

export const searchQuery = ({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) => {
  const user = useUser();
  return useInfiniteQuery(
    ['SearchList', `${user?.id}`],
    async ({ pageParam }) => {
      const payload: { name?: string | object; description?: string | object } =
        {};
      if (name) {
        payload.name = name;
      }
      if (description) {
        payload.description = {
          ILIKE: description,
          OR: true,
        };
      }
      return search({
        limit: 25,
        cursor: pageParam,
        filter: payload,
      }).then((item) => item.data);
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.cursor : undefined,
    }
  );
};
