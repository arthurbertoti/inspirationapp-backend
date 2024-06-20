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
  const notification = {
    app_id: appId,
    included_segments: ['has_evening_advice'],
    headings: { en: 'Daily Advice' },
    contents: { en: "Here is your daily advice! by app/index.js, {{ evening_advice | default: 'aeh' }}" }
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

// app.get('/send-notification', async (req, res) => {
//   const userId = req.query.user_id; // Pegue o user_id da query string
//   if (!userId) {
//     return res.status(400).send('User ID is required');
//   }

//   try {
//     // Primeiro, obtenha as tags do usuário
//     const userTagsResponse = await axios.get(`https://onesignal.com/api/v1/players/${userId}?app_id=${appId}`, {
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         Authorization: `Basic ${restApiKey}`
//       }
//     });

//     const userTags = userTagsResponse.data.tags;
//     const savedPhrase = userTags['morning_advice'];

//     if (!savedPhrase) {
//       return res.status(400).send('No saved phrase found for this user');
//     }

//     // Enviar notificação com a frase salva do usuário
//     const notification = {
//       app_id: appId,
//       filters: [
//         { field: 'tag', key: 'user_id', relation: '=', value: userId }
//       ],
//       headings: { en: 'Your Saved Phrase' },
//       contents: { en: savedPhrase }
//     };

//     const notificationResponse = await axios.post('https://onesignal.com/api/v1/notifications', notification, {
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         Authorization: `Basic ${restApiKey}`
//       }
//     });

//     res.send('Notification sent: ' + JSON.stringify(notificationResponse.data));
//   } catch (error) {
//     res.status(500).send('Error sending notification: ' + error.message);
//   }
// });
