import React, { useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import HeaderAdmin from '../../components/headerAdmin';
import { addQuiz } from '../../Api/subject';
import useGetAdmin from '../../hook/useGetAdmin';

const Quiz: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionTitle,setQuestionTitile]=useState('')
  const [question,setQuestion]=useState('')
  const [option1,setOption1]=useState('')
  const [option2,setOption2]=useState('')
  const [option3,setOption3]=useState('')
  const [option4,setOption4]=useState('')
  const {id}=useParams()
  const navigate = useNavigate()
  const currentuser = useGetAdmin();
  useEffect(() => {
      console.log(currentuser, 'current user');
      if (!currentuser) {
          navigate('/admin');
      }
  }, [currentuser, navigate]);
  const handleOptionChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
    
  };
  const handleSubmit=async(e)=>{
    try {
      e.preventDefault()
      console.log(selectedOption)
      const options = [option1, option2, option3, option4];
      const data:any = {};

      options.forEach((option, index) => {
        data[option] = `option${index + 1}` === selectedOption;
      });

console.log(data);
const res = await addQuiz(data,questionTitle,question,id)
console.log(res,"data")
if(res.succuss){
  navigate(-1)
}
    } catch (error) {
      
    }
  }

  return (
    <>
    <HeaderAdmin/>
    <div className="max-w-md mx-auto p-6 text-black bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="quiz-title">
            Quiz Title
          </label>
          <input
            type="text"
            id="quiz-title"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter quiz title"
            onChange={e=>setQuestionTitile(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="quiz-question">
            Question
          </label>
          <input
            type="text"
            id="quiz-question"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter question"
            onChange={e=>setQuestion(e.target.value)}

          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Answer Options
          </label>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option1"
              checked={selectedOption === 'option1'}
              onChange={() => handleOptionChange('option1')}
              className="mr-2"

              
            />
            <input
              type="text"
              id="option1-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 1"
              onChange={e=>setOption1(e.target.value)}

             required
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option2"
              checked={selectedOption === 'option2'}
              onChange={() => handleOptionChange('option2')}
              className="mr-2"
        
            />
            <input
              type="text"
              id="option2-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 2"
              required
              onChange={e=>setOption2(e.target.value)}

            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option3"
              checked={selectedOption === 'option3'}
              onChange={() => handleOptionChange('option3')}
              className="mr-2"
        
            />
            <input
              type="text"
              id="option3-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 3"
              onChange={e=>setOption3(e.target.value)}
            required
              
            />
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="option4"
              checked={selectedOption === 'option4'}
              onChange={() => handleOptionChange('option4')}
              className="mr-2"
              
            />
            <input
              type="text"
              id="option4-text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter option 4"
              required
            onChange={e=>setOption4(e.target.value)}

            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600"
        >
          Add Quiz
        </button>
      </form>
    </div>
    </>
  );
};

export default Quiz;
