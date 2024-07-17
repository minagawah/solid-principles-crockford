export type Save<T> = (data: T) => void;
export type Fetch<T> = () => T;
export type CookiesContext<T> = {
    context: string;
    save: Save<T>;
    fetch: Fetch<T>;
};
export type ProfileData = {
    name: string;
    age: number;
};
export type ProfileContext = {
    context: string;
    save: Save<ProfileData>;
    fetch: Fetch<ProfileData>;
};
