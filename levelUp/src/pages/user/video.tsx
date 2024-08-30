import React, { useEffect, useState, useRef } from 'react';
import UserHeader from '../../Usercomponents/userHeader';
import UserFooter from '../../Usercomponents/userFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { findVideo } from '../../Api/subject';

const VideoPlayer: React.FC = () => {
  const [video, setVideo] = useState<{ videoUrl: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const savedTime = localStorage.getItem('videoPlaybackPosition');
      if (videoRef.current && savedTime) {
        videoRef.current.currentTime = parseFloat(savedTime);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Save the playback position before unmounting the component
    return () => {
      if (videoRef.current) {
        const currentTime = videoRef.current.currentTime;
        localStorage.setItem('videoPlaybackPosition', currentTime.toString());
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [video]);

  const savePlaybackPosition = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      localStorage.setItem('videoPlaybackPosition', currentTime.toString());
    }
  };

  useEffect(() => {
    const checkForDevTools = () => {
      const threshold = 160; // Adjust based on testing
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);

      if (widthDiff > threshold || heightDiff > threshold) {
        alert('Developer tools detected!');
        if (videoRef.current) {
          videoRef.current.remove();
        }
        setVideo(null);
      }
    };

    checkForDevTools();
    window.addEventListener('resize', checkForDevTools);

    return () => {
      window.removeEventListener('resize', checkForDevTools);
    };
  }, []);

  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const handleSkip = () => {
    navigate(`/quiz/${levelId}`);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <UserHeader />
      <div className="min-h-screen bg-gray-900 p-4 mt-14 flex justify-center items-center">
        <div className="w-full max-w-6xl mx-auto relative">
          {video ? (
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  src={video.videoUrl}
                  onContextMenu={handleContextMenu}
                  onTimeUpdate={savePlaybackPosition}
                  className="w-full h-full max-h-[calc(100vh-200px)] md:max-h-[60vh] rounded-lg shadow-lg"
                ></video>
              </div>
              <button
                onClick={handleFullScreen}
                className="absolute top-2 right-2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition"
                aria-label="Full Screen"
              >
                ⛶
              </button>
            </div>
          ) : (
            <p className="text-white">Loading video...</p>
          )}
        </div>
        <button
          onClick={handleSkip}
          className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition"
        >
          Skip 
        </button>
      </div>
      <UserFooter />
    </div>
  );
};

export default VideoPlayer;
