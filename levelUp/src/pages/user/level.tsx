import { useEffect, useState } from "react";
import { getLevel } from "../../Api/subject";
import { useParams } from "react-router-dom";
import UserHeader from "../../components/userHeader";



const ImageGrid:React.FC = () => {
 const {id}=useParams()
 const [level, setLevel] = useState([])
  useEffect(()=>{
    const fetchLevel= async ()=>{
      const res = await getLevel(id as string)
      console.log(res)
      setLevel(res.data)
    }
    fetchLevel()
  },[])
 
  return (<>
  <UserHeader/>
    <div className="min-h-screen bg-gray-900 p-4">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {level.map((level, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center border border-gray-700">
          <div className="text-xl font-bold mb-2 text-blue-300">{index + 1}</div>
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2">
            <img src={level.image} alt="" className="w-8 h-8" />
          </div>
          <p className="text-sm text-center mb-2 text-gray-300">{level.name}</p>
          {level.completed && <div className="text-green-400">✓</div>}
          {level.stars && (
            <div className="text-yellow-300">
              {'★'.repeat(level.stars)}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
      </>
  );
};

export default ImageGrid;
