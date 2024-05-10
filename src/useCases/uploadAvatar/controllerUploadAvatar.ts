import { Request, Response } from "express";
import { UploadAvatarService } from "./uploadAvatarService";

export class ControllerUploadAvatar {
  constructor(private uploadAvatar: UploadAvatarService) {}
  async uploadFile(req: Request, res: Response) {
    
    try {
      const employee_id = req.headers['employee_id'] as string

      if (req.file) {
        await this.uploadAvatar.execute(employee_id, req.file);
        return res.status(200).json();
      }
        return null
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
