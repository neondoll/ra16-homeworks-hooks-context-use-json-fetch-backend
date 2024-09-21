import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(bodyParser.json({ type: () => true }));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/data', async (req, res) => {
  res.send(JSON.stringify({ status: 'ok' }));
});
app.get('/error', async (req, res) => {
  res.status(500).send(JSON.stringify({ status: 'Internal Error' }));
});
app.get('/loading', async (req, res) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  res.send(JSON.stringify({ status: 'ok' }));
});

const port = process.env.PORT || 7070;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});