export interface AuthorSocials {
  github?: string;
  linkedin?: string;
  website?: string;
}

export interface SocialLink {
  label: string;
  icon: "github" | "linkedin";
  href: string;
}

export interface Author {
  name: string;
  title?: string;
  picture?: string;
  bio?: string;
  social?: AuthorSocials;
}