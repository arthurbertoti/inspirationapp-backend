const axios = require('axios');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const appId = process.env.ONESIGNAL_API_KEY
const restApiKey = process.env.ONESIGNAL_REST_API_KEY

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/send-evening-notification', async (req, res) => {
  const notification = {
    app_id: appId,
    included_segments: ['has_evening_advice'],
    headings: { en: 'Good night!' },
    contents: { en: "'{{ evening_advice | default: 'Evening advice' }}'" }
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

app.get('/send-morning-notification', async (req, res) => {
  const notification = {
    app_id: appId,
    included_segments: ['has_morning_advice'],
    headings: { en: 'Good morning!' },
    contents: { en: "'{{ morning_advice | default: 'Morning advice' }}'" }
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
