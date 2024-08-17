'use client';
import { useChat } from 'ai/react';
import { Box, TextField, Button,Stack } from '@mui/material';
import { blue } from '@mui/material/colors';

const messageStyles = {
  user: {
    backgroundColor: '#615D6C',
    color: 'white',
    alignSelf: 'flex-end',
    maxWidth: '75%',
  },
  ai: {
    backgroundColor: '#89BBFE',
    color: 'black',
    alignSelf: 'flex-start',
    maxWidth: '75%',
  },
};
export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
 
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2, // Add some padding to the container
        backgroundColor: '#CAE5FF',
        direction: 'column',
      }}
    >
         <Stack
        sx={{
          width: '700px',
          padding: '16px',
          color: 'black',
          textAlign: 'center',
          fontSize: '34px',
          fontWeight: '700',
          paddingBottom: 16,
        }}
      >
      RunnerAI
      </Stack>
      <Box
        sx={{
          width: 700,
          height: 900,
          bgcolor: '#1a237e', // Use a background color from MUI theme
          borderRadius: 2,
          boxShadow: 3, // Add shadow for better visibility
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
               display: 'flex',        
            flexDirection: 'column',
          }}
        >
          {messages.map((m) => (
    <Box 
    key={m.id} 
    style={{ marginBottom: 8, marginRight: 10 }}
    sx={{
      ...messageStyles[m.role === 'assistant' ? 'ai' : 'user'], // Apply styles based on role
      padding: 2,
      borderRadius: 7,
      boxShadow: 2,
      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', // Directly apply alignSelf
    }}
  >
    <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
    {m.content}
  </Box>
        
          ))}
        </Box>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          sx={{
            display: 'flex',
            padding: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.default',
          }}
        >
          <TextField
           id="standard-search"
           label="Search field"
           type="search"
           variant="standard"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            sx={{
               marginRight: 1, 
               width: '100%',
               borderRadius: '50%',
              
              }}
          />
          <Button type="submit" variant="contained" 
          sx={{
          background :"#1a237e",
          }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
