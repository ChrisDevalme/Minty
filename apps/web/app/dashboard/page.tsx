import { currentUser } from '@clerk/nextjs/server';
import { Header } from '../components/Header';

export default async function Dashboard() {
  const user = await currentUser();
  return (
    <div style={{ padding: 24 }}>
      <Header />
      <h1>Dashboard</h1>
      <p>Welcome, {user?.firstName ?? 'there'}!</p>
    </div>
  );
}
