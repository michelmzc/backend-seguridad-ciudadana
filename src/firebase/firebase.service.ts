import * as admin from 'firebase-admin'
import { Injectable, OnModuleInit } from '@nestjs/common'
import * as serviceAccount from './serviceAccountKey.json'

@Injectable()
export class FirebaseService implements OnModuleInit {
    onModuleInit() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
        });
    }

    async sendNotification(token: string, title: string, body: string) {
        const message = {
            token,
            notification: {
                title,
                body
            }
        }
        
        return await admin.messaging().send(message);
    }
}
