export type GetPrice = (discount?: number) => number;
export type ProductContext = {
    get_price: GetPrice;
};
