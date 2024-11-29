import { Controller, Get, Param } from '@nestjs/common';
import { SubmissionItemService } from './submission.service';
import { SubmissionDto } from './dto/submission.dto';

@Controller('submission-items')  // Endpunkt für SubmissionItems
export class SubmissionItemController {
  constructor(private readonly submissionItemService: SubmissionItemService) {}

  // Alle SubmissionItems mit ContentType und CreatedOn abrufen
  @Get()
  async findAll(): Promise<SubmissionDto[]> {
    return this.submissionItemService.findAll();
  }

  // Einzelnes SubmissionItem anhand der ID abrufen
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SubmissionDto> {
    return this.submissionItemService.findOne(+id);
  }
}
