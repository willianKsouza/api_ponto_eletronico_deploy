import express from "express";
import "express-async-errors";
import { config } from "dotenv";
import { errorMiddleware } from "./shared/middlewares/AppError";
import { routes } from "./shared/routes/routes";
import {engine} from "express-handlebars";
import * as path from "path";
import  cors  from 'cors'
import cookieParser from "cookie-parser"

config();



const app = express();
app.use(cookieParser());
//Nota: esse midleware evite requisiçoes TRACE para esse servidor(trace method consegue ter acesso aos coockies httpOnly)
// app.use((req, res, next) => {
//   const allowedMethods = [
//     "OPTIONS",
//     "HEAD",
//     "CONNECT",
//     "GET",
//     "POST",
//     "PUT",
//     "DELETE",
//     "PATCH",
//   ];
//   if (!allowedMethods.includes(req.method)) {
//     res.status(405).send(`${req.method} not allowed.`);
//   }
//   next();
// })

app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//   next();
// });

// app.use(cors({
//   origin: process.env.CORS_ORIGIN,
//   credentials:true,
//   allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//   methods:['GET', 'PUT', 'POST', 'PUT', 'DELETE'],
// }));





app.engine("handlebars", engine({
        extname: '.handlebars',
        defaultLayout:false
}));


app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorMiddleware);

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`servidor rodando na porta ${process.env.PORT}`);
});
