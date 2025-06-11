import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FcGraduationCap, FcIdea, FcBriefcase, FcGoogle, FcAcceptDatabase, FcStatistics } from "react-icons/fc";
import "../styles/Timeline.css";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "Bachelors from UMT",
    description: "Completed my BS in Mechanical Engineering from the University of Management and Technology (UMT), laying a strong technical foundation and a curiosity for problem-solving.",
    year: "Sep 2019 - Aug 2023",
    type: "education"
  },
  {
    title: "Internship at Dominar Engineers (KSB Pumps)",
    description: "Joined Dominar Engineers, a channel partner of KSB Pumps, as a Sales Engineer Intern. Gained exposure to industrial pumping systems and the sales process in large-scale engineering projects.",
    year: "Sep 2023 - Oct 2023",
    type: "startup"
  },
  {
    title: "Sales Engineer at Dominar Engineers",
    description: "Promoted to Sales Engineer and managed industrial pump sales across Punjab and northern Pakistan. Closed over 25 million PKR in sales within 9 months.",
    year: "Oct 2023 - Jun 2024",
    type: "career"
  },
  {
    title: "Exploring Machine Learning and AI",
    description: "Discovered machine learning during my undergrad, but my curiosity deepened when I encountered ChatGPT 3.0 in my third year. This sparked a long-term interest in data and AI.",
    year: "2022 - 2024",
    type: "career"
  },
  {
    title: "Started Data Science and AI Certification (BIA)",
    description: "Enrolled in the Data Science and AI Certificate Program at the Boston Institute of Analytics to formally pivot toward data-driven problem solving using Python, Pandas, scikit-learn, and Streamlit.",
    year: "Jan 2024 - Aug 2024",
    type: "education"
  },
  {
    title: "Capstone Project: Fuel Price Predictor",
    description: "Built a machine learning model using scikit-learn to predict fuel prices. Deployed the solution via a Streamlit web app. This marked my first full-cycle data project from preprocessing to deployment.",
    year: "May 2024 - Jun 2024",
    type: "project",
    learnMoreLink: "#projects",
    learnMoreText: "View Projects"
  },
  {
    title: "Business Analyst at Turing",
    description: "Joined Turing as a Business Analyst, where I currently work on building datasets for model training and applying advanced model fine-tuning techniques such as SFT, DPO, and RLHF to improve LLM performance. This role sits at the intersection of data, language models, and product insights.",
    year: "Oct 2024 - Present",
    type: "statistics",
    learnMoreLink: "#experience",
    learnMoreText: "View Experience" 
  }
];

export default function Timeline() {
  const timelineWrapRef = useRef(null);
  const timelineItemsRef = useRef([]);
  
  useEffect(() => {
    timelineItemsRef.current = timelineItemsRef.current.filter(Boolean);
    
    const ctx = gsap.context(() => {
      gsap.fromTo("#timeline .section-title", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#timeline .section-title",
            start: "top 90%",
            toggleActions: "restart none none reverse" 
          }
        }
      );
      
      gsap.fromTo("#timeline-progress-line", 
        { height: "0%" },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: timelineWrapRef.current,
            start: "top 70%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );
      
      timelineItemsRef.current.forEach((item, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        const date = item.querySelector('.timeline-date');
        
        const itemTl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%", 
            toggleActions: "restart none none reverse"
          }
        });
        
        itemTl.fromTo(content,
          { x: direction * 100, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "power2.out" 
          }
        ).fromTo(dot,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.3,
            ease: "back.out(1.7)" 
          },
          "-=0.3" 
        ).fromTo(date,
          { opacity: 0, y: 10 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.3,
            ease: "power2.out" 
          },
          "-=0.2"
        );
      });
    });
    
    return () => ctx.revert();
  }, []);

  const renderIcon = (type) => {
    switch (type) {
      case 'education': return <FcGraduationCap className="timeline-icon" />;
      case 'startup': return <FcIdea className="timeline-icon" />;
      case 'career': return <FcBriefcase className="timeline-icon" />;
      case 'google': return <FcGoogle className="timeline-icon" />;
      case 'project': return <FcAcceptDatabase className="timeline-icon" />;
      case 'statistics': return <FcStatistics className="timeline-icon" />;
      default: return null;
    }
  };

  return (
    <div id="timeline">
      <div className="section-header">
        <span className="section-title">My Journey to Data</span>
      </div>
      
      <div className="timeline-wrapper" ref={timelineWrapRef}>
        <div className="timeline-progress">
          <div id="timeline-progress-line"></div>
        </div>
        
        <div className="timeline-items">
          {milestones.map((item, idx) => (
            <div 
              key={idx} 
              className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
              ref={el => timelineItemsRef.current[idx] = el}
            >
              <div className="timeline-dot">
                {renderIcon(item.type)}
              </div>
              
              <div className="timeline-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                
                <div className="timeline-actions">
                  {item.certificateUrl && (
                    <a href={item.certificateUrl} className="timeline-link" target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  )}
                  
                  {item.learnMoreLink && (
                    <a href={item.learnMoreLink} className="timeline-link">
                      {item.learnMoreText}
                    </a>
                  )}
                </div>
              </div>
              <span className="timeline-date">{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}