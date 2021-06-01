import store from '@app/store';
import { disallowDownload, resetError } from '../slices/generalSlice';
import { setIndexByNumber } from '../slices/wallpaperSlice';

const setIndexAfterPushingCollection = (index: number) => {
  const { dispatch } = store;

  dispatch(setIndexByNumber(index));
  dispatch(resetError());
  dispatch(disallowDownload());
};

export default setIndexAfterPushingCollection;
