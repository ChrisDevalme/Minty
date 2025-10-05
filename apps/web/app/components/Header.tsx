// apps/web/src/app/(components)/Header.tsx
'use client';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export function Header() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 12, gap: 8 }}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton /> 
      </SignedIn>
    </div>
  );
}
