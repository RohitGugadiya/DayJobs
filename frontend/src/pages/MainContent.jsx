import React, { useRef, useEffect, useState } from "react";
import "../CSS/MainContent.css";
import { useAuthStore } from "../store/userAuthStore"; 

function MainContent() {
  const { user } = useAuthStore();
  const jobCategories = ["IT & Tech", "Hospitality", "Retail", "Events"];
  

  const contentRef = useRef(null);
  
 
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1, 
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []); 


  const mainClass = `main-content ${isVisible ? 'animate-in' : ''}`;

  return (

    <div className="homepage-stage">
        

      <div className="illustrator-background graphic-layer-1"></div>
      <div className="illustrator-background graphic-layer-2"></div>
      

      <main className={mainClass} ref={contentRef}>
        <div className="content-wrapper">
          

          {user?.name && (
            <p className="welcome-msg">
              👋 Welcome back, <strong>{user.name}</strong>!
            </p>
          )}

          <h1 className="hero-title">
            Find Work. <span className="fast-text">Fast.</span>
          </h1>

          <p className="description">
            DayJobs connects you with short-term opportunities — perfect for flexible, one-day gigs that fit your schedule.
          </p>


          <div className="button-group">
            <button className="button-primary">Explore Jobs</button>
            <button className="button-outline">Post a Gig</button>
          </div>

          <div className="job-categories">
            <h3>Popular Categories</h3>
            <div className="categories-list">
              {jobCategories.map((cat) => (
                <a key={cat} href="#" className="category-tag">
                  {cat}
                </a>
              ))}
            </div>
          </div>


          <div className="stats">
            <div className="stat-card stat-1">
              <strong className="stat-number">24</strong>
              <p>Jobs posted today</p>
            </div>
            <div className="stat-card stat-2">
              <strong className="stat-number">68</strong>
              <p>Active gigs</p>
            </div>
            <div className="stat-card stat-3">
              <strong className="stat-number">12</strong>
              <p>New employers</p>
            </div>
          </div>
        </div>
      </main>
      

      <section className="scroll-section secondary-content">
        <h2>Flexible. Fast. Fulfilling.</h2>
        <p>The new way to manage your work life.</p>
      </section>
      
    </div>
  );
}

export default MainContent;