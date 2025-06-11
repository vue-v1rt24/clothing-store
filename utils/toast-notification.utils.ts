import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

// Вывод всплывающего уведомления ошибки
export const errorMsg = (message: string, ms: number = 3000) => {
  toast.error(message, {
    duration: ms,
  });

  /* $toast.error(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true,
  }); */
};

// Вывод всплывающего уведомления успеха
export const successMsg = (message: string, ms: number = 3000) => {
  toast.success(message, {
    duration: ms,
  });

  /* $toast.success(message, {
    position: 'bottom-right',
    duration: 4000,
    dismissible: true,
  }); */
};
