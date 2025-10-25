import { useToast as useToastOriginal, type ToastPosition, type ToastProps } from 'vue-toast-notification';

export const DEFAULT_TOAST_OPTIONS = {
  position: 'top-right' as ToastPosition,
};

export const useToast = () => {
  const toast = useToastOriginal();

  const mergeOptions = (options?: ToastProps) => ({ ...DEFAULT_TOAST_OPTIONS, ...(options ?? {})});

  return {
    open: (message: string) => toast.open(message),
    success: (message: string, options?: ToastProps) => toast.success(message, mergeOptions(options)),
    error: (message: string, options?: ToastProps) => toast.error(message, mergeOptions(options)),
    info: (message: string, options?: ToastProps) => toast.info(message, mergeOptions(options)),
    warning: (message: string, options?: ToastProps) => toast.warning(message, mergeOptions(options)),
    default: (message: string, options?: ToastProps) => toast.default(message, mergeOptions(options)),
    clear: toast.clear,
  };
}
