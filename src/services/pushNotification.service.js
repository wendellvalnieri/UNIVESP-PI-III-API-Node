import admin from 'firebase-admin';
import apn from 'apn';
import axios from 'axios';
import { google } from 'googleapis';
import fs from 'fs';

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

const initializeFirebase = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
    }
    return admin;
};

export const getTokenFirebase = async () => {
    return new Promise(function (resolve, reject) {
        const key = {
            "type": "service_account",
            "project_id": "tamy-salao-eaf05",
            "private_key_id": "3ea51ac1acf30698033c7e205090b1bbe8ecb2ca",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZFykCPNVyUXq+\neFtiSThYnhfm3cwUx6KuD2Uov53DhyCRCIP/6GumUzuArZoOvhpbi6bgUDT7LpZ8\nMNCnTVJqgVySue4Iu2z9iUaHWGPoybVUaBj5VW97mAZ5N5HbEEK6r3hfsoFn3ZVc\nTdgRrAJnsAVflr29eSo03nYAFwVQxHZykQfZIx64FAwZKIUGBi1P5o6rA7PRCA9q\nCTEblSOR+COBLQn1eMSepRLFV+igiCEOK8Bjv7S3TEmnGwUcyzLi5/+ix8qpp7Gu\n1PNIA9WkJGGOmXgBYK1uTWmdPEcePp5NEdGaxNz9o5Cga3VEckTyhzWjwzvp+UcK\nSvgqPkqbAgMBAAECggEAG86ZJE7odltWcEJsVu31ziLpNIYVC7E3W2ZweXZUsa9Z\nuv5Q+6q74vo7VKQz13mwT/CN3zCybu2HaAd13u2siqv0pLIhCnUA1wyYQv1LKH16\n8ln2L1PVbB2xD1OIqsHJXR+CPd+uoa8d8iYxmQQla7ANSc+Xp1La17+Qr3N/A6xj\nwtdfTq3IV2h2paBdnRHLUh9XkKqoXC0QlDLr3HfqCgI8kI1EVlurHCZTaFhdk/t5\nGtZo+x0qSpaXnydySuTCzXO0Wxobc8EzjOVFN1HLDgQJsHibg3mYod7YahdGvOAH\nFoSwRBN/ZKOkNRHjVAg+sVawCjOyg0AioO514dS0AQKBgQDTusfz3RjRUTYjbm1J\nww5KCS97r/or5COU5Jyoc/EjsZht+pCpT8Q2hWXYU+S5udxP7mCx47hRiyypr2PV\n+FSvFAf2A6gZkUkrI5PdqMlduPxAIZglrZUNGpKmbca5mZ/7ffiOMUMckxBarGT1\nY/wn5ZyZrs74hit0LbJ6IY5eZwKBgQC5GZxM+QGMmh5Lde92f+JfwErSoudFtsEb\nhrmbl7tB5k2s3RvtpQRZ+TdS5t/JeWa33sV4GgwWnldRvI2ExP/a0HSk1H18fvqV\nYW4dQ+UVg5s70s4jnan9U+muWRmp/Od/OjNEmZkTKoKBHuex/G1z5etEijUFpifZ\nCEVryoYprQKBgBzT0oOed9GQCBn83/5qA1kLNR7XD+3H6xxLoBTDbHKarJFUyzty\nM9nkgcBZc8vhxWBQqXOu+JqJo3QbADHS1NzdklPpnYqVoGuyNWC5qWkMVbP5nviK\nUL/u/UaRrbv5cbHRLfVWObf7Qf/Gdxx+F4frGE5IYb+urN3tlt5QEU1DAoGBAJe4\nDEtzVve+Y9KKiotg61Z8sVfRuyuDTumXFpAYYJ71fPmSCxBRUC3HfrdvEkN8RNu1\nt7pn7zyi8QPIP19ych0S/GkW2vyuwAqtX6qROjbWNulkMx8yXmGM5F/KHKUe7Ul1\nlQxHshbpoyrfAB79v2FeNedqOWe197eHdg+SY0HJAoGAdikEqmnFjg/Xd0VNjZcs\nTPR3P/yITLokH2dvozDz0Sd5+DZmIp3B0YRcHO+duwbPB4E8JgsWGdGKJ1ipptVn\ntZgUfcUXWhfF+Y4M5MQJRLF5EzgwZZIj4El4shgr/WZDH5x8WnLB/dIqp1wM81PH\nFWTjfvmcvNyJFv+KWNt2uig=\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-fbsvc@tamy-salao-eaf05.iam.gserviceaccount.com",
            "client_id": "108733388924968719546",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tamy-salao-eaf05.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        }


        const jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens);
        });
    });
}
const initializeApn = () => {
    return new apn.Provider({
        token: {
            key: process.env.APN_KEY_PATH,
            keyId: process.env.APN_KEY_ID,
            teamId: process.env.APN_TEAM_ID
        },
        production: process.env.NODE_ENV === 'production'
    });
};

