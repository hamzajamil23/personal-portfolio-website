import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const textRefs = useRef([]);
  
  useEffect(() => {
    gsap.fromTo(".about-title",
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
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.from(textRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" ref={aboutRef}>
      <div className="section-header">
        <span className="section-title about-title">About Me</span>
      </div>
      
      <div className="about-content">
        <div className="about-description">
          <p ref={el => textRefs.current[0] = el}>
              Hi, my name is Hamza Jamil. I'm a mechanical engineering graduate who transitioned into data science out of a passion for analytics and problem solving. My journey began in 2022 when I realized how data could uncover insights that drive real decisions—and that clicked with me instantly.
          </p>
          
          <p ref={el => textRefs.current[1] = el}>
             Since then, I have earned a Data Science and AI certificate from the Boston Institute of Analytics and built a strong foundation in <span className="highlight">SQL, Tableau, and Python</span>.   For me, data analysis feels like playing detective—piecing together clues from numbers to reveal the bigger picture.
          </p>
          
          <p ref={el => textRefs.current[2] = el}>
            After completing my BS in Mechanical Engineering from UMT, I began my professional journey as an intern at Dominar Engineers, a channel partner of KSB Pumps. Within two months, I was hired as a Sales Engineer and successfully closed over 25 million PKR in industrial pump sales across Punjab and northern Pakistan. While working full-time, I nurtured a growing interest in analytics and automation. In early 2024, I formally enrolled in a Data Science and AI certification program at the Boston Institute of Analytics, where I developed hands-on skills in Python, machine learning, and building real-world applications. This marked the turning point where I fully committed to transitioning into the data science field.
          </p>
          
          <p ref={el => textRefs.current[3] = el}>
          Outside of work, I’m passionate about brewing great coffee, baking, and watching movies. I also enjoy exploring new technologies, staying curious, and continuously learning. This often involves coding, building personal projects, or diving into a rabbit hole after reading something that sparks a newfound interest.
          </p>
          
        </div>
        <p className="about-timeline-link" ref={el => textRefs.current[5] = el}>
          <a href="#timeline">
            <span role="img" aria-label="timeline">🗺️</span> 
            View my <span className="about-timeline-highlight">timeline</span> — from selling industrial equipment, to finally switching gears into the constantly evolving domain of Data Science &rarr;
          </a>
        </p>     
        <div className="about-actions" ref={el => textRefs.current[6] = el}>
          <a href="/assets/resume.pdf" className="resume-button btn-effect" target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;