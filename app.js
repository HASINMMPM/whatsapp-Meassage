import express from "express"
import { numbers } from "./numbers.js";
import { whatsapp } from "./whatsapp.js";


const app = express();
const port = 3000;

app.use(express.json());

app.post('/send', async (req, res) => {
  try {
const msg =req.body.msg;
console.log(msg)

    if (!msg) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    await Promise.all(numbers.map((number) => whatsapp(number,msg)));


    res.json({ message: 'Messages sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending messages', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
