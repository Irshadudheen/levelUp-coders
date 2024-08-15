import React, { useEffect, useState, useRef } from 'react';
import UserHeader from '../../components/userHeader';
import UserFooter from '../../components/userFooter';
import { useParams } from 'react-router-dom';
import { findVideo } from '../../Api/subject';

const VideoPlayer: React.FC = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<{ videoUrl: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await findVideo(id);
        setVideo(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, [id]);

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
    if (videoRef.current) {
      // Skip 10 seconds ahead, or to the end if less than 10 seconds remain
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, videoRef.current.duration);
    }
  };

  return (
    <>
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
    </>
  );
};

export default VideoPlayer;
