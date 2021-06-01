import store from '@app/store';
import { resetError } from '../slices/generalSlice';
import { setIndexByNumber } from '../slices/wallpaperSlice';

const resetErrorAndSetIndex = (index: number) => {
  const { dispatch } = store;

  dispatch(resetError());
  dispatch(setIndexByNumber(index));
};

export default resetErrorAndSetIndex;
