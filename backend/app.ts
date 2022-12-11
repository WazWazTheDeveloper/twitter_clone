import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const twitsRouter = require('./routes/twits')

app.use("/twits",twitsRouter)

// create a GET route
app.get('/express_backend', (req: Request, res: Response) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})