export interface NavItem {
  id: string;
  href: string;
  label: string;
  subitems?: NavItem[];
}