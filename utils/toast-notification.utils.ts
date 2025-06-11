import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

// Вывод всплывающего уведомления ошибки
export const errorMsg = (message: string) => {
  toast.error(message);

  /* $toast.error(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true,
  }); */
};

// Вывод всплывающего уведомления успеха
export const successMsg = (message: string) => {
  toast.success(message);

  /* $toast.success(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true,
  }); */
};
