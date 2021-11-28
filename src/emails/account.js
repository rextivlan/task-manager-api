const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send welcome email
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aliaffan242@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

// Function to send cancellation email
const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "aliaffan242@gmail.com",
    subject: "Sorry to see you leave",
    text: `Goodbye ${name}. Is there anything we could've done to keep you on board. We hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
