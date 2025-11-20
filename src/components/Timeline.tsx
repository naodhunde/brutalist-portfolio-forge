import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

export interface TimelineItem {
  id: string;
  type: "education" | "work";
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />
      
      <div className="space-y-12">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="relative pl-12 md:pl-20 group"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-4 top-0 w-8 h-8 brutalist-border bg-background flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
              {item.type === "education" ? (
                <GraduationCap className="w-4 h-4 text-accent group-hover:text-accent-foreground transition-colors" />
              ) : (
                <Briefcase className="w-4 h-4 text-accent group-hover:text-accent-foreground transition-colors" />
              )}
            </div>

            {/* Content card */}
            <div className="brutalist-border p-6 md:p-8 bg-card hover:border-accent transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-lg text-foreground">{item.organization}</p>
                </div>
                <span className="font-mono text-sm text-muted-foreground mt-2 md:mt-0 whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {item.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">▸</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="brutalist-border px-3 py-1 text-xs text-foreground hover:border-accent hover:text-accent transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
