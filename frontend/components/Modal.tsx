import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal = ({ children, onClose }: ModalProps) => {
  return createPortal(
    <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-md shadow-lg ring max-w-lg w-full'>
        <div
          className='relative top-0 right-0 flex justify-end pt-2 pr-2 cursor-pointer'
          onClick={onClose}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='self-right size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          </svg>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
