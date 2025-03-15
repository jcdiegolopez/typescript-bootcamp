
export const formatPrice = (price: number) => {
    const dollars = Math.floor(price / 100);
    const cents = price % 100;
    return `$${dollars}.${cents.toString().padStart(2, '0')}`;
}