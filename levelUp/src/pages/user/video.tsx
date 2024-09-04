import React, { useEffect, useState, useRef } from 'react';
import UserHeader from '../../Usercomponents/userHeader';
import UserFooter from '../../Usercomponents/userFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { findVideo } from '../../Api/subject';
import ReactPlayer from 'react-player';

const VideoPlayer: React.FC = () => {
  const [video, setVideo] = useState<{ videoUrl: string; description: string } | null>(null);
  const playerRef = useRef<ReactPlayer>(null);
  const { levelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await findVideo(levelId);
        setVideo(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [levelId]);

  const savePlaybackPosition = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      localStorage.setItem('videoPlaybackPosition', currentTime.toString());
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      const savedTime = localStorage.getItem('videoPlaybackPosition');
      if (savedTime) {
        playerRef.current.seekTo(parseFloat(savedTime));
      }
    }
  }, [video]);

  const handleFullScreen = () => {
    if (playerRef.current) {
      const playerElement = playerRef.current.wrapper;
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      }
    }
  };

  const handleSkip = () => {
    navigate(`/quiz/${levelId}`);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Detect developer tools open event
  useEffect(() => {
    const handleDevToolsOpen = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        alert('Developer tools are opened!');
      }
    };

    const handleResize = () => {
      if (window.outerWidth - window.innerWidth > 100) {
        alert('Developer tools are opened!');
      }
    };

    window.addEventListener('keydown', handleDevToolsOpen);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleDevToolsOpen);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
    <UserHeader />
    <div className="min-h-screen bg-white p-4 mt-14 flex flex-col items-center">
      <div className="mx-auto relative">
        {video ? (
          <div className="relative rounded-lg shadow-lg bg-gray-100 overflow-hidden">
            <div className="aspect-w-full aspect-h-9">
              <ReactPlayer
                ref={playerRef}
                url={video.videoUrl}
                controls
                playing
                onContextMenu={handleContextMenu}
                onProgress={savePlaybackPosition}
                className="w-full h-full rounded-lg"
                onEnded={handleSkip}
              />
            </div>
          </div>
        ) : (
          <p className="text-black">Loading video...</p>
        )}
      </div>
      {video && (
        <div className="mt-8 w-full max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg text-black">
          <h2 className="text-2xl font-semibold mb-4">Video Description</h2>
          <p className="text-lg">{video.description}</p>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleSkip}
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition"
            >
              Skip to Quiz
            </button>
            <button
              onClick={handleFullScreen}
              className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400 transition"
            >
              Full Screen
            </button>
          </div>
        </div>
      )}
    </div>
    <UserFooter />
  </div>
  );
};

export default VideoPlayer;
