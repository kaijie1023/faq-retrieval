'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // TODO: Replace with proper authentication
  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('loggedIn', 'true');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='flex items-center w-100 h-screen flex-col m-auto gap-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Admin Login</h1>
      <Input onChange={setUsername} value={username} label='Username' />
      <Input
        type='password'
        label='Password'
        value={password}
        onChange={setPassword}
      />
      <Button onClick={handleLogin} label='Login' />
    </div>
  );
}
