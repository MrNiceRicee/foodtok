const tiktokData = async (url: string) =>
  fetch(`https://www.tiktok.com/oembed?url=${url}`)
    .then(
      async (
        response
      ): Promise<{
        ok: boolean;
        data: {
          version: string;
          type: string;
          title: string;
          author_url: string;
          author_name: string;
          width: string;
          height: string;
          html: string;
          thumbnail_width: number;
          thumbnail_height: number;
          thumbnail_url: string;
          provider_url: string;
          provider_name: 'TikTok';
        };
        status: number;
        statusText: string;
      }> => {
        const data = (await response.json()) || '';
        let ok = true;
        if (data.status_msg || data === '') {
          ok = false;
        }
        return {
          ok,
          data,
          status: response.status,
          statusText: response.statusText,
        };
      }
    )
    .catch(() => ({
      ok: false,
      data: null,
      status: 400,
      statusText: 'something went wrong',
    }));

const fetchData = async (url = '') => {
  if (url) {
    const fetchTiktok = await tiktokData(url);
    if (!fetchTiktok.ok) {
      return;
    }
    return fetchTiktok.data;
  }
};

export { fetchData, tiktokData };
