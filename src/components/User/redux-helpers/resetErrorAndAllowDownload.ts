import store from '@app/store';
import { ErrorCodes } from '@pages/Error/Codes';
import { allowDownload, handleError } from '../slices/generalSlice';

const setErrorAndAllowDownload = (error: ErrorCodes) => {
  const { dispatch } = store;

  dispatch(handleError(error));
  dispatch(allowDownload());
};

export default setErrorAndAllowDownload;
