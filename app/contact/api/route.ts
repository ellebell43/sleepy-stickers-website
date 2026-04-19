
/**
 * IMAP (Incoming)
 * Host: imap.hostinger.com
 * Encryption: SSL
 * Port number: 993
 * 
 * SMTP (Outgoing)
 * smtp.hostinger.com
 * Encryption: SSL
 * Port number: 465
 */

import { NextRequest, NextResponse } from "next/server";

export function POST(req: NextRequest) {
  return NextResponse.json({})
}