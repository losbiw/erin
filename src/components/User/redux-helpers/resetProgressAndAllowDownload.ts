import { resetProgress } from '@/ProgressBar/progressSlice';
import store from '@app/store';
import { allowDownload } from '../slices/generalSlice';

const resetProgressAndAllowDownload = () => {
  const { dispatch } = store;

  dispatch(resetProgress());
  dispatch(allowDownload());
};

export default resetProgressAndAllowDownload;
