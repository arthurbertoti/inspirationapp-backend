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

app.get('/send-notification', async (req, res) => {
  console.log(s3)
  const notification = {
    app_id: appId,
    included_segments: ['has_evening_advice'],
    headings: { en: 'Daily Advice' },
    contents: { en: 'Here is your daily advice! by app/index.js' }
  };

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Basic ${restApiKey}`
      }
    });
    res.send('Notification sent: ' + JSON.stringify(response.data));
    console.log("response: ", response)
    console.log("response.data:", response.data)
  } catch (error) {
    console.log('error:', error)
    res.status(500).send('Error sending notification: ' + error.message);
  }
});
