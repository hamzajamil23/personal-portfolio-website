import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import SideNavBar from "./SideNavBar";
class Credits extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    return (
      <FadeInSection>
        <div id="credits">
          <div className="ending-credits">
             <SideNavBar />
            <a href="https://github.com/rafsanahmed28/rafsan"
               target="_blank"
               rel="noopener noreferrer">
                Designed & Built by Rafsan Ahmed © 2025
              </a>
          </div>
        </div>
      </FadeInSection>
    );
  }
}

export default Credits;
