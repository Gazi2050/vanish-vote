export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export interface Option {
    text: string;
}

export interface FormData {
    title: string;
    pollType: string;
    options: Option[];
    expirationTime: string;
    hideResults?: boolean;
}