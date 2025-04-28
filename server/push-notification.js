const webpush = require('web-push');

// Set your VAPID keys here
webpush.setVapidDetails(
  'mailto:example@yourdomain.com',
  'BEVp7FYuxFba7JHyjBAXImcM_PW16YA9F_c2FOJkAtH5AZZiPc-vDtNqSBeb7-2Rdat2ozkL8HuB39fN6LMmwHc',
  'TPeH_rlkWSxQYfAVIj-ZJgqwhb0AD0WnUchW5TEpaPI'
);
const vapidKeys = webpush.generateVAPIDKeys();


// Push subscription object (from the client-side, save it on your server)
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/dIBOuDnzKBM:APA91bFDlnNylq3vtcbOf-tgfchEPk8b7XhD4ShSA-_dgwRrMHQzjqOGCIRMvPW2fErb7G2CUtQd001XEOBMo1KQXz8nBxIi0AsOq-_3iLimJZWqVI3TdnTTDwBKfAWvqnV14jWV0lC4',
  keys: {
    auth: '"c0h2sVZP8wRqa1b+KLtqQQ=="',
    p256dh: '"BAZdHHFonSESOnBNigDO9H+lzIh+YUFm7qoQViJXxpQwusmeml4pvvJcd+srJcxiRNNnYBpEP/sYfMq38to/Zro="'
  }
};

// Send a push notification
const payload = JSON.stringify({ title: 'Test Notification', body: 'Hello from Server!' });

webpush.sendNotification(pushSubscription, payload)
  .then(response => console.log('Notification sent:', response))
  .catch(error => console.error('Error sending notification:', error));
