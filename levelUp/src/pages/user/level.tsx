import { useEffect, useState } from "react";
import { getLevel } from "../../Api/subject";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../components/userHeader";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
const ImageGrid: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [level, setLevel] = useState([]);

  useEffect(() => {
    const fetchLevel = async () => {
      const res = await getLevel(id as string);
      console.log(res);
      setLevel(res.data);
    };
    fetchLevel();
  }, [id]);

  return (
    <>
      <UserHeader />
      <div className="min-h-screen bg-gray-900 p-4 mt-14">
        <div className="max-w-6xl mx-auto">
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {level.map((level, index) => (
      <div
        key={index}
        onClick={() =>level.premium?navigate('/premium'): navigate(`/video/${level._id}`)}
        className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center border border-gray-700"
      >
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">
          <div className="text-xl font-bold mb-2 text-blue-300">
            {index + 1}
          </div>
        </div>
        <p className="text-sm text-center mb-2 text-gray-300">
          {level.name}
        </p>
        <div className="w-full flex justify-between items-center">
          {level.completed && <div className="text-green-400">✓</div>}
          {level.stars && (
            <div className="text-yellow-300">{'★'.repeat(level.stars)}</div>
          )}
          {level.premium && (
            <div className="flex items-center ml-auto text-right">
              <WorkspacePremiumIcon className="text-gray-400" />
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </>
  );
};

export default ImageGrid;