const sendFcmNotification = async (token, message) => {
    const firebase = initializeFirebase();

    const fcmMessage = {
        token,
        notification: {
            title: message.title || 'Nova notificação',
            body: message.body || message.text || '',
        },
        data: message.data || {},
        android: {
            priority: 'high',
            notification: {
                sound: 'default',
                clickAction: 'FLUTTER_NOTIFICATION_CLICK'
            }
        },
        apns: {
            payload: {
                aps: {
                    sound: 'default',
                    badge: message.badge || 1,
                    contentAvailable: true
                }
            }
        }
    };

    try {
        const response = await firebase.messaging().send(fcmMessage);
        console.log('FCM notification sent successfully:', response);
        return { success: true, messageId: response };
    } catch (error) {
        console.error('Error sending FCM notification:', error);
        throw error;
    }
};

const sendApnsNotification = async (token, message) => {
    const apnProvider = initializeApn();

    const notification = new apn.Notification();
    notification.expiry = Math.floor(Date.now() / 1000) + 3600;
    notification.badge = message.badge || 1;
    notification.sound = 'default';
    notification.alert = {
        title: message.title || 'Nova notificação',
        body: message.body || message.text || ''
    };
    notification.topic = process.env.APN_BUNDLE_ID;

    if (message.data) {
        notification.payload = { ...message.data };
    }

    try {
        const result = await apnProvider.send(notification, token);

        if (result.failed.length > 0) {
            console.error('Error sending APNs notification:', result.failed[0].response);
            throw new Error(result.failed[0].response);
        }

        console.log('APNs notification sent successfully');
        apnProvider.shutdown();
        return { success: true, messageId: result.sent[0].device };
    } catch (error) {
        console.error('Error sending APNs notification:', error);
        apnProvider.shutdown();
        throw error;
    }
};

export const sendMulticastNotification = async (tokens, message) => {
    if (!tokens || tokens.length === 0) {
        throw new Error('Nenhum token de dispositivo fornecido');
    }

    const results = [];
    for (const token of tokens) {
        try {
            const result = await sendPushNotification(token, message);
            results.push({ token, result, success: true });
        } catch (error) {
            results.push({ token, error: error.message, success: false });
        }
    }

    return results;
};

export const sendPushNotification = async (push_key, message) => {
    try {
        if (push_key.length > 100) {
            return await sendApnsNotification(push_key, message);
        } else {
            return await sendFcmNotification(push_key, message);
        }
    } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        throw error;
    }
};

export const sendPushNotificationRest = async (tokens, data) => {
    let responseGetTokenFirebase = await getTokenFirebase();

    let finalData = JSON.stringify({
        "message": {
            "token": tokens,
            "notification": {
                "body": data.message,
                "title": data.title || 'Nova notificação'
            }
        }
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://fcm.googleapis.com/v1/projects/tamy-salao-eaf05/messages:send',
        headers: {
            'Authorization': `Bearer ${responseGetTokenFirebase.access_token}`,
            'Content-Type': 'application/json'
        },
        data: finalData
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
