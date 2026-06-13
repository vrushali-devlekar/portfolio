import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";
import gameImg from "../../public/game.png";

function Projects() {
  return (
    <>
      <Navbar />

      <section className="project-page">
        <p className="mini">Selected Work</p>
        <h1 className="projects-page-title">
          Projects
        </h1>
        <p className="page-desc">
          A focused showcase of digital systems, platforms, and interactive interfaces built with precision.
        </p>

        <div className="catalog-grid">
          {/* Card 1 */}
          <a href="https://veloraa-deploy.vercel.app/" target="_blank" rel="noopener noreferrer" className="catalog-card">
            <div className="catalog-img-wrapper">
              <img src={veloraImg} alt="Velora Deploy" className="catalog-img" />
              <div className="catalog-live-badge">
                <span className="live-dot"></span>
                live
              </div>
            </div>
            
            <div className="catalog-body">
              <h3 className="catalog-title">
                01. DEVOPS DEPLOY | A EASY UX DASHBOARD
              </h3>
              <div className="catalog-tags">
                <span className="tag-pill">One Click</span>
                <span className="tag-pill">Track your Projects</span>
                <span className="tag-pill">UX case study</span>
                <span className="tag-pill">User Testing</span>
              </div>
            </div>
          </a>

          {/* Card 2 */}
          <a href="https://pack-explore.onrender.com/" target="_blank" rel="noopener noreferrer" className="catalog-card">
            <div className="catalog-img-wrapper">
              <img src={toursImg} alt="Pack &amp; Explore" className="catalog-img" />
              <div className="catalog-live-badge">
                <span className="live-dot"></span>
                live
              </div>
            </div>
            
            <div className="catalog-body">
              <h3 className="catalog-title">
                02. TOURISM BOOKING | PACK &amp; EXPLORE
              </h3>
              <div className="catalog-tags">
                <span className="tag-pill">Tourism</span>
                <span className="tag-pill">Booking</span>
                <span className="tag-pill">Destination Search</span>
                <span className="tag-pill">Schedule Visits</span>
              </div>
            </div>
          </a>

          {/* Card 3 */}
          <div className="catalog-card disabled">
            <div className="catalog-img-wrapper">
              <img src={gameImg} alt="Gaming Stream" className="catalog-img" />
              <div className="catalog-live-badge dev-badge">
                <span className="dev-dot"></span>
                development
              </div>
            </div>
            
            <div className="catalog-body">
              <h3 className="catalog-title">
                03. GAMING STREAM | SASS DASHBOARD
              </h3>
              <div className="catalog-tags">
                <span className="tag-pill">Streaming</span>
                <span className="tag-pill">SaaS Dashboard</span>
                <span className="tag-pill">Interactive UI</span>
                <span className="tag-pill">Game Metrics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Projects;
