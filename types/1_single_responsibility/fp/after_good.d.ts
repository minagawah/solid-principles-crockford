export type PaymentMethodValues = import("../../d.ts/types.d.ts").ValueOf<{
    CreditCard: number;
    DebitCard: number;
    PayPal: number;
    Combini: number;
    CashOnDelivery: number;
}>;
export type UpdateAddress = (address: string) => any;
export type GetAddress = () => string;
export type AccountContext = {
    update_address: UpdateAddress;
    get_address: GetAddress;
};
export type Pay = (args: {
    account: AccountContext;
    method: PaymentMethodValues;
    price: number;
}) => any;
export type PaymentContext = {
    pay: Pay;
};
