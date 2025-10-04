// components/MusicPlayer.jsx
"use client";
import React from "react";

export default function MusicPlayer() {
  return (
    <div className="music-player">
      <iframe
        className="spotify-embed"
        style={{ borderRadius: 12 }}
        src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
        width="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </div>
  );
}
