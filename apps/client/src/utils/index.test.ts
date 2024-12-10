import { formatPrice } from './index';

describe('formatPrice', () => {
    it('should format price correctly for whole dollars', () => {
        expect(formatPrice(500)).toBe('$5.00');
    });

    it('should format price correctly for dollars and cents', () => {
        expect(formatPrice(1234)).toBe('$12.34');
    });

    it('should format price correctly for cents only', () => {
        expect(formatPrice(99)).toBe('$0.99');
    });

    it('should format price correctly for zero', () => {
        expect(formatPrice(0)).toBe('$0.00');
    });

    it('should format price correctly for single digit cents', () => {
        expect(formatPrice(5)).toBe('$0.05');
    });
});