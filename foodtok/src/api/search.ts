import { useInfiniteQuery } from 'react-query';
import { search } from './recipes';

export const searchQuery = ({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) => {
  return useInfiniteQuery(
    ['SearchList'],
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
        order: '_id:DESC'
      }).then((item) => item.data);
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.cursor : undefined,
    }
  );
};
