import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Contact() {
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: null });

    const formData = new FormData(e.target);

    try {
      const response = await fetch("https://formsubmit.co/ajax/vrushali.devlekar@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        setStatus({ submitting: false, success: true, error: null });
        e.target.reset();
      } else {
        setStatus({
          submitting: false,
          success: false,
          error: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: "Network error. Please check your connection and try again.",
      });
    }
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
            {status.success ? (
              <div className="contact-success-state">
                <div className="success-icon-box">
                  <i className="ri-checkbox-circle-line"></i>
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out! Your message has been sent successfully. I will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus({ submitting: false, success: false, error: null })}
                  className="btn reset-btn"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input name="name" type="text" placeholder="Alex Morgan" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input name="email" type="email" placeholder="alex@company.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <select name="subject" required defaultValue="">
                    <option value="" disabled>Select an option…</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Full-time Opportunity">Full-time Opportunity</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Just saying hi">Just saying hi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" placeholder="Tell me about your project, timeline, and budget…" required></textarea>
                </div>

                {status.error && (
                  <div className="contact-error-msg">
                    <i className="ri-error-warning-line"></i> {status.error}
                  </div>
                )}

                <div className="form-submit">
                  <span className="privacy-note">Your details remain private.</span>
                  <button type="submit" className="btn submit-btn" disabled={status.submitting}>
                    {status.submitting ? (
                      <>
                        Sending... <i className="ri-loader-4-line ri-spin"></i>
                      </>
                    ) : (
                      <>
                        Send Message <i className="ri-arrow-right-line"></i>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
