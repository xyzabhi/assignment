import React from "react";
import "../styles/episode.css";
function Episode({ post }) {
  const { name, air_date, episode } = post;
  return (
    <div className="episode">
      <h1>{name}</h1>
      <p>{episode}</p>
      <p>{air_date}</p>
    </div>
  );
}

export default Episode;
