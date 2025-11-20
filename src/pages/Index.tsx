import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Sparkles, Zap, TrendingUp, Linkedin, Send, Instagram } from "lucide-react";
import { projects } from "@/data/projects";
import { Timeline, TimelineItem } from "@/components/Timeline";

const services = [
  { icon: Code2, title: "Full Stack Development", description: "MERN Stack, React Native" },
  { icon: Sparkles, title: "Mobile Development", description: "React Native, Flutter" },
  { icon: Zap, title: "UI/UX Design", description: "Responsive Design Systems" },
  { icon: TrendingUp, title: "Security", description: "Cybersecurity & Authentication" },
];

const timelineData: TimelineItem[] = [
  {
    id: "wsu",
    type: "education",
    title: "Bachelor of Information Technology",
    organization: "Western Sydney University",
    period: "2023 - Present",
    description: "Majoring in Cybersecurity with a GPA of 4.0, focusing on information security, network defense, and secure application development.",
    highlights: [
      "Achieved perfect 4.0 GPA demonstrating exceptional academic performance",
      "Specializing in cybersecurity principles and secure coding practices",
      "Developing expertise in threat analysis and security architecture"
    ],
    technologies: ["Cybersecurity", "Network Security", "Secure Coding", "Threat Analysis"]
  },
  {
    id: "stomble",
    type: "work",
    title: "Mobile Application Developer Intern",
    organization: "Stomble",
    period: "Jun 2023 – Sep 2023",
    description: "Developed and maintained cross-platform mobile applications, collaborating with the development team to deliver high-performance features.",
    highlights: [
      "Built responsive mobile applications for Android and iOS using React Native",
      "Optimized application performance, security, and user experience",
      "Achieved 20% increase in user engagement and retention through feature enhancements"
    ],
    technologies: ["React Native", "JavaScript", "Android", "iOS", "Mobile Development"]
  },
  {
    id: "aml",
    type: "work",
    title: "Software Engineer Intern",
    organization: "AML Cloud",
    period: "May 2023 – Jun 2023",
    description: "Spearheaded development of responsive UI components and architected scalable database solutions with real-time capabilities.",
    highlights: [
      "Developed responsive UI components in Flutter with modern design patterns",
      "Architected scalable Firestore database with real-time data synchronization",
      "Implemented secure authentication system using Firebase Authentication",
      "Optimized state management using Flutter Riverpod for improved performance"
    ],
    technologies: ["Flutter", "Firebase", "Firestore", "Riverpod", "Dart", "Authentication"]
  },
  {
    id: "usyd",
    type: "education",
    title: "Certification in Full Stack Development",
    organization: "University of Sydney",
    period: "2022 - 2023",
    description: "Intensive bootcamp program covering modern web development technologies with hands-on project experience.",
    highlights: [
      "Completed comprehensive curriculum in full stack web development",
      "Mastered MERN stack (MongoDB, Express.js, React, Node.js) through intensive coding bootcamps",
      "Built and deployed multiple full-stack applications from scratch",
      "Developed expertise in modern JavaScript, API design, and database management"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "JavaScript", "REST APIs"]
  }
];

