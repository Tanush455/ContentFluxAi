import express from 'express';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from './lib/auth';
import cookieParser from 'cookie-parser'

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.all("/api/auth/*splat", toNodeHandler(auth));


app.use(express.json());
app.use(cookieParser())
app.use(async (req, res, next) => {

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log(session);
  console.log(req.cookies);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  return res.json(session);
});


app.listen(3005, () => {
  console.log("Listening to port 3005");
})