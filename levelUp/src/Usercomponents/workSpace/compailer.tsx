import React, { useEffect, useState } from 'react';

import Split from "react-split";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import ProblemDescription from './problemDescription';
import Playground from './playground';
import { useParams } from 'react-router-dom';
import { problems } from '../../utils/problems';

const CompilerUI: React.FC= () => {
  const [problemData,setProblem]=useState({})
  const { problem } = useParams();
  useEffect(()=>{

    if(problem){
      
      console.log(problem,'problem in compiler')
      const result= problems[problem];
      if(result){
        setProblem(result)
        console.log(result)
      }
      
    }
  })


const[succuss,setSuccess]=useState(false)

  return (
<>
  <div className="flex items-center justify-center m-0 h-screen"> {/* Use h-screen to ensure it takes the full height */}
       {succuss&& <Confetti gravity={0.3}
        tweenDuration={4000}
        />}
       
    <div className="w-full h-full bg-dark-layer-1 flex flex-col"> {/* Add flex and flex-col to control the layout */}
      <Split className="split" minSize={0}>
        <ProblemDescription problem={problemData} />
        <Playground problem={problemData} setSuccess={setSuccess}/>
      </Split>
    </div>
  </div>
</>
  );
};

export default CompilerUI;
