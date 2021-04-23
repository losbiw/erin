/* eslint-disable no-await-in-loop */
import Weather from '@interfaces/Weather';

const fetchAPI = async (url: string, handleError: (err: number) => void, headers?: HeadersInit) => {
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

const fetchWeather = (handleError: (error: number) => void): Promise<Weather | undefined> => {
  const callback = async (res: Function, position: any): Promise<void> => {
    try {
      const key = window.process.env.WEATHER_API_KEY;
      const { latitude: lat, longitude: lng } = position.coords;

      const json = await fetchAPI(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`,
        handleError,
      );

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

const fetchGeocoding = (handleError: (error: number) => void): Promise<string> => {
  const callback = async (res: Function, position: any): Promise<string> => {
    try {
      const key = window.process.env.GOOGLE_API_KEY;
      const { latitude: lat, longitude: lng } = position.coords;

      const geocoding = await fetchAPI(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}&result_type=country&language=en`,
        handleError,
      );

      return res(geocoding.results[0].formatted_address);
    } catch (err) {
      handleError(503);

      return res('');
    }
  };

  return fetchGeolocation(callback);
};

// eslint-disable-next-line max-len
const fetchPexels = async (keywords: string[], handleError: (err: number) => void): Promise<any[] | undefined> => {
  const collection: any[] = [];
  let canRequestMore = true;

  // eslint-disable-next-line no-restricted-syntax
  for (const key of keywords) {
    let page = 1;
    const headers: HeadersInit = new Headers();
    headers.set('Content-type', 'application/json');
    headers.set('Authorization', window.process.env.PEXELS_API_KEY || '');

    while (canRequestMore && page < 3) {
      try {
        const res = await fetchAPI(
          `https://api.pexels.com/v1/search?query=${key}&per_page=78&page=${page}`,
          handleError,
          headers,
        );

        const { photos } = await res;

        if (!res) return undefined;
        if (photos.length < 78) canRequestMore = false;

        page += 1;
        collection.push(...photos);
      } catch {
        handleError(429);
        return undefined;
      }
    }
  }

  return collection;
};

export {
  fetchPexels, fetchWeather, fetchGeolocation, fetchGeocoding,
};
