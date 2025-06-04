import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import JobList from "./JobList";
import "../styles/Experience.css";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [activeKey, setActiveKey] = useState("1");
  const experienceRef = useRef(null);
  const contentRef = useRef(null);
  
  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };
  
  useEffect(() => {
    console.log("Experience component mounted");
    
    gsap.fromTo(".experience-title",
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.fromTo(contentRef.current,
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="experience" ref={experienceRef}>
      <div className="section-header">
        <span className="section-title experience-title">Experience</span>
      </div>
      
      <div className="experience-content" ref={contentRef}>
      <div className="experience-bg-elements">
            <div className="experience-circle"></div>
            <div className="experience-square"></div>
          </div>
        <JobList 
          activeKey={activeKey} 
          handleSelect={handleSelect}
        />
      </div>
    </section>
  );
};

export default Experience;