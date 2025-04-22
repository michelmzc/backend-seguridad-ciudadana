import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './schemas/report.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Report.name) private readonly reportModel:Model<ReportDocument>
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    return this.reportModel.create(createReportDto);
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

  async remove(id: string) {
    return this.reportModel.findByIdAndDelete({ _id: id }).exec();
  }
}
