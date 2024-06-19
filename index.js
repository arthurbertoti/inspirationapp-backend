const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const appId = '10f1673c-d0e7-4aa4-a59a-89fe6d6c47d9';
const restApiKey = 'ZTdlNzc5NzEtMzZlNC00ZGZhLWI4ZWUtMjNmNzA4ZTYwYWRk';

app.get('/', (req, res) => {
  res.send('Hello, this is your backend service running!');
});

app.get('/send-notification', async (req, res) => {
  const notification = {
    app_id: appId,
    included_segments: ['Subscribed Users'],
    headings: { en: 'Daily Advice' },
    contents: { en: 'Here is your daily advice! by index.js' }
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${restApiKey}`
      }
    });
    res.send('Notification sent: ' + JSON.stringify(response.data));
  } catch (error) {
    res.status(500).send('Error sending notification: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const axios = require('axios');

// const ONE_SIGNAL_APP_ID = '10f1673c-d0e7-4aa4-a59a-89fe6d6c47d9';
// const ONE_SIGNAL_API_KEY = 'ZTdlNzc5NzEtMzZlNC00ZGZhLWI4ZWUtMjNmNzA4ZTYwYWRk';

// const sendNotification = async (message) => {
//   const headers = {
//     'Content-Type': 'application/json; charset=utf-8',
//     'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`,
//   };

//   const data = {
//     app_id: ONE_SIGNAL_APP_ID,
//     included_segments: ['All'], // Ou use ['included_segments'] ou ['include_player_ids']
//     contents: { en: message },
//   };

//   try {
//     const response = await axios.post('https://onesignal.com/api/v1/notifications', data, { headers });
//     console.log('Notification sent successfully:', response.data);
//   } catch (error) {
//     console.error('Error sending notification:', error);
//   }
// };

// sendNotification('This is a test notification!');