

import { supabase } from "./connnectSupaBase";
import {
  IUploadAvatar,
  IGetAvatarUrl,
  IDeleteFile,
} from "../../shared/interfaces/ISupaBase";

import fs from "fs";
import { apiError } from "../../shared/middlewares/AppError";

export class UploadFile implements IUploadAvatar {
  async uploadFile(file: any) {
    const pathImg = fs.readFileSync(file.path);

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(file.filename, pathImg, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new apiError("nao foi possivel receber a imagem", 400);
    }

    return "sucess";
  }
}
export class GetAvatarUrl implements IGetAvatarUrl {
  async getUrl(filename: string) {
    try {
      const { data } = supabase.storage.from("avatars").getPublicUrl(filename);
      return data;
    } catch (error) {
      throw new apiError(error.message, 400);
    }
  }
}

export class DeleteFileStorage implements IDeleteFile {
  async deleteFileStorage(fileName: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([fileName]);
      if (error) {
        throw new apiError(error.message, 400);
      }

      return data;
    } catch (error) {
      throw new apiError(error.message, 400);
    }
  }
}
