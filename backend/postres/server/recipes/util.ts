import axios from 'axios';

const getUrl = async (link: string): Promise<string> => {
  try {
    if (link.toLowerCase().includes('m.tiktok.com'))
      await axios({
        method: 'GET',
        url: link,
        maxRedirects: 0,
      });
    if (link.toLowerCase().includes('.tiktok.com')) return link;
    return '';
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (
        e.response?.status &&
        e.response.status >= 300 &&
        e.response.status <= 400
      ) {
        const [cleaned] = e.response.headers.location.split('?');
        return cleaned;
      }
    }
    throw e;
  }
};

export { getUrl };
