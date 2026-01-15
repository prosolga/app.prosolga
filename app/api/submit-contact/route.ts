import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    if (!email || !message || !firstName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName || ""}`.trim();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f9; color: #333;">
  <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 32px 40px; text-align: center; color: white;">
      <h1 style="margin:0; font-size: 24px; font-weight: 600;">New Contact Message</h1>
      <p style="margin: 8px 0 0; opacity: 0.9; font-size: 15px;">Received from your website</p>
    </div>

    <!-- Content -->
    <div style="padding: 32px 40px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 15px; line-height: 1.6;">
        <tr>
          <td style="width: 140px; font-weight: 600; color: #1e3a8a; padding: 12px 0;">Name:</td>
          <td style="padding: 12px 0;">${fullName}</td>
        </tr>
        <tr>
          <td style="font-weight: 600; color: #1e3a8a; padding: 12px 0;">Email:</td>
          <td style="padding: 12px 0;">
            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
          </td>
        </tr>
        ${phone ? `
        <tr>
          <td style="font-weight: 600; color: #1e3a8a; padding: 12px 0;">Phone:</td>
          <td style="padding: 12px 0;">${phone}</td>
        </tr>` : ""}
        ${service && service !== "—" ? `
        <tr>
          <td style="font-weight: 600; color: #1e3a8a; padding: 12px 0;">Service Interest:</td>
          <td style="padding: 12px 0;">${service}</td>
        </tr>` : ""}
      </table>

      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
        <h3 style="margin: 0 0 16px; font-size: 18px; color: #1e3a8a; font-weight: 600;">Message</h3>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; white-space: pre-wrap; line-height: 1.7;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #f8fafc; padding: 24px 40px; text-align: center; font-size: 13px; color: #6b7280; border-top: 1px solid #e5e7eb;">
      <p style="margin: 0;">This message was sent via the Prosolga website contact form<br>
      <strong>Reply directly</strong> to this email to respond to the sender.</p>
      <p style="margin: 12px 0 0;">© ${new Date().getFullYear()} Prosolga | All rights reserved</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    await transporter.sendMail({
      from: `"Prosolga Website" <${process.env.GMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${fullName} – ${service || "General Inquiry"}`,
      text: `From: ${fullName}\nEmail: ${email}\nPhone: ${phone || "—"}\nService: ${service || "—"}\n\nMessage:\n${message}`,
      html: htmlEmail,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
