import React from "react";
import { Routes, Route } from "react-router-dom";
import ChapterOne from "../modules/chapter-1/ChapterOne";

export default function BaseRoute() {
  return (
    <React.Suspense>
      <Routes>
        <Route index element={<ChapterOne />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </React.Suspense>
  );
}

// const Home = () => {
//   return <h3>Woiii Ini Home loo...</h3>;
// };

const Home = () => {
    return (
        <div style={{ backgroundColor: '#daeaf6', padding: '10px', borderRadius: '10px', color: 'black', maxWidth: '1810px', margin: '0 auto' }}>
            <h3>Woiii Ini Home loo Barudaksss...</h3>
        </div>
    );
};