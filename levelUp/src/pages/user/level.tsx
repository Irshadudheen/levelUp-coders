import { useEffect, useState } from "react";
import { getLevel, getSubject } from "../../Api/subject";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../Usercomponents/userHeader";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const ImageGrid: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [level, setLevel] = useState([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchLevel = async () => {
      const res: any = await getLevel(id as string);
      const subject = await getSubject(id as string);
      console.log(subject)
      setCourse(subject);
      setLevel(res.data);
    };
    fetchLevel();
  }, [id]);
  // console.clear()

  return (
    <>
      <UserHeader />
      <div className="w-full h-1/3 flex items-center justify-center">
        <div className="flex w-full h-full mt-14 bg-gradient-to-b from-[#5B5032] to-[#1E1A11]">

          <div className="flex flex-col items-center justify-center p-8 w-1/2">
            <p className=" text-lg text-left ml-10">
              {course.description}
            </p>
            <h1 className="font-bold text-4xl text-left">{course.name}</h1>
          </div>

          <div className="flex items-center justify-center w-1/2">
            <div className="w-[400px] h-[300px] ">
              <img src={course.image} className="w-full h-full object-cover" alt="Course Image" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 mr-8">
      </div>
      <div className="h-full bg-white w-full p-4 mt-14">
        <div className="max-w-6xl mx-auto mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {level.map((level, index) => (
              <div
                key={index}
                onClick={() =>
                  level.premium ? navigate('/premium') : navigate(`/video/${level._id}`)
                }
                className="bg-gray-100 rounded-lg shadow-lg p-4 border border-gray-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold text-black">
                      {index + 1}
                    </div>
                    <p className="ml-4 text-sm font-semibold text-gray-700">{level.name}</p>
                  </div>
                  {level.premium && (
                    <WorkspacePremiumIcon className="text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="text-green-600">✓ Completed</div>
                  <div className="text-yellow-500">
                    {'★'.repeat(level.rating || 0)}
                  </div>
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
