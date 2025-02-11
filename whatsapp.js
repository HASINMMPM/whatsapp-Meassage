import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";

const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp Client is ready!");
});

client.initialize();

export const whatsapp = async (phoneNumber,msg) => {
  console.log("Sending WhatsApp message to:", phoneNumber);

  return new Promise((resolve, reject) => {
    const chatId = `${String(phoneNumber).replace("+", "")}@c.us`;
    const message = msg; 

    client
      .sendMessage(chatId, message)
      .then(() => {
        console.log(`Message sent successfully to ${chatId}: ${message}`);
        resolve();
      })
      .catch((err) => {
        console.error(`Failed to send message to ${chatId}:`, err);
        reject(err);
      });
  });
};
