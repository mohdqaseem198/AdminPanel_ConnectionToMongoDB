import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { to, subject, content, file, filename } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Build attachments array
    const attachments = [];
    if (content) {
      attachments.push({
        filename: `${subject || "blog"}.txt`,
        content: Buffer.from(content, "utf-8").toString("base64"),
        encoding: "base64",
      });
    }
    if (file) {
      attachments.push({
        filename: filename || "blog.xlsx",
        content: file, // already Base64
        encoding: "base64",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to || process.env.EMAIL_USER,
      subject: subject || "Your Blog",
      text: "Please find your attachment below 👇",
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};