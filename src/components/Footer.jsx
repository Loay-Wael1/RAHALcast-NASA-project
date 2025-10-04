import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RAHLA Cast</h3>
            <p>
              Plan your outdoor adventures with confidence using NASA's Earth
              observation data.
            </p>
          </div>

          <div className="footer-section">
            <h4>Challenge</h4>
            <p>
              NASA Space Apps Challenge 2025
              <br />
              "Will It Rain on My Parade?"
            </p>
          </div>

          <div className="footer-section">
            <h4>Technology</h4>
            <p>
              Powered by NASA GES DISC, Earthdata, Giovanni, and Worldview
              platforms
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 RAHLA Cast Team. Built for NASA Space Apps Challenge.
          </p>
        </div>
      </div>
    </footer>
  );
}
