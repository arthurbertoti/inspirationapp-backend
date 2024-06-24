const axios = require('axios');
const express = require('express');
const cron = require('node-cron')
const app = express();
const port = process.env.PORT || 3000;


const appId = process.env.ONESIGNAL_API_KEY
const restApiKey = process.env.ONESIGNAL_REST_API_KEY

app.get('/', (req, res) => {
  res.send('Server is running!');
});

cron.schedule('*/1 * * * *', async () => {

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
    console.log('Notification sent: ' + JSON.stringify(response.data));
  } catch (error) {
    console.error('Error sending notification: ' + error.message);
  }
  console.log('Running every 1 minute');
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

cron.schedule('0 6 * * *', async () => {
  sendMorningNotification()
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

cron.schedule('0 22 * * *', async () => {
  sendEveningNotification()
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

async function sendEveningNotification() {
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
    console.log('Evening Notification sent: ' + JSON.stringify(response.data));
  } catch (error) {
    console.error('Error sending evening notification: ' + error.message);
  }
};

async function sendMorningNotification() {
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
    console.log('Evening Notification sent: ' + JSON.stringify(response.data));
  } catch (error) {
    console.error('Error sending evening notification: ' + error.message);
  }
}
