import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm brutalist-border border-b">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-16 brutalist-border border-b"
      >
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-muted-foreground">{project.index}</span>
                <span className="text-sm text-muted-foreground">{project.year}</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold">{project.title}</h1>
              <p className="text-xl text-accent">{project.category}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex gap-4"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 brutalist-border hover:border-accent transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="aspect-video bg-muted brutalist-border overflow-hidden cursor-pointer"
            onClick={() => setIsGalleryOpen(true)}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <section className="container mx-auto px-6 py-16 brutalist-border border-b">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-8"
          >
            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Overview</h2>
              <p className="text-lg leading-relaxed">{project.description}</p>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">The Challenge</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
            </div>

            <div>
              <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">The Solution</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">{project.solution}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * idx }}
                  className="px-4 py-2 brutalist-border text-sm hover:border-accent transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">Gallery</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="aspect-video bg-muted brutalist-border overflow-hidden cursor-pointer group"
                onClick={() => {
                  setCurrentImageIndex(idx);
                  setIsGalleryOpen(true);
                }}
              >
                <img
                  src={image}
                  alt={`${project.title} - Image ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Next Project CTA */}
      <section className="brutalist-border border-t py-16">
        <div className="container mx-auto px-6 text-center">
          <Link to="/" className="inline-block">
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-5xl md:text-7xl font-bold hover:text-accent transition-colors"
            >
              View All Projects
            </motion.h2>
          </Link>
        </div>
      </section>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 p-2 hover:text-accent transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 p-4 hover:text-accent transition-colors z-10"
              disabled={project.images.length <= 1}
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 p-4 hover:text-accent transition-colors z-10"
              disabled={project.images.length <= 1}
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full h-full p-12 flex items-center justify-center"
            >
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain brutalist-border"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-muted-foreground">
              {currentImageIndex + 1} / {project.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
