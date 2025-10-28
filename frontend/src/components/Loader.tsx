// import React from 'react';

export default function Loader({ size = 10, text }: { size?: number; text?: string }) {
  const s = `${size}rem`;
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div
        style={{ width: s, height: s }}
        className="rounded-full border-4 border-t-4 border-gray-200 border-t-blue-600 animate-spin"
        role="status"
        aria-label="Loading"
      />
      {text && <p className="mt-3 text-gray-600">{text}</p>}
    </div>
  );
}
