// Register the service worker
console.log("Hi")
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/public/sw.js').then(function(registration) {
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
  function subscribeUserToPush() {
    if ('PushManager' in window) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array('BEVp7FYuxFba7JHyjBAXImcM_PW16YA9F_c2FOJkAtH5AZZiPc-vDtNqSBeb7-2Rdat2ozkL8HuB39fN6LMmwHc') // Replace with your VAPID public key
        }).then(function(subscription) {
          console.log('User is subscribed:', subscription);
  
          // Convert keys from ArrayBuffer to Base64
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: arrayBufferToBase64(subscription.getKey('p256dh')), // Convert to base64
              auth: arrayBufferToBase64(subscription.getKey('auth'))      // Convert to base64
            }
          }
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
  
  function arrayBufferToBase64(buffer) {
    const byteArray = new Uint8Array(buffer);
    let binary = '';
    byteArray.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
  }