import admin from 'firebase-admin';
import fetch from 'node-fetch';
import apn from 'apn';
import axios from 'axios';

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
            'Authorization': `Bearer ${process.env.FIREBASE_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: finalData
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}