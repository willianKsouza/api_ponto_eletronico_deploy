import { Router } from "express";
import { controllerAvatarEmployee } from "../../useCases/uploadAvatar/injection";
import { upload } from "../middlewares/uploads";

const avatarRouter = Router();

avatarRouter.post("/", upload.single("avatar"), (req, res) =>
  controllerAvatarEmployee.uploadFile(req, res)
);

export { avatarRouter };
