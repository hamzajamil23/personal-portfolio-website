import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/Experience.css";

const experienceItems = {
  "Turing": {
    jobTitle: "Business Analyst @",
    duration: "Oct 2024 - Present",
    desc: [
      "Build and curate high-quality datasets to support LLM training and evaluation pipelines.",
      "Work with ML engineers to improve model quality through fine-tuning techniques such as SFT, DPO, and RLHF.",
      "Analyze model outputs to provide feedback and assist in creating data-driven prompts and performance reports."
    ]
  },
  "Boston Institute of Analytics": {
    jobTitle: "Data Science Trainee @",
    duration: "Jan 2024 - May 2024",
    desc: [
      "Completed certification in Data Science and AI, covering Python, NumPy, Pandas, scikit-learn, and Streamlit.",
      "Developed and deployed a fuel price prediction model as a capstone project using supervised ML techniques.",
      "Gained hands-on experience with preprocessing, model evaluation, and web app deployment."
    ]
  },
  "Dominar Engineers (KSB Pumps)": {
    jobTitle: "Sales Engineer @",
    duration: "Oct 2023 - Jun 2024",
    desc: [
      "Managed pump sales across Punjab and the northern region for Dominar Engineers, a channel partner of KSB Pumps Pakistan.",
      "Achieved over PKR 25 million in sales within 9 months by identifying high-value opportunities and maintaining key client relationships.",
      "Provided technical consultation on pump sizing, selection, and application engineering for industrial clients."
    ]
  }
};

const JobList = () => {
  const [value, setValue] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(window.innerWidth < 600);
  const keys = Object.keys(experienceItems);
  
  const contentRef = useRef(null);
  const listsRef = useRef({});
  const oldValueRef = useRef(value);
  
  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth < 600);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleTabChange = (index) => {
    const oldIndex = oldValueRef.current;
    
    if (oldIndex === index) return;
    
    oldValueRef.current = index;
    
    const currentPanel = document.querySelector('.joblist-panel');
    
    if (currentPanel) {
      gsap.to(currentPanel, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setValue(index);
          animateJobDetails();
          
          const newPanel = contentRef.current.querySelector(`.joblist-panel:nth-child(${index + 1})`);
          if (newPanel) {
            gsap.fromTo(newPanel, { opacity: 0 }, { opacity: 1, duration: 0.3 });
          }
        }
      });
    } else {
      setValue(index);
      animateJobDetails();
    }
  };
  
  const animateJobDetails = () => {
    const listItems = contentRef.current?.querySelectorAll('.job-description li');
    
    if (listItems?.length) {
      gsap.set(listItems, { opacity: 0, x: 20 });
      
      gsap.to(listItems, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out"
      });
    }
  };
  
  useEffect(() => {
    animateJobDetails();
  }, []);
  
  return (
    <div className={`joblist-root ${isHorizontal ? "horizontal" : "vertical"}`}>
      <div className={`joblist-tabs ${isHorizontal ? "horizontal" : "vertical"}`}>
        {keys.map((key, i) => (
          <button
            key={key}
            className={`joblist-tab${value === i ? " active" : ""}`}
            onClick={() => handleTabChange(i)}
          >
            {isHorizontal ? `0${i+1}.` : key}
          </button>
        ))}
      </div>
      
      <div className="joblist-content" ref={contentRef}>
        {keys.map((key, i) =>
          value === i ? (
            <div key={key} className="joblist-panel">
              <span className="joblist-job-title">
                {experienceItems[key]["jobTitle"] + " "}
              </span>
              <span className="joblist-job-company">{key}</span>
              <div className="joblist-duration">
                {experienceItems[key]["duration"]}
              </div>
              <ul className="job-description">
                {experienceItems[key]["desc"].map((descItem, j) => (
                  <li key={j}>{descItem}</li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default JobList;