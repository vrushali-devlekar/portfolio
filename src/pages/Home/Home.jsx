import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { Link } from "react-router-dom";
import my1Img from "../../public/my1.png";
import techusImg from "../../public/techus.png";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";

function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg-container">
          <img src={my1Img} alt="Vrushali Devlekar" className="hero-bg-img" />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-left">
              <span className="hero-sub">Hey, I'm a</span>
              <h1 className="hero-title">
                Creative<br />
                <span className="hero-title-bold">Developer</span>
              </h1>
            </div>

            <div className="hero-right">
              <h2 className="hero-quote">Great design should feel invisible.</h2>
              <p className="hero-desc">
               Frontend developer crafting interfaces that feel as good as they look where clean code meets intentional design.
              </p>
            </div>
          </div>

          <div className="hero-services">
            <div className="service-pill">
              <span className="pill-num">#01</span>
              <span className="pill-label">Brand Strategy</span>
            </div>
            <div className="service-pill">
              <span className="pill-num">#02</span>
              <span className="pill-label">Brand Identity Design</span>
            </div>
            <div className="service-pill">
              <span className="pill-num">#03</span>
              <span className="pill-label">Packaging Design</span>
            </div>
            <div className="service-pill">
              <span className="pill-num">#04</span>
              <span className="pill-label">Creative Direction</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────── */}
      <section className="about" id="about">
        <div className="left">
          {/* <p className="mini">About Me</p> */}
          <h2>WHO I AM</h2>
          <p>
            I'm a full-stack developer and UI/UX designer who obsesses over the
            details — from pixel-perfect layouts to clean, maintainable
            architecture.
          </p>
          <p>
            I believe great products are born at the intersection of empathy and
            craft. Based in Mumbai, collaborating globally.
          </p>
          <a href="#contact" className="about-link">
            Work with me <i className="ri-arrow-right-line"></i>
          </a>
        </div>

        <div className="right">
          <div className="skill-tile">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              alt="React"
            />
            <span>React &amp; Next.js</span>
          </div>
          <div className="skill-tile">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
              alt="Node"
            />
            <span>Node.js</span>
          </div>
          <div className="skill-tile">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
              alt="MongoDB"
            />
            <span>MongoDB</span>
          </div>
          <div className="skill-tile">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
              alt="Figma"
            />
            <span>Figma</span>
          </div>
        </div>
      </section>

      {/* ── WORK ────────────────────────────────── */}
      <section className="work" id="work">
        <h2 className="projects-showcase-title">
          <span className="spark">✦</span> Projects Showcase <span className="spark">✦</span>
        </h2>

        <div className="projects-grid">
          {/* Card 1 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img src={techusImg} alt="Tech-Us" className="project-img" />
              <button className="project-arrow-btn">
                <i className="ri-arrow-right-up-line"></i>
              </button>
            </div>
            
            <h3 className="project-card-title">
              01. Dashboard &amp; learning platform
            </h3>

            <div className="project-tags">
              <span className="tag">Live deck</span>
              <span className="tag">Teacher live classes</span>
              <span className="tag">Branding</span>
              <span className="tag">Update skills</span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img src={veloraImg} alt="Velora Deploy" className="project-img" />
              <button className="project-arrow-btn">
                <i className="ri-arrow-right-up-line"></i>
              </button>
            </div>
            
            <h3 className="project-card-title">
              02. DevOps Deploy | A Easy UX Dashboard
            </h3>

            <div className="project-tags">
              <span className="tag">One Click</span>
              <span className="tag">Track your Projects</span>
              <span className="tag">UX case study</span>
              <span className="tag">User Testing</span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/projects" className="project-card">
            <div className="project-img-wrapper">
              <img src={toursImg} alt="Tours Design" className="project-img" />
              <button className="project-arrow-btn">
                <i className="ri-arrow-right-up-line"></i>
              </button>
            </div>
            
            <h3 className="project-card-title">
              03. Tourism Booking Web Application
            </h3>

            <div className="project-tags">
              <span className="tag">Social Media Campaign</span>
              <span className="tag">Book Visits</span>
              <span className="tag">Global Tours</span>
            </div>
          </Link>
        </div>

        <div className="projects-view-all">
          <Link to="/projects" className="btn view-all-btn">
            View all projects <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────── */}
      <section className="services" id="services">
        <p className="mini">What I Do</p>
        <h2>SERVICES</h2>

        <div className="service-grid">
          <div className="service-card">
            <i className="ri-palette-line"></i>
            <h3>UI / UX DESIGN</h3>
            <p>
              User-first interfaces rooted in research and refined through
              iteration.
            </p>
          </div>
          <div className="service-card active">
            <i className="ri-code-box-line"></i>
            <h3>WEB DEVELOPMENT</h3>
            <p>
              Performant, scalable web applications built with modern stacks.
            </p>
          </div>
          <div className="service-card">
            <i className="ri-lightbulb-line"></i>
            <h3>PRODUCT STRATEGY</h3>
            <p>
              Turning early-stage ideas into structured, shippable products.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────── */}
      <section className="contact" id="contact">
        <div className="contact-left">
          <p className="mini">Get In Touch</p>
          <h2>
            LET'S
            <br />
            BUILD
            <br />
            <em>TOGETHER</em>
          </h2>
          <p>
            Whether you have a fully scoped project or just a rough idea, I'd
            love to hear from you. Let's figure out what's possible.
          </p>

          <div className="contact-info">
            <div className="contact-row">
              <i className="ri-mail-line"></i>
              <div>
                <small>Email</small>
                <span>vrushali@devlekar.dev</span>
              </div>
            </div>
            <div className="contact-row">
              <i className="ri-map-pin-line"></i>
              <div>
                <small>Location</small>
                <span>Mumbai, India · Remote-friendly</span>
              </div>
            </div>
            <div className="contact-row">
              <i className="ri-time-line"></i>
              <div>
                <small>Response time</small>
                <span>Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Priya Sharma" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="priya@company.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <select>
              <option value="">Select a topic…</option>
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
            <p className="note">No spam. Your info stays private.</p>
            <button type="submit" className="btn send">
              Send Message <i className="ri-send-plane-line"></i>
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default Home;
