import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schemas';
import { SenderService } from 'src/notifications/sender/sender.service';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel:Model<ReportDocument>,
    @InjectModel(User.name) private readonly userModel:Model<User>,
    private readonly senderService: SenderService
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const userExists = await this.userModel.exists({ _id: createReportDto.user })
    if (!userExists) {
      throw new NotFoundException('El usuario no existe')
    }

    const createdReport = new this.reportModel(createReportDto);
    const savedReport = await createdReport.save();

    // Asociar reporte al usuario
    await this.userModel.findByIdAndUpdate(createReportDto.user, {
      $push: { reports: savedReport._id }
    });

    // Enviar notificación a usuarios cercanos
      const lng = createReportDto.location.lon;
      const lat = createReportDto.location.lat;
      
      await this.senderService.sendToNearbyUsers(
        lat,
        lng,
        '🚨 Nuevo reporte cercano',
        createReportDto.text || 'Se ha registrado un nuevo incidente en tu zona',
        1000, // Radio en metros
        createReportDto.user.toString()
      );
    
    return savedReport;
  }
  
  async findAll(query: any): Promise<Report[]> {
    return this.reportModel
    .find(query)
    .exec();
    }

  async findOne(id: string): Promise<Report> {
    const report = await this.reportModel
    .findById(id)
    .exec();

    if(!report){
      throw new NotFoundException(`Report con ID ${id} no encontrado`);
    }
    return report;
  }

  async update(id: string, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.reportModel.findOneAndUpdate({_id: id }, updateReportDto, { new: true });
    if(!report){
      throw new NotFoundException(`Report con ID ${id} no encontrado`);
    }
    return report;
  }

  async remove(reportId: string): Promise<void> {
    const report = await this.reportModel.findById(reportId);
    if (!report){
      throw new NotFoundException('Reporte no encontrado');
    }
    const userId = report.user; 

    await this.reportModel.findByIdAndDelete(reportId);

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { reports: reportId }
    })
  }
}
