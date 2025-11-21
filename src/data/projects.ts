// Import project images
import expenseTracker1 from "@/assets/projects/expense-tracker-1.png";
import expenseTracker2 from "@/assets/projects/expense-tracker-2.png";
import gentlemensBarber1 from "@/assets/projects/gentlemens-barber-1.png";
import gentlemensBarber2 from "@/assets/projects/gentlemens-barber-2.png";
import gentlemensBarber3 from "@/assets/projects/gentlemens-barber-3.png";

export interface Project {
  id: number;
  index: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  images: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    index: "01",
    title: "Expense Tracker Pro",
    slug: "expense-tracker-pro",
    year: "2024",
    category: "Full Stack Web Application",
    description: "A robust full-stack finance management tool built with the MERN stack featuring secure JWT authentication, comprehensive CRUD operations, and dynamic data visualization in a modern dark-mode interface.",
    challenge: "Creating a seamless expense management experience that prioritizes both security and user experience, with real-time analytics and responsive design that works across all devices.",
    solution: "Built a full-stack MERN application with JWT authentication for secure user sessions, implemented comprehensive CRUD operations for expense management, designed a teal-themed dark mode UI with custom animations, and integrated real-time spending analytics with category management for comprehensive financial tracking.",
    images: [expenseTracker1, expenseTracker2, expenseTracker1, expenseTracker2],
    techStack: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Vite", "Tailwind CSS"],
    githubUrl: "https://github.com/naodhunde",
  },
  {
    id: 2,
    index: "02",
    title: "Gentlemen's Barber Club",
    slug: "gentlemens-barber-club",
    year: "2024",
    category: "Full-Stack Booking & Business Management Platform",
    description: "A comprehensive barbershop platform featuring real-time booking system, admin dashboard, user authentication, automated email notifications, and role-based access control. Built with premium gold-on-charcoal design theme and optimized for SEO and accessibility (WCAG compliant).",
    challenge: "Building a complete full-stack booking platform that handles real-time appointment scheduling, user authentication, admin management, and automated notifications while maintaining premium UX across all devices. Needed secure role-based access, RLS policies, and seamless integration between frontend and backend systems.",
    solution: "Architected a full-stack solution using React 18.3 with TypeScript and Lovable Cloud (Supabase) backend. Implemented real-time booking system with availability checking, secure authentication with row-level security, admin dashboard for appointment management, automated email notifications via Edge Functions, and comprehensive user booking management. Used TanStack Query for optimized data fetching, React Hook Form with Zod validation for type-safe forms, and shadcn/ui components styled with Tailwind CSS for consistent premium design. Deployed with PostgreSQL database, Edge Functions on Deno runtime, and real-time subscriptions for live updates.",
    images: [gentlemensBarber1, gentlemensBarber2, gentlemensBarber3, gentlemensBarber1],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "React Router", "TanStack Query", "React Hook Form", "Zod", "Lovable Cloud", "Supabase", "PostgreSQL", "Edge Functions", "Deno"],
    liveUrl: "https://example.com",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
