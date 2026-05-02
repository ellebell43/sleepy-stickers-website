
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  const body: { name: string, email: string, message: string } = await req.json()
  console.log(body)
  if (!body.name || !body.email || !body.message) { return NextResponse.json({}, { status: 400, statusText: "Missing name, email, or message" }) }
  const transporter = nodemailer.createTransport({
    // @ts-ignore
    host: "smtp.hostinger.com",
    port: "465",
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })

  try {
    const info = await transporter.sendMail({
      from: `"Website" <${process.env.MAIL_USER}>`,
      to: "hello@sleepystickers.art",
      subject: `Website Form - ${body.name}`,
      html: `
      <p>From: ${body.name}</p>
      <p>Reply to: ${body.email}</p>
      <p>${body.message}</p>
      `
    })

    return NextResponse.json({})
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: String(error) })
  }
}