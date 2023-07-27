export interface NavItem {
    img: string;
    title: string;
    link: string;
    isDropdown: boolean;
    dropItems?: NavItem[];
}
