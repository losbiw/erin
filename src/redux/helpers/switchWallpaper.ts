import { addWarning } from '@/Warning/warningSlice';
import store from '@app/store';
import { disallowDownload } from '@/User/slices/generalSlice';
import { decrementIndex, incrementIndex, setIndexByNumber } from '@/User/slices/wallpaperSlice';

const switchWallpaper = (index: boolean | number) => {
  const { getState, dispatch } = store;
  const { general } = getState();

  if (!general.isDownloadAllowed) {
    dispatch(addWarning('Wait until the previous picture is downloaded'));
  } else {
    dispatch(disallowDownload());

    if (typeof index === 'boolean') {
      dispatch(index ? incrementIndex() : decrementIndex());
    } else {
      dispatch(setIndexByNumber(index));
    }
  }
};

export const setNextWallpaper = () => switchWallpaper(true);
export const setPrevWallpaper = () => switchWallpaper(false);

export default switchWallpaper;
