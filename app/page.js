'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from './lib/firebase.js';
import { Button, Stack, Typography } from '@mui/material';

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/signin'); // Redirect to sign-in page if not authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/signin');
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Stack
        sx={{
          width: 400,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" textAlign="center" marginBottom={2}>
          Welcome {user?.displayName || 'User'}!
        </Typography>
        <Typography variant="body1" textAlign="center" marginBottom={4}>
          You are now signed in.
        </Typography>
        <Button variant="contained" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Stack>
    </Stack>
  );
}
