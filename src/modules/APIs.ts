/* eslint-disable no-await-in-loop */
import setErrorAndAllowDownload from '@redux/helpers/resetErrorAndAllowDownload';
import setIndexAfterPushingCollection from '@redux/helpers/setIndexAfterPushingCollection';
import { pushToCollection } from '@/User/slices/wallpaperSlice';
import store from '@app/store';
import { Quality } from '@interfaces/Config';
import { Picture } from '@interfaces/UserState';
import Weather from '@interfaces/Weather';
import handleError from '@redux/helpers/handleError';

const fetchAPI = async (url: string, headers?: HeadersInit) => {
  try {
    const req = await fetch(url, {
      method: 'GET',
      headers,
    });
    const res = await req.json();
    return res;
  } catch {
    handleError(502);
    throw Error('Something went wrong');
  }
};

const fetchGeolocation = (callback: Function): Promise<any> => new Promise((res) => {
  navigator.geolocation.getCurrentPosition((position) => callback(res, position));
});

const fetchWeather = (): Promise<Weather | undefined> => {
  const callback = async (res: Function, position: any): Promise<void> => {
    try {
      const key = window.process.env.WEATHER_API_KEY;
      const { latitude: lat, longitude: lng } = position.coords;

      const json = await fetchAPI(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`);

      const { weather, sys } = json;
      const formatted = {
        main: weather[0].main,
        time: sys,
      };

      res(formatted);
    } catch (err) {
      handleError(503);
    }
  };

  return fetchGeolocation(callback);
};

const fetchGeocoding = (): Promise<string> => {
  const callback = async (res: Function, position: any): Promise<string> => {
    try {
      const key = window.process.env.GOOGLE_API_KEY;
      const { latitude: lat, longitude: lng } = position.coords;

      const geocoding = await fetchAPI(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&result_type=country&language=en`);

      return res(geocoding.results[0].formatted_address);
    } catch (err) {
      handleError(503);

      return res('');
    }
  };

  return fetchGeolocation(callback);
};

const fetchSinglePageCollection = async (key: string, page: number):
  Promise<any[] | undefined> => {
  const headers: HeadersInit = new Headers();
  headers.set('Content-type', 'application/json');
  headers.set('Authorization', window.process.env.PEXELS_API_KEY || '');

  const res = await fetchAPI(
    `https://api.pexels.com/v1/search?query=${key}&per_page=78&page=${page}`,
    headers,
  );

  const { photos } = await res;

  if (!res) return undefined;
  return photos;
};

const fetchPexelsCollection = async (keyword: string) => {
  const collection: any[] = [];
  let canRequestMore = true;
  let page = 1;

  while (canRequestMore && page < 3) {
    try {
      const pictures = await fetchSinglePageCollection(keyword, page);

      if (pictures) {
        page += 1;
        // 78 is a hard coded value and equals pexels' max page length
        if (pictures.length < 78) canRequestMore = false;

        collection.push(...pictures);
      } else return undefined;
    } catch {
      handleError(429);
      return undefined;
    }
  }

  return collection;
};

const sortPictures = (pictures: any[], quality: Quality): Picture[] => pictures.map((picture) => {
  const { src, photographer, photographer_url: photographerUrl } = picture;

  const result: Picture = {
    srcMain: src[quality],
    srcPicker: src.large,
    photographer,
    photographerUrl,
  };

  return result;
});

const fetchPexels = async (keywords: string[], quality: Quality) => {
  const collectionCopy: Picture[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const keyword of keywords) {
    const collection = await fetchPexelsCollection(keyword);

    if (collection) {
      const sorted = sortPictures(collection, quality);

      collectionCopy.push(...sorted);
      store.dispatch(pushToCollection(sorted));
    }
  }

  if (collectionCopy.length === 0) {
    setErrorAndAllowDownload(404);
  } else {
    const randomIndex = Math.round(Math.random() * (collectionCopy.length - 1));
    setIndexAfterPushingCollection(randomIndex);
  }
};

export {
  fetchPexels, fetchWeather, fetchGeolocation, fetchGeocoding,
};
