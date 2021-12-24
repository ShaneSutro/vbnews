import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Box, AppBar, Typography, Card, Divider } from '@mui/material';
import dayjs from 'dayjs';

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://xd610oobw6.execute-api.us-east-1.amazonaws.com/prod/all')
      .then((response) => response.data.data.Items)
      .then((items) => {
        console.log(items);
        setArticles(items);
        setError('');
      })
      .catch((err) => setError(err));
  }, []);

  return (
    <Box className="App">
      <AppBar position="sticky">
        <Typography variant="h3">VB News</Typography>
      </AppBar>
      <Typography sx={{ mt: '1rem' }} variant="h4">
        Recently Posted Articles
      </Typography>
      <Box sx={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
        {articles.map((article) => (
          <Card
            elevation={8}
            sx={{
              display: 'grid',
              gridTemplateColumns: '.8rem 1fr',
              minHeight: '5rem',
              gap: '1rem',
            }}
            onClick={() => window.open(article.link, '_blank')}
          >
            <Box sx={{ height: '100%', width: '100%', backgroundColor: 'red' }} />
            <Box sx={{ paddingRight: '1rem', paddingY: '1rem' }}>
              <Typography sx={{ fontWeight: 700 }} align="left">
                {article.headline}
              </Typography>
              <Divider sx={{ marginY: '.5rem' }} />
              <Typography sx={{ fontStyle: 'italic' }} align="left" variant="subtitle2">{`${
                article.publisher
              } on ${dayjs(article.addes).format('MMMM DD, YYYY')}`}</Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default App;
