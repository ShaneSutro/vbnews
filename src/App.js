import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Box, AppBar, Typography, Card, Divider } from '@mui/material';
import dayjs from 'dayjs';

const gradients = [
  'linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%);',
  'linear-gradient(147deg, #FFE53B 0%, #FF2525 74%);',
  'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
  'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)',
  'linear-gradient(to top, #feada6 0%, #f5efef 100%)',
  'linear-gradient(to top, #00c6fb 0%, #005bea 100%)',
  'linear-gradient(to top, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)',
  'linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%)',
];

var getIndexBelowMaxForKey = function (str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

function App() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('https://xd610oobw6.execute-api.us-east-1.amazonaws.com/prod/all')
      .then((response) => response.data.data.Items)
      .then((items) => {
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
            <Box
              sx={{
                height: '100%',
                width: '100%',
                backgroundImage:
                  gradients[getIndexBelowMaxForKey(article.publisher, gradients.length)],
              }}
            />
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
      <Box>{error}</Box>
    </Box>
  );
}

export default App;
