import store from '@app/store';
import { ErrorCodes } from '@pages/Error/Codes';
import { handleError as handleErrorAction } from '@/User/slices/generalSlice';

const handleError = (error: ErrorCodes) => store.dispatch(handleErrorAction(error));

export default handleError;
