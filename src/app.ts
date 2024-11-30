import express, { Request, Response, NextFunction } from 'express';
import commandRoutes from './routes/commandRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1",commandRoutes);

const PORT = parseInt(process.env.PORT || "8080");

if(isNaN(PORT)){
  console.error("Invalid PORT environment variable must be a number");
}

const server = app.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

