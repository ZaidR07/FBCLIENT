"use client";

interface ImageViewerProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImageViewer = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ImageViewerProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-white text-3xl"
        onClick={onClose}
      >
        ✖
      </button>
      <button
        className="absolute left-5 text-white text-3xl"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ◀
      </button>
      <img
        src={images[currentIndex]}
        alt="Selected Image"
        className="max-h-[90vh] max-w-[90vw] object-contain"
      />
      <button
        className="absolute right-5 text-white text-3xl"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ▶
      </button>
    </div>
  );
};
