import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteFileDto } from './dto/delete-file.dto';

@Controller('s3')
export class S3Controller {
  constructor(private s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.s3Service.uploadFile(file);
    return { data: { url } };
  }

  @Post('delete')
  async deleteFile(@Body() body: DeleteFileDto) {
    const url = await this.s3Service.deleteFile(body);
    return { data: { url } };
  }
}
