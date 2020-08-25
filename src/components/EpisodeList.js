import React, { useState, useEffect } from "react";
import Episode from "./Episode";
import axios from "axios";
import "../styles/search.css";
import "../styles/episodelist.css";
function EpisodeList() {
  const initialSearchValue = "";
  const initialPageNo = 1;
  const initialError = "";
  const initialPages = 0;
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const [pageNo, setPageNo] = useState(initialPageNo);
  const [error, setError] = useState(initialError);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/episode?page=${pageNo}&name=${searchValue}`,
      )
      .then((res) => {
        console.log(pageNo);
        // setPageNo(initialPageNo);
        setPosts(res.data.results);
        setPages(res.data.info.pages);
      })
      .catch((err) => {
        // setError("No Match Found!");
        setPosts([]);
        setPages(initialPages);
        setError("No Match Found");
      });
  }, [pageNo, searchValue]);
  const arr = [];
  for (let i = 1; i <= pages; i++) arr.push(i);

  return (
    <div className="episodelist">
      <a href="" onClick={() => {}}>
        <h1>Rick & morthy</h1>
      </a>

      <form>
        <input
          type="text"
          placeholder="Seacrh Episode"
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPageNo(initialPageNo);
          }}
          className="searchbar"
        ></input>
      </form>
      {posts.map((post) => (
        <Episode key={post.id} post={post} />
      ))}
      {error}
      {arr.map((a) => (
        <button key={a} onClick={() => setPageNo(a)} className="pagination">
          {a}
        </button>
      ))}
    </div>
  );
}

export default EpisodeList;
