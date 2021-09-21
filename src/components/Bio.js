import React from "react";
import profilePic from "../assets/profile-pic.png";
import { rhythm } from "../utils/typography";

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          marginBottom: rhythm(2)
        }}
      >
        <p style={{ maxWidth: 310 }}>A blog explain with words and code.</p>
      </div>
    );
  }
}

export default Bio;
