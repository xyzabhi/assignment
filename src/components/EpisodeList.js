import React, { useState, useEffect } from "react";
import Episode from "./Episode";
import axios from "axios";
import "../styles/search.css";
import "../styles/episodelist.css";
const initialPage = 1;
const initailEndPoint = "page";
function EpisodeList() {
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState();
  const [pageNo, setPageNo] = useState(initialPage);
  const [endpoint, setEndPoint] = useState("page");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode?${endpoint}=${pageNo}`)
      .then((res) => {
        console.log(res.data.results);
        setPosts(res.data.results);
        setPages(res.data.info.pages);
      })
      .catch((err) => {
        setError("No Match Found");
        setPosts([]);
      });
  }, [pageNo]);
  const arr = [];
  for (let i = 1; i <= pages; i++) arr.push(i);

  return (
    <div className="episodelist">
      <a
        href=""
        onClick={() => {
          setPageNo(initialPage);
          setEndPoint(initailEndPoint);
        }}
      >
        <h1>Rick & morthy</h1>
      </a>

      <form>
        <input
          type="text"
          placeholder="Seacrh Episode"
          onChange={(e) => {
            setEndPoint("name");
            setPageNo(e.target.value);
          }}
          className="searchbar"
        ></input>
      </form>
      {posts.map((post) => (
        <Episode key={post.id} post={post} />
      ))}
      {arr.map((a) => (
        <button key={a} onClick={() => setPageNo(a)} className="pagination">
          {a}
        </button>
      ))}
      <p className="errormsg">{error}</p>
    </div>
  );
}

export default EpisodeList;
