import { toast } from 'react-toastify';

type toastTheme = 'dark' | 'light';
type toastStatus = 'success' | 'error';

export function notify(message: string, status: toastStatus, theme: toastTheme = 'dark') {
  if (status === 'success') {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  } else if (status === 'error') {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  }
}
