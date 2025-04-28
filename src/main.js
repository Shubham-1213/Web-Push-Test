// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Service Worker Registered:', registration);
    }).catch(function(error) {
      console.error('Service Worker Registration Failed:', error);
    });
  }
  
  // Request Notification Permission
  if ('Notification' in window) {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        subscribeUserToPush();
      } else {
        console.log('Notification permission denied');
      }
    });
  }
  
  // Subscribe to push notifications
  function subscribeUserToPush() {
    if ('PushManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('YOUR_VAPID_PUBLIC_KEY')
        }).then(function(subscription) {
          console.log('User is subscribed:', subscription);
          // Send the subscription to your server
        }).catch(function(error) {
          console.error('Failed to subscribe:', error);
        });
      });
    }
  }
  
  // Utility function to convert VAPID public key to UInt8Array
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  