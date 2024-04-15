import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/constants/providers';
import { PrismaInstance } from 'src/modules/shared/database/prisma.providers';
import EasyYandexS3 from 'easy-yandex-s3';
import { DeleteFileDto } from './dto/delete-file.dto';

@Injectable()
export class S3Service {
  constructor(@Inject(PROVIDERS.PRISMA) private prisma: PrismaInstance) {}

  s3 = new EasyYandexS3({
    auth: {
      accessKeyId: process.env.YANDEX_KEY_ID,
      secretAccessKey: process.env.YANDEX_SECRET_KEY,
    },
    Bucket: process.env.YANDEX_BUCKET,
    debug: false,
  });

  async uploadFile(file: Express.Multer.File) {
    const uploadedData = await this.s3.Upload(file, '/images');
    //@ts-expect-error-next-line
    return uploadedData.Location;
  }

  async deleteFile(body: DeleteFileDto) {
    const { link } = body;

    await this.s3.Remove(new URL(link).pathname);

    return link;
  }
}
