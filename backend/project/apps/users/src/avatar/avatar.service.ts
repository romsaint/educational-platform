import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { createReadStream } from "fs";

@Injectable()
export class AvatarService {
    getAvatar(avatar: string, res: Response) {
        try{
            const  stream = createReadStream(`uploads/${avatar}`)
            stream.on('error', (err) => {
                res.json({ ok: false, msg: "File not found" });
            });
            stream.pipe(res)
            
        }catch(e) {
            return {ok: false, msg: "Error"}
        }
    }
}