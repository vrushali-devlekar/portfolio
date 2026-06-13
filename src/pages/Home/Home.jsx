import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLenis } from "lenis/react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import port1Img from "../../public/port-1.png";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";
import gameImg from "../../public/game.png";
import frontend3d from "../../public/frontend_3d.png";
import backend3d from "../../public/backend_3d.png";
import fullstack3d from "../../public/fullstack_3d.png";
import uiux3d from "../../public/uiux_3d.png";
import devops3d from "../../public/devops_3d.png";

function Home() {
  const { hash } = useLocation();
  const lenis = useLenis();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".service-card");
      if (card) {
        const style = window.getComputedStyle(sliderRef.current);
        const gap = parseInt(style.gap || "0", 10);
        const scrollAmount = card.clientWidth + gap;
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".service-card");
      if (card) {
        const style = window.getComputedStyle(sliderRef.current);
        const gap = parseInt(style.gap || "0", 10);
        const scrollAmount = card.clientWidth + gap;
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

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
        {/* Background image container for port-1.png */}
        <div className="hero-bg-wrapper">
          <img
            src={port1Img}
            alt="Vrushali Devlekar Silhouette"
            className="hero-bg-img"
          />
          <div className="hero-bg-overlay"></div>
        </div>

        <div className="hero-container">
          {/* Top Bar inside hero */}
          <div className="hero-top-bar">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="status-text">Open to work</span>
            </div>
            <Link to="/contact" className="download-cv-btn">
              Get in Touch
            </Link>
          </div>

          {/* Main Hero Content */}
          <div className="hero-main-content">
            <span className="hero-subtitle">Full Stack Developer</span>
            <h1 className="hero-title">
              Vrushali
              <br />
              Devlekar
            </h1>

            {/* Contact Info Grid */}
            <div className="hero-contact-grid">
              <a
                href="mailto:vrushali.devlekar@gmail.com"
                className="hero-contact-item"
              >
                <div className="icon-box">
                  <i className="ri-mail-line"></i>
                </div>
                <span className="contact-text">vrushali.devlekar@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vrushali-devlekar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-contact-item"
              >
                <div className="icon-box">
                  <i className="ri-linkedin-box-fill"></i>
                </div>
                <span className="contact-text">
                  linkedin.com/in/vrushali-devlekar
                </span>
              </a>
              <a
                href="https://github.com/vrushali-devlekar"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-contact-item"
              >
                <div className="icon-box">
                  <i className="ri-github-fill"></i>
                </div>
                <span className="contact-text">github.com/vrushali-devlekar</span>
              </a>
              <div className="hero-contact-item">
                <div className="icon-box">
                  <i className="ri-map-pin-line"></i>
                </div>
                <span className="contact-text">Mumbai, India</span>
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
              I am a full-stack engineer and designer based in Mumbai,
              collaborating with companies globally to craft digital systems
              that feel natural, perform flawlessly, and scale elegantly.
            </p>
            <p>
              I focus on minimal, performance-driven interfaces, robust API
              infrastructures, and intentional product strategies. My practice
              is centered on structural integrity and human experience.
            </p>
            {/* <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="about-link"
            >
              Work with me <i className="ri-arrow-right-line"></i>
            </a> */}
          </div>

          <div className="about-right">
            <div className="tech-logo-grid">
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/mongodb"
                  alt="MongoDB"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">MongoDB</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/express/ffffff"
                  alt="Express"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">Express</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/react"
                  alt="React"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">React</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/nodedotjs"
                  alt="Node"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">Node</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/javascript"
                  alt="JavaScript"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">JavaScript</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/tailwindcss"
                  alt="TailwindCSS"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">TailwindCSS</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/sass"
                  alt="Sass"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">Sass</span>
              </div>
              <div className="tech-logo-item">
                <img
                  src="https://cdn.simpleicons.org/redis"
                  alt="Redis"
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">Redis</span>
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
              <img
                src={veloraImg}
                alt="Velora Deploy Dashboard"
                className="project-img"
              />
              <div className="card-arrow-badge">
                <i className="ri-arrow-right-up-line"></i>
              </div>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">
                01. DEVOPS DEPLOY | A EASY UX DASHBOARD
              </h3>
              {/* <div className="project-card-tags">
                <span className="tag-pill">One Click</span>
                <span className="tag-pill">Track your Projects</span>
                <span className="tag-pill">UX case study</span>
                <span className="tag-pill">User Testing</span>
              </div> */}
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img
                src={toursImg}
                alt="Tours Booking Web Application"
                className="project-img"
              />
              <div className="card-arrow-badge">
                <i className="ri-arrow-right-up-line"></i>
              </div>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">
                02. TOURISM BOOKING | PACK &amp; EXPLORE
              </h3>
              {/* <div className="project-card-tags">
                <span className="tag-pill">Tourism</span>
                <span className="tag-pill">Booking</span>
                <span className="tag-pill">Destination Search</span>
                <span className="tag-pill">Schedule Visits</span>
              </div> */}
            </div>
          </Link>

          {/* Card 3 */}
          <div className="project-card disabled">
            <div className="project-img-wrapper">
              <img
                src={gameImg}
                alt="Gaming Stream Dashboard"
                className="project-img"
              />
              <div className="catalog-live-badge dev-badge">
                <span className="dev-dot"></span>
                development
              </div>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">
                03. GAMING STREAM | SASS DASHBOARD
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────── */}
      <section className="services" id="services">
        <div className="services-header">
          <h2 className="services-section-title">Our service</h2>
          <div className="services-controls">
            <button
              className="services-control-btn"
              onClick={scrollLeft}
              aria-label="Previous service"
            >
              <i className="ri-arrow-left-line"></i>
            </button>
            <button
              className="services-control-btn"
              onClick={scrollRight}
              aria-label="Next service"
            >
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>

        <div className="services-slider" ref={sliderRef}>
          {/* Card 1 */}
          <div className="service-card">
            <div className="service-card-info">
              <span className="service-card-num">(01)</span>
              <h3 className="service-card-title">Frontend Development</h3>
              <p className="service-card-desc">
                Building responsive, semantic, and high-performance interfaces
                using modern framework ecosystems.
              </p>
            </div>
            <div className="service-card-icon-wrapper">
              <i className="ri-code-box-line service-card-icon"></i>
            </div>
          </div>

          {/* Card 2 */}
          <div className="service-card">
            <div className="service-card-info">
              <span className="service-card-num">(02)</span>
              <h3 className="service-card-title">Backend Development</h3>
              <p className="service-card-desc">
                Designing secure databases, optimized API architectures, and
                scalable server-side systems.
              </p>
            </div>
            <div className="service-card-icon-wrapper">
              <i className="ri-database-2-line service-card-icon"></i>
            </div>
          </div>

          {/* Card 3 */}
          <div className="service-card">
            <div className="service-card-info">
              <span className="service-card-num">(03)</span>
              <h3 className="service-card-title">Full Stack Applications</h3>
              <p className="service-card-desc">
                Developing unified web environments with clean boundaries
                between presentation and server state.
              </p>
            </div>
            <div className="service-card-icon-wrapper">
              <i className="ri-instance-line service-card-icon"></i>
            </div>
          </div>

          {/* Card 4 */}
          <div className="service-card">
            <div className="service-card-info">
              <span className="service-card-num">(04)</span>
              <h3 className="service-card-title">UI / UX Design</h3>
              <p className="service-card-desc">
                Creating design systems, journey maps, and high-fidelity
                wireframes that balance aesthetics with usability.
              </p>
            </div>
            <div className="service-card-icon-wrapper">
              <i className="ri-palette-line service-card-icon"></i>
            </div>
          </div>

          {/* Card 5 */}
          <div className="service-card">
            <div className="service-card-info">
              <span className="service-card-num">(05)</span>
              <h3 className="service-card-title">Deployment &amp; DevOps</h3>
              <p className="service-card-desc">
                Configuring CI/CD pipelines, containerized deployments, and
                robust hosting on cloud platforms.
              </p>
            </div>
            <div className="service-card-icon-wrapper">
              <i className="ri-server-line service-card-icon"></i>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
