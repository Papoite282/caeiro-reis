import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(preco);
}

export function formatarPrecoMin(preco: number, precoMin?: number | null): string {
  if (precoMin && precoMin < preco) return `A partir de ${formatarPreco(precoMin)}`;
  return formatarPreco(preco);
}
