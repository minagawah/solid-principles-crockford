export type Method = () => any;
export type Arg = Record<string, Method>;
export type EmployeeInterface = {
    context?: string;
    use_chopsticks: Method;
    eat_chow_mein: Method;
};
export type AccountantInterface = {
    context?: string;
    use_excel: Method;
};
export type DeveloperInterface = {
    context?: string;
    use_visual_studio: Method;
};
