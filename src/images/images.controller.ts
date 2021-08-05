import { Controller, Post, Request, Body, Res, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ImagesService } from './images.service';
import { displayImagesDto } from './dto/images.dto';
var fs = require('fs');
import moment= require('moment');

@Controller('images')
export class ImagesController {
    constructor(private imagesService:ImagesService){}
        
        @Post()
        // @UseInterceptors(FileInterceptor('displayImage', {
        //     storage: diskStorage({
        //         dest: './files'
        //     }),
        //     fileFilter: (req, file, cb) => {
        //       const mimeTypeList = ['image/png', 'image/jpeg'];
        //     }
        // }))
       // @ApiConsumes('multipart/form-data')
       // @ApiBody({
  //   type: CreateCourseDto,
  // })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'displayImage', maxCount: 100 }]),
  )
  // @UseInterceptors(FileInterceptor('displayImage', { dest: './files/' }))
       async create(@UploadedFiles() files,
                    @Body() body,
                    @Res() res: Response){
                try {
                  const imagePaths= [];
                  for (const image of files.displayImage){
                  const imagePath=  await this.saveFile(
                      image,
                      'displayImages',
                    );
                    console.log(imagePath)
                    imagePaths.push(imagePath)
                  }
                     console.log('1',files);
                     console.log('2',body);
                    const response = await this.imagesService.imageAdded(
                        body,
                        {displayImage:imagePaths.toString()}
                      );
                    console.log(response);
                      return res.status(response.statusCode).send(response);
                    } catch (error) {
                      return {
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: error.message,
                      };
                    }
                  }
             
                  async saveFile(file: any, path: string): Promise<any> {
                    try {
                      let fileName = file.originalname;
                      fileName = fileName.replace(/\//g, '-');
                      fileName = fileName.replace(/ /g, '_');
                      fileName = fileName.replace(/[()]/g, '');
                
                      const filePath = path + '/' + moment() + '-' + fileName;
                
                      console.log(filePath);
                      await fs.writeFileSync('./files/' + filePath, file.buffer, 'buffer');
                
                      return filePath;
                    } catch (err) {
                      // An error occurred
                      console.error(err);
                    }
                  }

        }
    
