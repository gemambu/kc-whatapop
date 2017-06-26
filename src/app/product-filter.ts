export interface ProductFilter {
    title?: string;
    category?: string;
    state?: string;
    description?: string;
    priceMin?: number;
    priceMax?: number;
    publishedDate?: string;
    orderField?: string;
    orderType?: string;
    userName?: string;
}
