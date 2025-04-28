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
  endpoint: 'USER_PUSH_ENDPOINT',
  keys: {
    p256dh: 'USER_PUBLIC_KEY',
    auth: 'USER_AUTH_KEY'
  }
};

// Send a push notification
const payload = JSON.stringify({ title: 'Test Notification', body: 'Hello from Server!' });

webpush.sendNotification(pushSubscription, payload)
  .then(response => console.log('Notification sent:', response))
  .catch(error => console.error('Error sending notification:', error));
