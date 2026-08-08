"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Wrench } from "lucide-react";

export default function SkillsGrid() {
  const skillCategories = [
    {
      category: "Frontend Dev",
      icon: <Code className="w-4 h-4 text-[#E05638]" />,
      skills: [
        { name: "Next.js", slug: "nextdotjs" },
        { name: "React", slug: "react" },
        { name: "TypeScript", slug: "typescript" },
        { name: "JavaScript", slug: "javascript" },
        { name: "Tailwind CSS", slug: "tailwindcss" },
        { name: "Redux", slug: "redux" },
      ],
    },
    {
      category: "Backend Systems",
      icon: <Server className="w-4 h-4 text-[#E05638]" />,
      skills: [
        { name: "Node.js", slug: "nodedotjs" },
        { name: "Express", slug: "express" },
        { name: "Python", slug: "python" },
        { name: "FastAPI", slug: "fastapi" },
        { name: "GraphQL", slug: "graphql" },
        { name: "Socket.io", slug: "socketdotio" },
      ],
    },
    {
      category: "Databases & Cache",
      icon: <Database className="w-4 h-4 text-[#E05638]" />,
      skills: [
        { name: "MongoDB", slug: "mongodb" },
        { name: "PostgreSQL", slug: "postgresql" },
        { name: "Redis", slug: "redis" },
        { name: "Prisma", slug: "prisma" },
        { name: "Mongoose", slug: "mongoose" },
      ],
    },
    {
      category: "DevOps & Tools",
      icon: <Wrench className="w-4 h-4 text-[#E05638]" />,
      skills: [
        { name: "Docker", slug: "docker" },
        { name: "AWS", slug: "amazonwebservices" },
        { name: "GitHub Actions", slug: "githubactions" },
        { name: "Git", slug: "git" },
        { name: "Linux", slug: "linux" },
        { name: "Vercel", slug: "vercel" },
      ],
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="skills">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>04 // Technical Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Technical <span className="italic text-[#E05638]">Skills & Tools</span>
          </h2>
        </div>

        {/* 4-Column Grid of Modular Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="retro-card p-6 rounded-2xl border border-[#1C1C1C]/15 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#1C1C1C]/10">
                  <div className="p-2 rounded-lg bg-[#EFE9D5] shadow-sm">{cat.icon}</div>
                  <h3 className="text-base font-serif font-bold text-[#1C1C1C]">{cat.category}</h3>
                </div>

                {/* Skills Vector List */}
                <div className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.slug}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/10 hover:bg-white hover:scale-[1.02] transition-all cursor-default group"
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${skill.slug}`}
                        alt={skill.name}
                        className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                      />
                      <span className="text-xs font-mono font-medium text-[#1C1C1C]">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
