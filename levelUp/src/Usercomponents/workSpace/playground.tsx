import React, { useState, useEffect } from 'react';
import PrevefrenceNav from './prevefrenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { toast } from 'react-toastify';
import EditorFooter from './EditorFooter';
import { problems } from '../../utils/problems';
import { useNavigate, useParams } from 'react-router-dom';
import { completeLevel } from '../../Api/subject';
import { useGetUserData } from '../../hook/useGetUser';

type ProblemDescriptionProps = {
    problem: {
        starterFunctionName:string;
        starterCode:string;
        title: string;
        problemStatement: string;
        examples: Array<{
            id: string;
            inputText: string;
            outputText: string;
            explanation?: string;
        }>;
        constraints: string;
    };
};

const Playground: React.FC<ProblemDescriptionProps> = ({ problem,setSuccess }) => {
    const [activeTestCaseId, setActiveTestCaseId] = useState(0);
    const [alertShown, setAlertShown] = useState(false); // State to track if alert has been shown
    let [userCode,setUserCode]=useState(problem.starterCode)
    const {problemId,levelId}=useParams()
    const user = useGetUserData()
    const navigate = useNavigate()
    const handleSubmit =async()=>{
        try {
            userCode=userCode.slice(userCode.indexOf(problem.starterFunctionName))
            const cb = new Function(`return ${userCode}`)();
            
            const result = problems[problemId as string].handlerFunction(cb)
            if(result){
                toast.success('Congrats! All test passes',{
                    position:'top-center',
                    autoClose:3000,
                    theme:'dark'

                })
                setSuccess(true)
                console.clear()
               const res = await completeLevel(levelId as string,user.id)
               console.log(res)
                setTimeout(()=>{setSuccess(false)
                   const subjectId= localStorage.getItem('subjectId')
                    navigate(`/level/${subjectId}`)
                },3000)

            }
       } catch (error:any) {
        toast.error('Opss! One or more test cases failed',{
            position:'top-center',
            autoClose:3000,
            theme:'dark'
        })
       }
    }

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && !alertShown) {
                toast.error(`Please stay on this tab! Don't cheat!`,{
                    position:'top-center',
                    autoClose:4000,
                    theme:'dark'
                })
                // alert("Please stay on this tab! Don't cheat!");
                // setAlertShown(true); // Set alertShown to true after showing the alert
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [alertShown]);
    const onchange=(value:string)=>{
       setUserCode(value)
    }

    return (
        <div className='flex flex-col bg-dark-layer-1 relative mb-3'>
            <PrevefrenceNav />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror
                        value={problem.starterCode}
                        theme={vscodeDark}
                        onChange={onchange}
                        onPaste={() => toast.error("Don't cheat!")}
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
                <div className="w-full px-5  overflow-auto">
                    {/* testcase heading */}
                    <div className="flex h-10 items-center space-x-6">
                        <div className="relative flex h-full flex-col justify-center cursor-pointer">
                            <div className="text-sm font-medium leading-5 text-white">
                                Testcases
                            </div>
                            <hr className="absolute bottom-0 h-0.5 w-full border-none bg-white" />
                        </div>
                    </div>
                    <div className="flex">
                        {/* case-1 */}
                        {problem.examples && problem.examples.map((example, index) => (
                            <div className="mr-2 items-start mt-2 text-white" key={example.id}
                            onClick={()=>setActiveTestCaseId(index)}>
                                <div className="flex flex-wrap items-center gap-y-4 ">
                                    <div className={`${index===activeTestCaseId?'text-white':'text-gray-400'} font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-layer-2 py-1 cursor-pointer whitespace-nowrap rounded-lg px-4 relative`}>
                                        Case {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="font-semibold my-4">
                        <p className="text-sm font-medium mt-4 text-white">Input:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            {problem.examples&&problem.examples[activeTestCaseId].inputText}
                        </div>
                        <p className="text-sm font-medium mt-4 text-white">Output:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        {problem.examples&&problem.examples[activeTestCaseId].outputText}
                        </div>
            <EditorFooter handleSubmit={handleSubmit}/>
                    </div>
                </div>
            </Split>
        </div>
    );
}

export default Playground;
