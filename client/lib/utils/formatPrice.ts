export function formatPrice(price: number): string {
  return Math.round(price).toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
