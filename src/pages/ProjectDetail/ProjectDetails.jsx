import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const data = {
  thinkora: {
    title: "Thinkora",
    type: "AI Chat Platform",
    desc: "An intelligent task management platform powered by AI that auto-prioritises work, predicts deadlines, and surfaces blockers before they derail your team.",
    timeline: "3 Weeks",
    stack: "GeminiAI / Node / MongoDB",
    role: "UI + Full Stack",
  },
  taskflowai: {
    title: "TaskFlow AI",
    type: "AI Productivity Platform",
    desc: "An intelligent task management platform powered by AI that auto-prioritises work, predicts deadlines, and surfaces blockers before they derail your team.",
    timeline: "6 Weeks",
    stack: "React / Node / MongoDB",
    role: "UI + Full Stack",
  },
  luxecommerce: {
    title: "Luxe Commerce",
    type: "Luxury Ecommerce",
    desc: "Premium fashion ecommerce platform with smooth animations and an elite, friction-free shopping experience designed for high-end buyers.",
    timeline: "8 Weeks",
    stack: "Next.js / Stripe / Tailwind",
    role: "Frontend + Design",
  },
  datalens: {
    title: "DataLens",
    type: "Analytics Dashboard",
    desc: "Modern SaaS analytics dashboard with real-time charts, live stats, and a collaborative workspace for distributed data teams.",
    timeline: "5 Weeks",
    stack: "React / D3.js / Firebase",
    role: "Full Stack",
  },
  meditrack: {
    title: "MediTrack",
    type: "Healthcare App",
    desc: "Appointment booking, EHR management, and a smart patient reminder ecosystem built for clinics modernising their operations.",
    timeline: "10 Weeks",
    stack: "React / Node / PostgreSQL",
    role: "UI + Full Stack",
  },
  novastudio: {
    title: "Nova Studio",
    type: "Agency Landing Page",
    desc: "A bold, scroll-driven agency website with immersive WebGL visuals and cinematic storytelling that won multiple design awards.",
    timeline: "3 Weeks",
    stack: "GSAP / Three.js / HTML",
    role: "Frontend + Creative Direction",
  },
  orbitcrm: {
    title: "Orbit CRM",
    type: "SaaS Platform",
    desc: "Lightweight CRM with kanban pipeline views, activity tracking, email threading, and integrations with Slack and Google Workspace.",
    timeline: "12 Weeks",
    stack: "React / Node / Supabase",
    role: "Full Stack",
  },
};

function ProjectDetails() {
  const { slug } = useParams();
  const project = data[slug];

  if (!project)
    return (
      <>
        <Navbar />
        <div style={{ padding: "10rem 4rem", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3rem",
            }}
          >
            Project Not Found
          </h1>
          <Link
            to="/projects"
            style={{
              color: "var(--terra)",
              marginTop: "1rem",
              display: "inline-block",
            }}
          >
            ← Back to Projects
          </Link>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />

      <section className="details-page">
        <Link to="/projects" className="back-btn">
          <i className="ri-arrow-left-line"></i> Back to Projects
        </Link>

        <div className="hero-banner">
          <span>{project.title}</span>
        </div>

        <div className="detail-info">
          <p className="mini">{project.type}</p>
          <h1>{project.title}</h1>
          <p className="detail-desc">{project.desc}</p>

          <div className="meta-grid">
            <div>
              <h4>Timeline</h4>
              <p>{project.timeline}</p>
            </div>
            <div>
              <h4>Stack</h4>
              <p>{project.stack}</p>
            </div>
            <div>
              <h4>Role</h4>
              <p>{project.role}</p>
            </div>
          </div>
        </div>

        <div className="case-images">
          <div className="shot big"></div>
          <div className="shot"></div>
          <div className="shot"></div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProjectDetails;
