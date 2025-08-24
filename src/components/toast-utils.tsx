import { toast } from 'sonner';
import { CheckCircle, Info, XCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

const toastConfig = {
  success: {
    icon: <CheckCircle className='text-green-500' />,
    className: 'bg-green-50 text-green-900 border-green-200',
  },
  error: {
    icon: <XCircle className='text-red-500' />,
    className: 'bg-red-50 text-red-900 border-red-200',
  },
  info: {
    icon: <Info className='text-blue-500' />,
    className: 'bg-blue-50 text-blue-900 border-blue-200',
  },
};

export function showToast(type: ToastType, message: string, title?: string) {
  const config = toastConfig[type];
  toast.custom(() => (
    <div className={`flex items-start gap-3 rounded-xl border p-4 shadow-md ${config.className}`}>
      <div className='pt-0.5'>{config.icon}</div>
      <div className='flex flex-col'>
        {title && <strong className='font-semibold'>{title}</strong>}
        <span className='text-sm'>{message}</span>
      </div>
    </div>
  ));
}
