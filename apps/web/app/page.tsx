import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  if (!userId) {
    // Not signed in → go to Clerk sign-in
    redirect('/sign-in');
  }

  // Signed in → send them somewhere real
  redirect('/dashboard');
}
