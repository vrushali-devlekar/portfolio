import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit logic here if needed
  };

  return (
    <>
      <Navbar />

      <section className="contact-page-section">
        <div className="contact-container">
          <div className="contact-left">
            <span className="mini">GET IN TOUCH</span>
            <h2 className="editorial-contact-title">
              LET'S BUILD<br />
              SOMETHING<br />
              <em>TOGETHER</em>
            </h2>
            {/* <p>
              Whether you have a fully scoped product or a rough idea, I would love to hear from you. Let's figure out what is possible.
            </p> */}

            <div className="contact-details">
              <a href="mailto:vrushali.devlekar@gmail.com" className="contact-link-row">
                <i className="ri-mail-line"></i>
                <span>vrushali.devlekar@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/vrushali-devlekar/" target="_blank" rel="noopener noreferrer" className="contact-link-row">
                <i className="ri-linkedin-box-fill"></i>
                <span>linkedin.com/in/vrushali-devlekar</span>
              </a>
              <a href="https://github.com/vrushali-devlekar" target="_blank" rel="noopener noreferrer" className="contact-link-row">
                <i className="ri-github-fill"></i>
                <span>github.com/vrushali-devlekar</span>
              </a>
              <div className="contact-link-row">
                <i className="ri-map-pin-line"></i>
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Alex Morgan" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="alex@company.com" required />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select required defaultValue="">
                  <option value="" disabled>Select an option…</option>
                  <option value="Freelance Project">Freelance Project</option>
                  <option value="Full-time Opportunity">Full-time Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Just saying hi">Just saying hi</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea placeholder="Tell me about your project, timeline, and budget…" required></textarea>
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

export default Contact;
