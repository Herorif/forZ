interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-white">X</button>
        </div>
        {children}
      </div>
    </div>
  );
}
