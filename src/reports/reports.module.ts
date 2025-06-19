import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './schemas/report.schema';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema}]),
    ReportsModule,
    UsersModule,
    NotificationsModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
