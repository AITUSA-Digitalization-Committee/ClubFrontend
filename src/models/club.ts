import { Member } from "./member";

export interface Club {
  id: string;
  title: string;
  description: string;
  logo: string;
  banner: string;
  members?: Member[];
}
