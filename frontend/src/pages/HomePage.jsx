import HomeNav from "../components/NavBar";
import "../CSS/HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      {/* Fixed Top Navbar */}
      <header className="header">
        <HomeNav />
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <h1>
            Find Work. <span>Fast.</span>
          </h1>

          <p>
            DayJobs connects you with short-term opportunities — perfect for flexible, one-day gigs that fit your schedule.
          </p>

          <div className="button-group">
            <button className="button-primary">Explore Jobs</button>
            <button className="button-outline">Post a Gig</button>
          </div>
        </div>
      </main>
  
      <footer className="footer">
        © {new Date().getFullYear()} DayJobs — All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
