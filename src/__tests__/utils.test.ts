import { describe, it, expect } from 'vitest';
import { formatTimeAgo, slugify } from '@/lib/utils';

describe('utils', () => {
  describe('slugify', () => {
    it('converts text to lowercase slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('removes special characters', () => {
      expect(slugify('Hello! World?')).toBe('hello-world');
    });

    it('handles Indonesian characters', () => {
      expect(slugify('Berita Terbaru Hari Ini')).toBe('berita-terbaru-hari-ini');
    });

    it('handles multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });
  });

  describe('formatTimeAgo', () => {
    it('returns formatted time for recent dates', () => {
      const now = new Date();
      const result = formatTimeAgo(now.toISOString());
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('handles invalid dates gracefully', () => {
      const result = formatTimeAgo('invalid-date');
      expect(result).toBeDefined();
    });
  });
});
