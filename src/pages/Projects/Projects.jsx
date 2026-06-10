import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";

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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Projects;
