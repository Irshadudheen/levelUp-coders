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
                onClick={() =>
                  level.premium ? navigate('/premium') : navigate(`/video/${level._id}`)
                }
                className="bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-700 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-xl font-bold text-blue-300">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-sm font-semibold text-gray-300">{level.name}</p>
                  </div>
                  {level.premium && (
                    <WorkspacePremiumIcon className="text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  {level.completed && <div className="text-green-400">✓ Completed</div>}
                  {true && (
                    <div className="text-yellow-300">
                      {'★'.repeat()}
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
