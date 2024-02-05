import React from 'react';

function LoadingSpinner() {
  return (
    <div data-testid="loading" className="flex h-screen w-full items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-200 border-t-blue-500" />
    </div>
  );
}

export default LoadingSpinner;
