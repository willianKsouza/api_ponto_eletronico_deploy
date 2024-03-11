import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const folder = path.resolve(__dirname, "..", "..", "..", "uploads");

const upload = multer({
  storage: multer.diskStorage({
    destination: (request: Request, file, callback) => {
      callback(null, folder);
    },
    filename: async (request: Request, file, callback) => {
      crypto.randomBytes(16, (error, hash) => {
        if (error) callback(error, "");
        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        callback(null, fileName);
      });
    },
  }),
});
export { upload };
