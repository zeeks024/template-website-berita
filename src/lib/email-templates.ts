const getBaseUrl = () => process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); padding: 32px 40px; text-align: center;">
                            <img src="${getBaseUrl()}/logo.png" alt="Derap Serayu" style="height: 48px; width: auto;" />
                            <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 16px 0 0 0; letter-spacing: -0.5px;">DERAP SERAYU</h1>
                            <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Portal Berita Banjarnegara</p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px;">
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 24px 40px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
                                © ${new Date().getFullYear()} Derap Serayu. Seluruh hak cipta dilindungi.
                            </p>
                            <p style="color: #9ca3af; font-size: 11px; margin: 8px 0 0 0; text-align: center;">
                                Email ini dikirim secara otomatis. Mohon jangan membalas email ini.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export function verificationEmailTemplate(name: string, verificationLink: string): string {
    const content = `
        <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
            Selamat Datang, ${name}! 👋
        </h2>
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            Terima kasih telah bergabung dengan Derap Serayu. Untuk mengaktifkan akun Anda, silakan verifikasi alamat email dengan mengklik tombol di bawah ini:
        </p>
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 8px 0 32px 0;">
                    <a href="${verificationLink}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                        ✓ Verifikasi Email
                    </a>
                </td>
            </tr>
        </table>
        <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0; font-weight: 600;">Atau copy link berikut:</p>
            <p style="color: #0891b2; font-size: 12px; margin: 0; word-break: break-all;">
                <a href="${verificationLink}" style="color: #0891b2;">${verificationLink}</a>
            </p>
        </div>
        <div style="border-left: 3px solid #fbbf24; padding-left: 16px; margin-bottom: 24px;">
            <p style="color: #92400e; font-size: 13px; margin: 0;">
                <strong>⏰ Link ini berlaku selama 24 jam.</strong><br/>
                Setelah itu, Anda perlu mendaftar ulang.
            </p>
        </div>
        <p style="color: #6b7280; font-size: 13px; margin: 0;">
            Jika Anda tidak mendaftar di Derap Serayu, abaikan email ini.
        </p>
    `;
    return emailWrapper(content);
}

export function resetPasswordEmailTemplate(name: string, resetLink: string): string {
    const content = `
        <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 16px 0;">
            Reset Password 🔐
        </h2>
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
            Halo <strong>${name}</strong>,
        </p>
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
            Kami menerima permintaan untuk reset password akun Derap Serayu Anda. Klik tombol di bawah untuk membuat password baru:
        </p>
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
                <td align="center" style="padding: 8px 0 32px 0;">
                    <a href="${resetLink}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);">
                        🔑 Reset Password
                    </a>
                </td>
            </tr>
        </table>
        <div style="background-color: #f3f4f6; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <p style="color: #6b7280; font-size: 12px; margin: 0 0 8px 0; font-weight: 600;">Atau copy link berikut:</p>
            <p style="color: #0891b2; font-size: 12px; margin: 0; word-break: break-all;">
                <a href="${resetLink}" style="color: #0891b2;">${resetLink}</a>
            </p>
        </div>
        <div style="border-left: 3px solid #ef4444; padding-left: 16px; margin-bottom: 24px;">
            <p style="color: #991b1b; font-size: 13px; margin: 0;">
                <strong>⚠️ Link ini hanya berlaku 1 jam.</strong><br/>
                Demi keamanan, segera reset password Anda.
            </p>
        </div>
        <div style="background-color: #fef3c7; border-radius: 8px; padding: 16px;">
            <p style="color: #92400e; font-size: 13px; margin: 0;">
                <strong>🛡️ Tips Keamanan:</strong> Jika Anda tidak meminta reset password, segera abaikan email ini dan pastikan akun Anda aman.
            </p>
        </div>
    `;
    return emailWrapper(content);
}
