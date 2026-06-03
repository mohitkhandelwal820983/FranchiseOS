import Toast from 'react-native-toast-message';

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};

export const showErrorToast = (message: string) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: message,
    position: 'top',
    visibilityTime: 3500,
  });
};

export const showInfoToast = (message: string) => {
  Toast.show({
    type: 'info',
    text1: 'Info',
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};

export const getApiErrorMessage = (error: any, fallbackMessage: string) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallbackMessage
  );
};