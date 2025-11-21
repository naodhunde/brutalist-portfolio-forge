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
    category: "Business Website & Booking System",
    description: "A premium barbershop website featuring online booking, service showcase, client reviews, and gallery. Built with modern web technologies and elegant gold-on-black design theme for a luxury grooming experience.",
    challenge: "Creating an intuitive booking experience for a traditional barbershop while maintaining a premium, professional aesthetic. The system needed to handle service selection, time slot management, and customer communication seamlessly.",
    solution: "Developed a comprehensive multi-page website with custom booking flow, integrated contact forms, interactive gallery, and reviews section. Implemented responsive design with sophisticated animations and a luxurious color scheme that reflects the brand's premium positioning in the Mount Druitt market.",
    images: [gentlemensBarber1, gentlemensBarber2, gentlemensBarber3, gentlemensBarber1],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router"],
    liveUrl: "https://example.com",
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
