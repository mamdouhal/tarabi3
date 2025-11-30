// Tarabi3 Shared Types

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  order_index: number;
}

export interface APIResponse<T> {
  status?: string;
  message?: string;
  data?: T;
}

export interface ProjectsResponse {
  projects: Project[];
}

export interface ServicesResponse {
  services: Service[];
}
