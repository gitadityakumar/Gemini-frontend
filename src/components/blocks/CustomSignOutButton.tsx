import React from 'react';
import { SignOutButton } from '@clerk/nextjs';

const CustomSignOutButton = () => {
  return (
    <SignOutButton>
      <button className="flex items-center space-x-3 text-sm font-sans text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white">
        <span>Logout</span>
      </button>
    </SignOutButton>
  );
};

export default CustomSignOutButton;