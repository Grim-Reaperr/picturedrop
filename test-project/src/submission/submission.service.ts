import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubmissionItem } from './entities/submission.entity';
import { SubmissionDto } from './dto/submission.dto';

@Injectable()
export class SubmissionItemService {
  constructor(
    @InjectRepository(SubmissionItem)
    private submissionItemRepository: Repository<SubmissionItem>,
  ) {}

  // Alle SubmissionItems abrufen, nur ContentType und CreatedOn
  async findAll(): Promise<SubmissionDto[]> {
    const submissionItems = await this.submissionItemRepository.find({
      select: ['ContentType', 'CreatedOn'],  // Nur ContentType und CreatedOn abrufen
    });
    return submissionItems.map(submissionItem => ({
      ContentType: submissionItem.ContentType,
      CreatedOn: submissionItem.CreatedOn,
    }));
  }

  // Einzelnen SubmissionItem anhand der ID abrufen
  async findOne(id: number): Promise<SubmissionDto> {
    const submissionItem = await this.submissionItemRepository.findOne({
      where: { Id: id },
      select: ['ContentType', 'CreatedOn'],  // Nur ContentType und CreatedOn
    });
    if (!submissionItem) {
      return null;  // Optional: Fehlerbehandlung, falls kein Eintrag gefunden wird
    }
    return {
      ContentType: submissionItem.ContentType,
      CreatedOn: submissionItem.CreatedOn,
    };
  }
}
