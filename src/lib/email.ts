
import nodemailer from 'nodemailer';

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: `"Derap Serayu" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent: %s", info.messageId);
        return true;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        // @ts-ignore
        if (error.code === 'EAUTH') {
            console.error("👉 Masalah Autentikasi: Gmail menolak password Anda.");
            console.error("👉 Aksi: Aktifkan 2-Step Verification di Google Account > Security, lalu buat 'App Password'. Gunakan App Password 16 digit tersebut, BUKAN password login biasa.");
        }
        return false;
    }
}
