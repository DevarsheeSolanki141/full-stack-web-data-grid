import express from 'express';
import { router } from './router/magiccards.router';

const app = express();
const port = 3001;


app.use(function (req, res, next) {
  let allowedOrigins;

  allowedOrigins = ["http://localhost:3000"];

  const origin: string = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, authorization"
  );
  next();
});

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);


try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error}`);
}