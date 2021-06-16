import { handleError as handleErrorAction } from '@/User/slices/generalSlice';
import { ErrorCodes } from '@pages/Error/Codes';
import store from '@app/store';

const handleError = (error: ErrorCodes) => store.dispatch(handleErrorAction(error));

export default handleError;
