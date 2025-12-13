import { Target, Lightbulb, Users, Award } from "lucide-react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>ABOUT US</h1>
        <p>Creating legendary gaming experiences since 2024</p>
      </div>

      <div className="about-container">
        <section className="about-intro">
          <h2>WHO WE ARE</h2>
          <p>
            Game Studio is a premier game development company dedicated to
            creating unforgettable gaming experiences. With a passion for
            innovation and excellence, we craft games that push the boundaries
            of interactive entertainment. Our team of talented developers,
            artists, and designers work tirelessly to deliver games that
            captivate players around the world.
          </p>
        </section>

        <section className="values-section">
          <h2>OUR VALUES</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Target size={40} />
              </div>
              <h3>Excellence</h3>
              <p>
                We strive for perfection in every pixel, every line of code, and
                every gaming experience we create. Quality is our top priority.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Lightbulb size={40} />
              </div>
              <h3>Innovation</h3>
              <p>
                We push the boundaries of gaming technology and design,
                constantly exploring new ways to entertain and engage our
                players.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Users size={40} />
              </div>
              <h3>Community</h3>
              <p>
                Our players are at the heart of everything we do. We listen,
                engage, and build games that our community truly loves.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Award size={40} />
              </div>
              <h3>Passion</h3>
              <p>
                We're gamers ourselves, and we pour our love for gaming into
                every project we undertake. Gaming is not just our job, it's our
                passion.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>MEET THE TEAM</h2>
          <div className="team-grid">
            <div className="team-card">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team member"
              />
              <h3>Alex Johnson</h3>
              <p className="team-role">CEO & Founder</p>
              <p className="team-bio">
                Veteran game developer with 15+ years of experience creating
                blockbuster titles
              </p>
            </div>
            <div className="team-card">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team member"
              />
              <h3>Sarah Chen</h3>
              <p className="team-role">Creative Director</p>
              <p className="team-bio">
                Award-winning designer known for creating visually stunning game
                worlds
              </p>
            </div>
            <div className="team-card">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team member"
              />
              <h3>Michael Torres</h3>
              <p className="team-role">Lead Developer</p>
              <p className="team-bio">
                Technical genius who brings innovative gameplay mechanics to
                life
              </p>
            </div>
            <div className="team-card">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Team member"
              />
              <h3>Emma Wilson</h3>
              <p className="team-role">Community Manager</p>
              <p className="team-bio">
                Building and nurturing our amazing gaming community worldwide
              </p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>BY THE NUMBERS</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>50+</h3>
              <p>Games Published</p>
            </div>
            <div className="stat-box">
              <h3>10M+</h3>
              <p>Active Players</p>
            </div>
            <div className="stat-box">
              <h3>25+</h3>
              <p>Industry Awards</p>
            </div>
            <div className="stat-box">
              <h3>150+</h3>
              <p>Team Members</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>GET IN TOUCH</h2>
          <p>
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <h4>Email</h4>
              <p>contact@gamestudio.com</p>
            </div>
            <div className="contact-item">
              <h4>Location</h4>
              <p>San Francisco, CA 94102</p>
            </div>
            <div className="contact-item">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
