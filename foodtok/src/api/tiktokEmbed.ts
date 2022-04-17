const tiktokData = async (url: string) =>
  fetch(`https://www.tiktok.com/oembed?url=${url}`)
    .then(
      async (
        response
      ): Promise<{
        ok: boolean;
        data: any;
        status: number;
        statusText: string;
      }> => ({
        ok: response.ok,
        data: (await response.json()) || '',
        status: response.status,
        statusText: response.statusText,
      })
    )
    .catch(console.log);

export { tiktokData };
