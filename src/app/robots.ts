import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://v2.sk.banjarnegarakab.go.id/sitemap.xml', // Adjust domain later if needed
    }
}
