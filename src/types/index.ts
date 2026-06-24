export interface Produto {
  id: string; slug: string; nome: string; descricao: string;
  preco: number; precoMin: number | null; categoria: string;
  imageUrl: string | null; destaque: boolean; ativo: boolean;
  personalizavel: boolean;
}
export interface ItemCarrinho { produto: Produto; quantidade: number; personalizacao?: string; }
