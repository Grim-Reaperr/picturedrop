import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionItemService } from './submission.service';
import { SubmissionDto } from './dto/submission.dto';

@Controller('submission-items')
export class SubmissionItemController {
  constructor(private readonly submissionItemService: SubmissionItemService) {}

  // Alle SubmissionItems mit ContentType und CreatedOn abrufen
  @Get()
  async findAll(): Promise<any> {
    // Hier geben wir zusätzlich die gruppierten Daten aus
    const groupedData = await this.submissionItemService.groupByYearAndMonth();
    return {
      submissionItems: await this.submissionItemService.findAll(),
      groupedData,
    };
  }

  // Gruppierte Daten nach Jahr und Monat abrufen
  @Get('grouped-data')
  async getGroupedData(): Promise<any> {
    return this.submissionItemService.groupByYearAndMonth();
  }

  // Gruppierte Daten nach Jahr abrufen
  @Get('grouped-data/:year')
  async getGroupedDataByYear(@Param('year') year: number): Promise<any> {
    return this.submissionItemService.filterByYear(year);
  }
}
