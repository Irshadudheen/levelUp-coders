import { useParams } from "react-router-dom";
import { problems } from "../utils/problems";
import { Problem } from "../utils/problems/types/problems";
import NotFound from "./notFound";
import CompilerUI from "./workSpace/compailer";
import React, { useState } from 'react'


const ProblemPage = () => {
 
  const { problem } = useParams();
  if(problem){
    
    const problemD= problems[problem];
    if(!problemData){
      //  {NotFound:true}
      console.log('not Found')
    }else{
      
      console.log(problemD)

    }
  }
console.log(problem)
  return (
    <div>
      {/* <CompilerUI problem={problemData}/> */}
    </div>
  )
}

export default ProblemPage;
export async function getStaticPaths() {
    const path = Object.keys(problems).map(key=>({
        params:{pid:key}
    }))
    return {
      path,
      fallback:false
    }
}

export async function getStaticProps({params}:{params:{pid:string}}) {
  const {pid}= params;
  const problem= problems[pid];
  if(!problem){
    return {NotFound:true}
  }
  return {
    props:{problem}
  }
  
}