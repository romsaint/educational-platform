import { extname } from "path";
import { v4 } from "uuid";

export function uniqueFileName(file: Express.Multer.File) {
    const uniqueSuffix = v4()
    const ext = extname(file.originalname);
    return `${file.fieldname}-${uniqueSuffix}${ext}`;
}