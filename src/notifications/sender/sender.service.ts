import { Injectable, Logger, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FcmService } from '../fcm/fcm.service';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schema/notifications.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User, UserDocument } from '../../users/schemas/user.schemas';
import { getDistance } from 'geolib';
import { UsersService } from '../../users/users.service';
import { Types } from 'mongoose';

function distance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return value * Math.PI / 180;
}

@Injectable()
export class SenderService {
  private readonly logger = new Logger(SenderService.name);

  // Inyectamos el objeto firebase-admin app o simplemente usamos directamente admin.messaging()
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
    private readonly fcmService: FcmService,
    @InjectModel('User') private readonly userModel: Model <UserDocument>,
    private readonly usersService: UsersService, // ✅ nue
  ) {}
  
  async sendToNearbyUsers(
    reportLat: number,
    reportLon: number,
    title: string,
    body: string,
    radiusInMeters = 500,
    reportingUserId?: string
  ) {
    
    const users = await this.usersService.getAllUsersWithLocation();
  
    const nearbyUsers = users.filter(user => {
      if (!user.location?.coordinates) return false;
      const [lon, lat] = user.location.coordinates;
      const d = distance(lat, lon, reportLat, reportLon);
      return d <= 1; // 1km
    });

    const nearbyUserIds = nearbyUsers.map(user => (user._id as Types.ObjectId).toString());

    if (reportingUserId && !nearbyUserIds.includes(reportingUserId)) {
      nearbyUserIds.push(reportingUserId);
    }

    console.log("Usuarios a notificar cerca:", nearbyUserIds);
    await this.sendToMultipleUsers(nearbyUserIds, { title, body });
  }

  async findAll(){
    return this.notificationModel.find().sort({ createdAt: -1}).exec();
  }

  
  async createAndSend(dto: CreateNotificationDto) {
    // 1. Guardar en base de datos
    const notification = await this.notificationModel.create(dto);

    // 2. Obtener todos los tokens
    const tokens = await this.fcmService.getAllTokens();
    if (!tokens.length) {
      this.logger.warn('No tokens registered to send notification');
      return notification;
    }

    // 3. Enviar notificación
    const response = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: {
        title: dto.title,
        body: dto.message,
      },
    });

    this.logger.log(`Notification sent: ${response.successCount} success, ${response.failureCount} failed`);
    
    return notification;
  }


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
    console.log("Enviando notificación a múltiples usuarios ...")
    const tokenSets = await Promise.all(userIds.map(id => this.fcmService.getTokensByUserId(id)));
    const allTokens = tokenSets.flat().filter(Boolean);

    if (!allTokens.length) {
      this.logger.warn(`No se encontrar tokens de usuarios`);
      return { success: 0, failure: 0 };
    }

    const response = await this.messaging.sendEachForMulticast({
      tokens: allTokens,
      notification,
    });

    this.logger.log(`Notifcaciones enviados: ${response.successCount} correctos, ${response.failureCount} fallaron`);

    return response;
  }

  async sendNotificationToToken(token: string, title: string, body: string) {
    const message = {
      token,
      notification: { 
        "title": title, 
        "body": body 
      },
      data: {
        "title": title,
        "body": body 
      },
    };

    try {
      const response = await admin.messaging().send(message);
      console.log('Mensaje enviado con éxito:', response);
      return response;
    } catch (error) {
      console.error('Error enviando mensaje', error);
      throw error;
    }
  }
}
