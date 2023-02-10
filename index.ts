import { Mutex } from 'async-mutex';
import express from 'express';
import { authentications } from './authentications';

const app = express();

const mutex = new Mutex();
let sharedResource: number = 1;

app.get('/user', async function (req, res) {
  await mutex.runExclusive(async () => {
    // Initialize our resource
    sharedResource = sharedResource + 1;
    res.send(authentications[sharedResource]);
  });
});

app.listen(3000);
