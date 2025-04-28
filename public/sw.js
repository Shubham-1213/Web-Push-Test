self.addEventListener('push', function(event) {
    let options = {
      body: event.data.text(),
      icon: 'images/notification-icon.png',
      badge: 'images/badge.png',
      vibrate: [200, 100, 200], // Vibration pattern
      renotify: true, // Notify again if the user already has the notification
      tag: 'new-message', // Tag for unique notifications
      actions: [
        {
          action: 'open-url',
          title: 'Open App',
          icon: 'images/open-icon.png'
        }
      ]
    };
  
    event.waitUntil(
      self.registration.showNotification('New Push Notification', options)
    );
  });