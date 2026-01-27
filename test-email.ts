
import dotenv from 'dotenv';
import { sendEmail } from './src/lib/email';

dotenv.config();

async function main() {
    console.log("Testing email config...");
    console.log("SMTP Host:", process.env.SMTP_HOST);
    console.log("SMTP Port:", process.env.SMTP_PORT);
    console.log("SMTP User:", process.env.SMTP_USER);
    // Hide password for security, just show length
    console.log("SMTP Pass length:", process.env.SMTP_PASS?.length);

    console.log("\nSending test email...");
    const success = await sendEmail({
        to: process.env.SMTP_USER || 'test@example.com', // Send to self
        subject: 'Test Email Derap Serayu',
        html: '<p>Ini adalah email tes untuk memastikan konfigurasi SMTP berhasil.</p>'
    });

    if (success) {
        console.log("✅ Email BERHASIL terkirim!");
    } else {
        console.log("❌ Email GAGAL terkirim. Cek log error di atas.");
    }
}

main();
