const Refer = require('../models/Refer');
 const nodemailer = require("nodemailer");
 const dotenv=require("dotenv");
 dotenv.config();


 const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.createRefer = async (req, res) => {
  try {
    const {email, name,referCode,phone,referLink} = req.body;
    const newRefer = new Refer(req.body);
    const savedRefer = await newRefer.save();
    res.status(201).json(savedRefer);



var mailOption = {
  from: process.env.SMTP_MAIL,
  to: email,
  subject: referCode,
  text: "Your Referal Link : "+referLink
}

transporter.sendMail(mailOption, function(error, info){
  if (error) {
    console.log(error);
  }else{
    console.log("Email sent")
    console.log(mailOption.text)
  }
})

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRefers = async (req, res) => {
  try {
    const refers = await Refer.find();
    res.status(200).json(refers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
