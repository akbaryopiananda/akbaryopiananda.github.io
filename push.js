var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BBBe1HG3y3_PWS-j1d3xRqWZxjHGFSUo0DN3Oj0vnaFt0zRxLh7RUug-4b3a8goygojDdPVvhHkbDqQZGLxOnT8",
    "privateKey": "u9yykIzfLEb6aWe5BnwiZtmkKn8qMf8XmgZi2QB1I-E"
};


webPush.setVapidDetails(
    'mailto:yopianss@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
    )
    var pushSubscription = {
        "endpoint": "https://fcm.googleapis.com/fcm/send/e7LDYG-cWnQ:APA91bGlH29-rj2tqjRReYr8Hf5TRGMhquO5-vIXHK38P3n1llYPhm6pSEzNcAa9-pHNT-IGJOqYfM6FGLEerfXe6OrJyPRLDIqppLA4O9tisJJ6I7DE1d2chWNdas4G4v0ES14MHV50",
        "keys": {
            "p256dh": "BIgdFvLa7ekGEADWg+UdlMj9XTKKhbwGbWFBUIBUIMBpzMZNasPDrjvObHWm1k504yyTaaKWC+zHu/DvS1fwI7A=",
            "auth": "zuQ0tyijMUc4rf/jsWMmqA=="
    }
};
var payload = 'Berita Terbaru The News Football !!!';
var options = {
    gcmAPIKey: '398114703736',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);