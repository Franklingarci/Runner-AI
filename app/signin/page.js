'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup } from 'firebase/auth';
import { Button, Stack, Typography } from '@mui/material';
import { auth, googleProvider, githubProvider } from '../lib/firebase';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/Home');  // Redirect to the home page or another page after successful sign-in
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/Home');  // Redirect to home if already signed in
      }
    });
  }, [router]);

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
          width: 300,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          Sign In
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleSignIn(googleProvider)}
          sx={{ marginBottom: 2 }}
        >
          Sign in with Google
        </Button>
        <Button variant="contained" onClick={() => handleSignIn(githubProvider)}>
          Sign in with GitHub
        </Button>
      </Stack>
    </Stack>
  );
}
