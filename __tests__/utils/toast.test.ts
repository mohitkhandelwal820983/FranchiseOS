import Toast from 'react-native-toast-message';
import {
  getApiErrorMessage,
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from '../../src/utils/toast';

describe('toast utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows success toast with correct options', () => {
    showSuccessToast('Saved successfully');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'success',
      text1: 'Success',
      text2: 'Saved successfully',
      position: 'top',
      visibilityTime: 3000,
    });
  });

  it('shows error toast with correct options', () => {
    showErrorToast('Something went wrong');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong',
      position: 'top',
      visibilityTime: 3500,
    });
  });

  it('shows info toast with correct options', () => {
    showInfoToast('New update available');

    expect(Toast.show).toHaveBeenCalledWith({
      type: 'info',
      text1: 'Info',
      text2: 'New update available',
      position: 'top',
      visibilityTime: 3000,
    });
  });

  it('picks API message before error message and fallback', () => {
    expect(
      getApiErrorMessage(
        {response: {data: {message: 'API message'}}, message: 'JS message'},
        'Fallback message',
      ),
    ).toBe('API message');
  });

  it('falls back to response error, JS error message, then fallback message', () => {
    expect(
      getApiErrorMessage(
        {response: {data: {error: 'Response error'}}},
        'Fallback message',
      ),
    ).toBe('Response error');

    expect(getApiErrorMessage({message: 'JS error'}, 'Fallback message')).toBe(
      'JS error',
    );

    expect(getApiErrorMessage(null, 'Fallback message')).toBe('Fallback message');
  });
});
