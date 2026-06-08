import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import my1Img from "../../public/my1.png";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";

function Home() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash && lenis) {
      const timeoutId = setTimeout(() => {
        lenis.scrollTo(hash, { offset: -100, duration: 1.2, immediate: false });
      }, 150);
      return () => clearTimeout(timeoutId);
    }
  }, [hash, lenis]);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(targetId, { offset: -100, duration: 1.2 });
    }
  };

  return (
    <>
      <Navbar />

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-editorial-middle">
            <div className="hero-editorial-text left">
              <span className="hero-intro-label">Hey, I'm a</span>
              <h2 className="hero-name-title">VRUSHALI</h2>
            </div>

            <div className="hero-editorial-portrait">
              <div className="hero-portrait-container">
                <img src={my1Img} alt="Vrushali Devlekar" className="hero-portrait-img" />
                <div className="hero-portrait-overlay"></div>
              </div>
            </div>

            <div className="hero-editorial-text right">
              <h3 className="hero-editorial-quote">Great design should feel invisible.</h3>
              <p className="hero-editorial-desc">
                Frontend developer crafting interfaces that feel as good as they look where clean code meets intentional design.
              </p>
              <div className="hero-ctas">
                <a href="#work" onClick={(e) => handleNavClick(e, "#work")} className="btn primary-btn">
                  View Projects
                </a>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="btn secondary-btn">
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────── */}
      <section className="about" id="about">
        <div className="about-container">
          <div className="about-left">
            <span className="mini">WHO I AM</span>
            <h2>A thoughtful developer bridging code and context.</h2>
            <p>
              I am a full-stack engineer and designer based in Mumbai, collaborating with companies globally to craft digital systems that feel natural, perform flawlessly, and scale elegantly.
            </p>
            <p>
              I focus on minimal, performance-driven interfaces, robust API infrastructures, and intentional product strategies. My practice is centered on structural integrity and human experience.
            </p>
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="about-link">
              Work with me <i className="ri-arrow-right-line"></i>
            </a>
          </div>

          <div className="about-right">
            <div className="stack-grid">
              <div className="stack-card">
                <span className="stack-num">01</span>
                <h3>React &amp; Next.js</h3>
                <p>Frontend Engineering</p>
              </div>
              <div className="stack-card">
                <span className="stack-num">02</span>
                <h3>Node.js &amp; Express</h3>
                <p>APIs &amp; Microservices</p>
              </div>
              <div className="stack-card">
                <span className="stack-num">03</span>
                <h3>MongoDB</h3>
                <p>Database Management</p>
              </div>
              <div className="stack-card">
                <span className="stack-num">04</span>
                <h3>Tailwind CSS</h3>
                <p>Utility First Styling</p>
              </div>
              <div className="stack-card">
                <span className="stack-num">05</span>
                <h3>Figma</h3>
                <p>UI/UX Design Systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK ────────────────────────────────── */}
      <section className="work" id="work">
        <div className="work-header">
          <span className="mini">SELECTED WORK</span>
          <h2 className="section-title">Case Studies</h2>
        </div>

        <div className="projects-grid">
          {/* Card 1 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img src={veloraImg} alt="Velora Deploy Dashboard" className="project-img" />
              <div className="card-arrow-badge">
                <i className="ri-arrow-right-up-line"></i>
              </div>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">
                01. DEVOPS DEPLOY | A EASY UX DASHBOARD
              </h3>
              <div className="project-card-tags">
                <span className="tag-pill">One Click</span>
                <span className="tag-pill">Track your Projects</span>
                <span className="tag-pill">UX case study</span>
                <span className="tag-pill">User Testing</span>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img src={toursImg} alt="Tours Booking Web Application" className="project-img" />
              <div className="card-arrow-badge">
                <i className="ri-arrow-right-up-line"></i>
              </div>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">
                02. TOURISM BOOKING | PACK &amp; EXPLORE
              </h3>
              <div className="project-card-tags">
                <span className="tag-pill">Tourism</span>
                <span className="tag-pill">Booking</span>
                <span className="tag-pill">Destination Search</span>
                <span className="tag-pill">Schedule Visits</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────── */}
      <section className="services" id="services">
        <div className="services-header">
          <span className="mini">CAPABILITIES</span>
          <h2 className="section-title">Services</h2>
        </div>

        <div className="service-grid">
          <div className="service-card">
            <i className="ri-code-box-line"></i>
            <h3>Frontend Development</h3>
            <p>
              Building responsive, semantic, and high-performance interfaces using modern framework ecosystems.
            </p>
          </div>
          <div className="service-card">
            <i className="ri-database-2-line"></i>
            <h3>Backend Development</h3>
            <p>
              Designing secure databases, optimized API architectures, and scalable server-side systems.
            </p>
          </div>
          <div className="service-card">
            <i className="ri-instance-line"></i>
            <h3>Full Stack Applications</h3>
            <p>
              Developing unified web environments with clean boundaries between presentation and server state.
            </p>
          </div>
          <div className="service-card">
            <i className="ri-palette-line"></i>
            <h3>UI / UX Design</h3>
            <p>
              Creating design systems, journey maps, and high-fidelity wireframes that balance aesthetics with usability.
            </p>
          </div>
          <div className="service-card">
            <i className="ri-server-line"></i>
            <h3>Deployment &amp; DevOps</h3>
            <p>
              Configuring CI/CD pipelines, containerized deployments, and robust hosting on cloud platforms.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────── */}
      <section className="contact" id="contact">
        <div className="contact-container">
          <div className="contact-left">
            <span className="mini">GET IN TOUCH</span>
            <h2 className="editorial-contact-title">
              LET'S BUILD<br />
              SOMETHING<br />
              <em>TOGETHER</em>
            </h2>
            <p>
              Whether you have a fully scoped product or a rough idea, I would love to hear from you. Let's figure out what is possible.
            </p>

            <div className="contact-details">
              <div className="contact-link-row">
                <i className="ri-mail-line"></i>
                <span>vrushalidevlekar12@gmail.com</span>
              </div>
              <div className="contact-link-row">
                <i className="ri-map-pin-line"></i>
                <span>Mumbai, India · Remote</span>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Alex Morgan" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="alex@company.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option value="">Select an option…</option>
                  <option>Freelance Project</option>
                  <option>Full-time Opportunity</option>
                  <option>Collaboration</option>
                  <option>Just saying hi</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell me about your project, timeline, and budget…"></textarea>
              </div>

              <div className="form-submit">
                <span className="privacy-note">Your details remain private.</span>
                <button type="submit" className="btn submit-btn">
                  Send Message <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
