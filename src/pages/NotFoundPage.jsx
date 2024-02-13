import React from 'react';

function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-gray-400">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
    </div>
  );
}

export default NotFoundPage;
