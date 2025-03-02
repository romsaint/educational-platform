import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 } from "uuid";
import { uniqueFileName } from "./uniqueFilename";

export const uploadFile = {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, uniqueFileName(file));
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(
          new BadRequestException('Only image files are allowed!'),
          false,
        );
      }
      callback(null, true);
    },
    limits: {
      fileSize: 1024 * 1024 * 5, // Ограничение размера файла (5 MB)
    },
  }