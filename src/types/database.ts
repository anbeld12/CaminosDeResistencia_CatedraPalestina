export interface Database {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ProjectRow, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

export interface ProjectRow {
  id: number;
  kind: string;
  title: string;
  author: string;
  year: string;
  n: string;
  tags: string[];
  description: string | null;
  url: string | null;
  url_alt: string | null;
  links: { label: string; url: string }[] | null;
  link_label: string | null;
  thumbnail: string | null;
  ai_thumbnail: boolean;
  members: string[];
  group_name: string | null;
  created_at: string;
  updated_at: string;
}
