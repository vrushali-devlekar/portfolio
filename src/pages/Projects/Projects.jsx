import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import veloraImg from "../../public/velora.png";
import toursImg from "../../public/tours.png";

function Projects() {
  return (
    <>
      <Navbar />

      <section className="project-page">
        <p className="mini">Creative Catalog</p>
        <h1>
          My Projects
        </h1>
        <p className="page-desc">
          A collection of platforms, applications, and tools built with design and engineering in mind.
        </p>

        <div className="catalog-grid">

          {/* Card 2 */}
          <a href="https://veloraa-deploy.vercel.app/" target="_blank" rel="noopener noreferrer" className="catalog-card">
            <div className="catalog-img-wrapper">
              <span className="catalog-img-tag">DevOps</span>
              <img src={veloraImg} alt="Velora Deploy" className="catalog-img" />
            </div>
            
            <div className="catalog-body">
              <h3 className="catalog-title">Velora Deploy</h3>
              <p className="catalog-subtitle">DevOps Deploy | A Easy UX Dashboard</p>
              <p className="catalog-desc">
                A clean DevOps deployment platform featuring one-click setup, project tracking, and an intuitive dashboard.
              </p>
            </div>
          </a>

          {/* Card 3 */}
          <a href="https://pack-explore.onrender.com/" target="_blank" rel="noopener noreferrer" className="catalog-card">
            <div className="catalog-img-wrapper">
              <span className="catalog-img-tag">Tourism</span>
              <img src={toursImg} alt="Pack &amp; Explore" className="catalog-img" />
            </div>
            
            <div className="catalog-body">
              <h3 className="catalog-title">Pack &amp; Explore</h3>
              <p className="catalog-subtitle">Tourism Booking Web Application</p>
              <p className="catalog-desc">
                A travel booking platform designed for exploring global tours, scheduling visits, and discovering destinations.
              </p>
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Projects;
