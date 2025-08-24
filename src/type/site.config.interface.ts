export interface ISiteConfig {
  site_data: ISiteConfigSiteData;
  hero_bg_data: IHeroBgData[];
  hot_deals: IHotDeals[];
  popular_destinations: IPopularDestination[];
  popular_places: IPopularPlace[];
  social_links: ISocialLink[];
  popup: ISiteConfigPopup;
}

export interface IHotDeals {
  id: number;
  agency_id: number;
  order_number: number;
  title: string;
  thumbnail: string;
  link: string;
  status: boolean;
}

export interface IPopularPlace {
  id: number;
  agency_id: number;
  order_number: number;
  location_id: number;
  country_id: number;
  thumbnail: string;
  short_description: string;
  location_type: 'Hotel' | 'City';
  location_name: string;
  status: boolean;
  country_name: string;
}

export interface IPopularDestination {
  id: number;
  agency_id: number;
  order_number: number;
  from_airport: number;
  to_airport: number;
  status: boolean;
  thumbnail: string;
  from_airport_country: string;
  from_airport_city: string;
  from_airport_name: string;
  from_airport_code: string;
  to_airport_name: string;
  to_airport_code: string;
  to_airport_country: string;
  to_airport_city: string;
}

export interface ISocialLink {
  id: number;
  agency_id: number;
  media: string;
  link: string;
  order_number: number;
  logo: string;
  status: boolean;
}

export interface IHeroBgData {
  id: number;
  agency_id: number;
  order_number: number;
  type: 'PHOTO' | 'VIDEO';
  content: string;
  status: boolean;
  quote: string;
  sub_quote: string;
  tab: IHeroBgTab;
}

export type IHeroBgTab = 'FLIGHT' | 'HOTEL' | 'VISA' | 'UMRAH' | 'HOLIDAY' | 'GROUP' | 'BLOG';

export interface ISiteConfigPopup {
  allow: boolean;
  pop_up_data: IPopUpData;
}

export interface IPopUpData {
  id: number;
  agency_id: number;
  title: string;
  thumbnail: string;
  description: string;
  status: boolean;
  link: string;
  pop_up_for: string;
}

export interface ISiteConfigSiteData {
  main_logo: string;
  hero_quote: string;
  hero_sub_quote: string;
  site_name: string;
  emails: ISiteConfigEmail[];
  numbers: ISiteConfigNumber[];
  address: ISiteConfigAddress[];
  meta_title: string;
  meta_description: string;
  meta_tags: string;
  notice: string;
  android_app_link: string;
  ios_app_link: string;
  favicon: string;
  site_thumbnail: string;
  show_developer: boolean;
  developer_name: string;
  developer_link: string;
}

export interface ISiteConfigAddress {
  title: string;
  address: string;
}

export interface ISiteConfigEmail {
  email: string;
}

export interface ISiteConfigNumber {
  number: string;
}
