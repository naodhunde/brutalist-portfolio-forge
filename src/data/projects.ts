// Import project images
import expenseTracker1 from "@/assets/projects/expense-tracker-1.png";
import expenseTracker2 from "@/assets/projects/expense-tracker-2.png";

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
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
