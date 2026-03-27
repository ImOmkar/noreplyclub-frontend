import { useEffect, useState, lazy, Suspense } from "react";
import Hero from "../components/Hero";
import StoryWall from "../components/StoryWall";
import Stats from "../components/Stats";
import SubmitModal from "../components/SubmitModal";
import API from "../lib/api";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const LIMIT = 5;


  
  const fetchStories = async (reset = false) => {
    setLoading(true)
    
    try{
      const res = await API.get(`/reports?limit=${LIMIT}&offset=${reset ? 0 : offset}`);
    
      const newData = res.data.data;
      const totalCount = res.data.total;
    
      setTotal(totalCount);
    
      if (reset) {
        setStories(newData);
        setOffset(LIMIT);
      } else {
        setStories((prev) => [...prev, ...newData]);
        setOffset((prev) => prev + LIMIT);
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  };



  useEffect(() => {
    fetchStories(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("openModal") === "true") {
      setOpen(true)
      // remove query param after opening
      window.history.replaceState({}, document.title, "/")
    }
  }, [location.search]);

  return (
    <div>
      <Hero onOpenModal={() => setOpen(true)} />
      <StoryWall stories={stories} onLoadMore={() => fetchStories()} loading={loading} total={total} />
      <Stats />
      <SubmitModal
        open={open}
        setOpen={setOpen}
        onSuccess={(newStory) => {
          setStories((prev) => [newStory, ...prev]);
          setTimeout(fetchStories, 500);
        }}
      />
    </div>
  );
}