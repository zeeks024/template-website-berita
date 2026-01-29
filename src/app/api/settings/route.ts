import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

const DEFAULT_SETTINGS_ID = 'default';

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: DEFAULT_SETTINGS_ID },
        });

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: DEFAULT_SETTINGS_ID },
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Failed to fetch settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await requireAdmin();

        const body = await request.json();
        
        const settings = await prisma.siteSettings.upsert({
            where: { id: DEFAULT_SETTINGS_ID },
            update: {
                heroTitle: body.heroTitle,
                heroDescription: body.heroDescription,
                sectionOpini: body.sectionOpini,
                sectionCerita: body.sectionCerita,
                sectionSosok: body.sectionSosok,
                sectionPotensi: body.sectionPotensi,
                statsDesaWisata: body.statsDesaWisata,
                statsLabel: body.statsLabel,
                quoteText: body.quoteText,
                quoteAuthor: body.quoteAuthor,
                contactAddress: body.contactAddress,
                contactPhone: body.contactPhone,
                contactEmail: body.contactEmail,
                sosokImageUrl: body.sosokImageUrl,
                socialFacebook: body.socialFacebook,
                socialInstagram: body.socialInstagram,
                socialTwitter: body.socialTwitter,
                socialYoutube: body.socialYoutube,
            },
            create: {
                id: DEFAULT_SETTINGS_ID,
                heroTitle: body.heroTitle,
                heroDescription: body.heroDescription,
                sectionOpini: body.sectionOpini,
                sectionCerita: body.sectionCerita,
                sectionSosok: body.sectionSosok,
                sectionPotensi: body.sectionPotensi,
                statsDesaWisata: body.statsDesaWisata,
                statsLabel: body.statsLabel,
                quoteText: body.quoteText,
                quoteAuthor: body.quoteAuthor,
                contactAddress: body.contactAddress,
                contactPhone: body.contactPhone,
                contactEmail: body.contactEmail,
                sosokImageUrl: body.sosokImageUrl,
                socialFacebook: body.socialFacebook,
                socialInstagram: body.socialInstagram,
                socialTwitter: body.socialTwitter,
                socialYoutube: body.socialYoutube,
            },
        });

        return NextResponse.json(settings);
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === 'UNAUTHORIZED') {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            if (error.message === 'FORBIDDEN') {
                return NextResponse.json({ error: 'Forbidden: Admin only' }, { status: 403 });
            }
        }
        console.error('Failed to update settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
