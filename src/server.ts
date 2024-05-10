import express from 'express';
import 'express-async-errors';
import { config } from 'dotenv';
import { errorMiddleware } from './shared/middlewares/AppError';
import { routes } from './shared/routes/routes';
import { engine } from 'express-handlebars';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

config();

const app = express();
//aprendendo a expor os headers personalizados
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN, exposedHeaders:['Auth', 'Token', 'Employee_id', 'Time_sheet_id', 'Function_employee', 'Name_employee','Email'] }));
app.use(cookieParser());



app.engine(
  'handlebars',
  engine({
    extname: '.handlebars',
    defaultLayout: false,
  }),
);

app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errorMiddleware);

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`servidor rodando na porta ${process.env.PORT}`);
});
