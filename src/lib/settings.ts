import prisma from '@/lib/prisma';

export type SiteSettingsData = {
    heroTitle: string;
    heroDescription: string;
    sectionOpini: string;
    sectionCerita: string;
    sectionSosok: string;
    sectionPotensi: string;
    statsDesaWisata: string;
    statsLabel: string;
    quoteText: string;
    quoteAuthor: string;
    contactAddress: string;
    contactPhone: string;
    contactEmail: string;
    sosokImageUrl: string | null;
    socialFacebook: string | null;
    socialInstagram: string | null;
    socialTwitter: string | null;
    socialYoutube: string | null;
};

const DEFAULT_SETTINGS: SiteSettingsData = {
    heroTitle: 'Cerita dari Serayu.',
    heroDescription: 'Mengangkat opini, cerita inspiratif, dan potensi tersembunyi dari Banjarnegara.',
    sectionOpini: 'Perspektif',
    sectionCerita: 'Kearifan Lokal',
    sectionSosok: 'Wajah Banjarnegara.',
    sectionPotensi: 'Potensi & Unggulan',
    statsDesaWisata: '266',
    statsLabel: 'Desa Wisata',
    quoteText: 'Keramik Klampok adalah warisan seni yang terus dilestarikan oleh para pengrajin lokal.',
    quoteAuthor: 'Pengrajin Keramik Klampok',
    contactAddress: 'Jl. Dipayuda No. 12, Banjarnegara',
    contactPhone: '+62 286 123456',
    contactEmail: 'redaksi@derapserayu.id',
    sosokImageUrl: null,
    socialFacebook: null,
    socialInstagram: null,
    socialTwitter: null,
    socialYoutube: null,
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
    try {
        const settings = await prisma.siteSettings.findUnique({
            where: { id: 'default' },
        });

        if (!settings) {
            return DEFAULT_SETTINGS;
        }

        return {
            heroTitle: settings.heroTitle,
            heroDescription: settings.heroDescription,
            sectionOpini: settings.sectionOpini,
            sectionCerita: settings.sectionCerita,
            sectionSosok: settings.sectionSosok,
            sectionPotensi: settings.sectionPotensi,
            statsDesaWisata: settings.statsDesaWisata,
            statsLabel: settings.statsLabel,
            quoteText: settings.quoteText,
            quoteAuthor: settings.quoteAuthor,
            contactAddress: settings.contactAddress,
            contactPhone: settings.contactPhone,
            contactEmail: settings.contactEmail,
            sosokImageUrl: settings.sosokImageUrl,
            socialFacebook: settings.socialFacebook,
            socialInstagram: settings.socialInstagram,
            socialTwitter: settings.socialTwitter,
            socialYoutube: settings.socialYoutube,
        };
    } catch (error) {
        console.error('Failed to fetch site settings:', error);
        return DEFAULT_SETTINGS;
    }
}
