export type Args<T> = Array<T>;
export type Add = (args: Args<number>) => number;
export type PersonContext = {
    context?: string;
    add: Add;
};
export type EmployeeContext = PersonContext & {};
export type DeveloperContext = PersonContext & {};
