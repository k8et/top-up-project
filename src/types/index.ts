// Common
export interface ObjectData {
  [key: string]: any;
}

export type SizeComponent = "mini" | "medium" | "big";
export type ColorComponent = "primary";

// User
export interface UserLogIn {
  login: string;
  password: string;
}
export interface UserCreate {
  login: string;
  name: string;
  password: string;
  surname: string;
}
export interface UserId {
  user_id: number;
}
export interface UserUpdate extends UserCreate, UserId {}

// Server
export interface ServerCreate {
  activity: boolean;
  cpu: string;
  ip: string;
  link: string;
  login: string;
  login_anyd: string;
  name: string;
  password: string;
  password_anyd: string;
  ram: string;
  storage: string;
  type: string;
}
export interface ServerId {
  server_id: number;
}
export interface ServerUpdate extends ServerCreate, ServerId {
  created_at: number;
  creator_id: number;
  to_a_specific_proxy: boolean;
}

// Proxy
export interface ProxyCreate {
  address: string;
  name: string;
  server_id: number;
}
export interface ProxyId {
  proxy_id: number;
}
export interface ProxyUpdate extends ProxyId {
  address: string;
}

// Link
export interface LinkCreate {
  leads_to_post: boolean;
  link: string;
  link_time: string;
  spec_links: string;
  to_a_specific_link: boolean;
  traffic: string;
}
export interface LinkId {
  link_id: number;
}
export interface LinkUpdate extends LinkCreate, LinkId {}

// Search
export interface SearchCreate {
  link: string;
  props: boolean;
  type: string;
}
export interface SearchId {
  search_id: number;
}
export interface SearchUpdate extends SearchId {
  link: string;
  properties: string;
  search_for: string;
}

// Device
export interface DeviceUpdate {
  phone: number;
  desktop: number;
  tablet: number;
}

// SmartMode
export interface SmartModeUpdate {
  promotion_time_and_percentage: string;
  sleep_time: string;
  toggle: boolean;
}

// TimeSite
export interface TimeSiteUpdate {
  emulation_of_inactivity: string;
  emulation_of_inactivity_between_articles: string;
  make_transitions: boolean;
  number_of_transitions: string;
}
