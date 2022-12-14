import { Twilio } from "twilio";
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const client = new Twilio(accountSid, authToken);
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
export const sendSms = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `blog ${txt} - ${body}`,
        to,
        from,
      })
      .then((message) => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
};
