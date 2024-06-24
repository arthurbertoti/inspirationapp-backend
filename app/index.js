const axios = require('axios');
const express = require('express');
const cron = require('node-cron')
const app = express();


const appId = process.env.ONESIGNAL_API_KEY
const restApiKey = process.env.ONESIGNAL_REST_API_KEY

app.get('/', (req, res) => {
  res.send('Server is running!');
});

cron.schedule('*/1 * * * *', () => {
  console.log('running a task every two minutes');
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

cron.schedule('0 1 * * *', () => {
  console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

async function sendEveningNotification(req, res) {
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
};

async function sendMorningNotification(req, res) {
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
}
