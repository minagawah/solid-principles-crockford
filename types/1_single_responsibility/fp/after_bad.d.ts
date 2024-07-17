export type PaymentMethodValues = import("../../d.ts/types.d.ts").ValueOf<{
    CreditCard: number;
    DebitCard: number;
    PayPal: number;
    Combini: number;
    CashOnDelivery: number;
}>;
export type UpdateAddress = (address: string) => any;
export type GetAddress = () => string;
export type Pay = (args: {
    method: PaymentMethodValues;
    price: number;
}) => any;
export type PaymentContext = {
    update_address: UpdateAddress;
    get_address: GetAddress;
    pay: Pay;
};
