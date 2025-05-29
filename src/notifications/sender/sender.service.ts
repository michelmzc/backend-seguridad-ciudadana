import { Injectable, Logger, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FcmService } from '../fcm/fcm.service';

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

    // Inyectamos el objeto firebase-admin app o simplemente usamos directamente admin.messaging()
    constructor(private readonly fcmService: FcmService) {}

  private get messaging() {
    return admin.messaging();
  }
  async sendToUser(userId: string, notification: { title: string; body: string }) {
    const tokens = await this.fcmService.getTokensByUserId(userId);
    if (!tokens.length) {
      this.logger.warn(`No tokens for user ${userId}`);
      return { success: 0, failure: 0 };
    }

    const response = await this.messaging.sendEachForMulticast({
      tokens,
      notification,
    });

    this.logger.log(`Notification sent to ${userId}: ${response.successCount} success, ${response.failureCount} failed`);

    return response;
  }

  async sendToMultipleUsers(userIds: string[], notification: { title: string; body: string }) {
    const tokenSets = await Promise.all(userIds.map(id => this.fcmService.getTokensByUserId(id)));
    const allTokens = tokenSets.flat().filter(Boolean);

    if (!allTokens.length) {
      this.logger.warn(`No tokens found for users`);
      return { success: 0, failure: 0 };
    }

    const response = await this.messaging.sendEachForMulticast({
      tokens: allTokens,
      notification,
    });

    this.logger.log(`Notification sent to multiple users: ${response.successCount} success, ${response.failureCount} failed`);

    return response;
  }

  async sendNotificationToToken(token: string, title: string, body: string) {
    const message = {
      notification: { title, body },
      token,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Successfully sent message:', response);
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