type View = "home" | "about" | "work";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("home");
  const [time, setTime] = useState(new Date());
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Track mouse position for project preview
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Global click ripple effect
  const handleGlobalClick = useCallback((e: React.MouseEvent) => {
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" onClick={handleGlobalClick}>
      {/* Click ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="click-ripple"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
        />
      ))}

      {/* HUD Corner Decorations */}
      <div className="fixed top-4 left-4 hud-text z-50">
        <div>51.2°N 6.7°E</div>
        <div className="mt-1">v2.0.24</div>
      </div>
      <div className="fixed top-4 right-4 hud-text z-50 text-right">
        <div>WEBGL 2.0</div>
        <div className="mt-1 text-hud-accent">ONLINE</div>
      </div>
      <div className="fixed bottom-4 left-4 hud-text z-50">
        <div>© 2024</div>
      </div>
      <div className="fixed bottom-4 right-4 hud-text z-50 text-right">
        <div className="opacity-60">tap on the screen 😉</div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm brutalist-border border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold tracking-tight">Naod Hunde • Full Stack Developer</div>
          
          <div className="flex items-center gap-6 font-mono text-sm">
            <div>{formatTime(time)}</div>
            <div className="text-muted-foreground">Located in Sydney</div>
          </div>

          <nav className="flex gap-6 text-sm">
            {(["home", "about", "work"] as const).map((view) => (
              <button
                key={view}
                onClick={() => {
                  console.log(`Switching to view: ${view}`);
                  setCurrentView(view);
                }}
                className={`uppercase tracking-wider transition-colors ${
                  currentView === view ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {view}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {currentView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="min-h-[60vh] flex flex-col justify-center brutalist-border border-b pb-16">
              <motion.h1
                className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold leading-none lowercase tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {("hellooooo".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 50, rotate: -10 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="inline-block"
                    whileHover={{ 
                      scale: 1.2, 
                      color: "hsl(var(--accent))",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {letter}
                  </motion.span>
                )))}
              </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Full Stack Developer specializing in MERN stack, React Native, and creating robust, scalable web applications.
                </motion.p>
              </div>

              {/* Recent Works List */}
              <div className="py-16">
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Recent Works</h2>
                <div className="space-y-1">
                  {projects.slice(0, 5).map((project, idx) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="project-hover-card brutalist-border border-b py-6 group"
                    >
                      <Link to={`/work/${project.slug}`} className="flex items-center gap-8">
                        <span className="font-mono text-muted-foreground text-sm">{project.index}</span>
                        <span className="text-4xl md:text-5xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Project Preview */}
              <AnimatePresence>
                {hoveredProject && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed pointer-events-none z-50 w-96 h-64 brutalist-border border-2 border-accent"
                    style={{
                      left: mousePosition.x + 20,
                      top: mousePosition.y + 20,
                    }}
                  >
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <img
                        src={projects.find((p) => p.id === hoveredProject)?.images[0]}
                        alt="Project preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {currentView === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-16"
            >
              <div className="grid md:grid-cols-2 gap-16 brutalist-border border-b pb-16">
                <div>
                  <h2 className="text-5xl font-bold mb-8">About</h2>
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p className="font-semibold text-foreground">Naod Hunde</p>
                    <p>
                      Email: <a href="mailto:naodhunde@gmail.com" className="text-accent hover:underline transition-colors">naodhunde@gmail.com</a>
                    </p>
                    <p>
                      Phone: <a href="tel:0414252751" className="text-accent hover:underline transition-colors">0414252751</a>
                    </p>
                    <p className="pt-4">
                      Currently pursuing a Bachelor of Information Technology majoring in Cybersecurity at Western Sydney University (GPA: 4.0), 
                      with a Certification in Full Stack Development from the University of Sydney.
                    </p>
                    <p>
                      I specialize in building full-stack applications using the MERN stack and mobile development with React Native and Flutter. 
                      My experience includes developing high-performance mobile applications, architecting scalable databases, and implementing 
                      secure authentication systems that enhance user engagement and retention.
                    </p>
                    <p>
                      With hands-on experience at Stomble and AML Cloud, I've contributed to projects that prioritize performance, security, 
                      and exceptional user experiences across both web and mobile platforms.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Services</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service, idx) => (
                      <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="brutalist-border p-6 hover:border-accent transition-colors group"
                      >
                        <service.icon className="w-8 h-8 mb-4 text-accent" />
                        <h4 className="font-bold mb-2 group-hover:text-accent transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Career Timeline */}
              <div className="py-16">
                <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Career Timeline</h3>
                <Timeline items={timelineData} />
              </div>
            </motion.div>
          )}

          {currentView === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="py-16"
            >
              <h2 className="text-5xl font-bold mb-12">All Works</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link to={`/work/${project.slug}`} className="group block">
                      <div className="aspect-video bg-muted brutalist-border overflow-hidden mb-4">
                        <img
                          src={project.images[0]}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-baseline justify-between">
                        <h3 className="text-3xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <span className="font-mono text-muted-foreground">{project.year}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="brutalist-border border-t py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-4 hover:text-accent transition-colors cursor-pointer">
              Let's create a website
            </h2>
          </motion.div>
          
          <div className="flex justify-center gap-8 text-sm">
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
