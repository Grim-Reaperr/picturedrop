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

  // Funktion zur Gruppierung der Daten nach Jahr und Monat
  async groupByYearAndMonth(): Promise<any> {
    const submissionItems = await this.findAll();
    
    // Daten gruppieren nach Jahr und Monat
    const groupedData = {};

    submissionItems.forEach(item => {
      const createdOn = new Date(item.CreatedOn);
      const year = createdOn.getFullYear();  // Jahr extrahieren
      const month = createdOn.getMonth();   // Monat extrahieren (0 = Januar, 1 = Februar, etc.)

      if (!groupedData[year]) {
        groupedData[year] = {};
      }

      if (!groupedData[year][month]) {
        groupedData[year][month] = { images: 0, videos: 0 };
      }

      // Zählen, ob es sich um ein Bild oder Video handelt
      if (item.ContentType.includes('image')) {
        groupedData[year][month].images += 1;
      } else if (item.ContentType.includes('video')) {
        groupedData[year][month].videos += 1;
      }
    });

    return groupedData;
  }

  // Filter nach Jahr und Monat
  async filterByYear(year: number): Promise<any> {
    const groupedData = await this.groupByYearAndMonth();
    return groupedData[year] || {};
  }
}
