export type GetPrice = () => number;
export type ApplyDiscount = (discount?: number) => number;
export type ProductContext = {
    get_price: GetPrice;
    apply_discount: ApplyDiscount;
};
