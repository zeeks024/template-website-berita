
import dotenv from 'dotenv';
import { sendEmail } from './src/lib/email';

dotenv.config();

async function main() {
    console.log("Testing email config...");
    console.log("User:", process.env.EMAIL_USER);
    // Hide password for security, just show length
    console.log("Pass length:", process.env.EMAIL_PASS?.length);

    console.log("Sending test email...");
    const success = await sendEmail({
        to: process.env.EMAIL_USER || 'test@example.com', // Send to self
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
