import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FcmToken } from './fcm.schema';

@Injectable()
export class FcmService {
  constructor(
    @InjectModel(FcmToken.name) private fcmModel: Model<FcmToken>,
  ) {}

  async registerToken(userId: string, token: string, platform = 'android') {
    return this.fcmModel.findOneAndUpdate(
      { token },
      { userId, platform },
      { upsert: true, new: true }
    );
  }

  // 👉 Método nuevo para obtener todos los tokens registrados
  async getAllTokens(): Promise<string[]> {
    const tokens = await this.fcmModel.find().exec();
    return tokens.map(t => t.token);
  }


  async getTokensByUser(userId: string): Promise<string[]> {
    const docs = await this.fcmModel.find({ userId });
    return docs.map(doc => doc.token);
  }

  async getTokensByUserId(userId: string): Promise<string[]> {
  const docs = await this.fcmModel.find({ userId, active: true });
  return docs.map(doc => doc.token);
}


  async deleteToken(token: string) {
    return this.fcmModel.deleteOne({ token });
  }

}
