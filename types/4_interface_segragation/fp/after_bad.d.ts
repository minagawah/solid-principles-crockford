export type Method = () => void;
export type EmployeeContext = {
    context?: string;
    use_chopstikcs: Method;
    eat_chow_mein: Method;
    use_excel: Method;
    use_visual_studio: Method;
};
