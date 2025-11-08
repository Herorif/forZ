interface LightboxProps {
  imageUrl: string;
  onClose: () => void;
}

export function Lightbox({ imageUrl, onClose }: LightboxProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <img src={imageUrl} alt="Lightbox" className="max-w-full max-h-full" />
    </div>
  );
}
