import { RouteLocationRaw } from 'vue-router';

interface ItemLink {
  icon: string,
  label: string,
  to?: RouteLocationRaw
}

export interface ExpansionItemLink extends ItemLink {
  links?: ItemLink[]
}