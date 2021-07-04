import store from '@app/store';
import { resetError } from '@/User/slices/generalSlice';
import { setIndexByNumber } from '@/User/slices/wallpaperSlice';

const resetErrorAndSetIndex = (index: number) => {
  const { dispatch } = store;

  dispatch(resetError());
  dispatch(setIndexByNumber(index));
};

export default resetErrorAndSetIndex;
