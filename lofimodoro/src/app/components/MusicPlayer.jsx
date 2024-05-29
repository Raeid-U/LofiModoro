// /components/MusicPlayer.jsx
import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const MusicPlayer = () => {
  const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with actual Spotify access token

  return (
    <div className="music-player mt-4">
      <SpotifyPlayer
        token={token}
        uris={['spotify:playlist:YOUR_LOFI_PLAYLIST_ID']} // Replace with your Spotify playlist URI
        autoPlay={true}
        showSaveIcon
        styles={{
          activeColor: '#1db954',
          bgColor: '#333',
          color: '#fff',
          loaderColor: '#fff',
          sliderColor: '#1db954',
          trackArtistColor: '#ccc',
          trackNameColor: '#fff',
        }}
      />
    </div>
  );
};

export default MusicPlayer;
