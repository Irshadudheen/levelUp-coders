import React, { useState, useEffect } from 'react';
import PrevefrenceNav from './prevefrenceNav';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { toast } from 'react-toastify';

const Playground = () => {
    const [val, setVal] = useState('let nu');

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("Please stay on this tab! Don't cheat!");
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
    }, []);

    return (
        <div className='flex flex-col bg-dark-layer-1 relative'>
            <PrevefrenceNav />
            <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
                <div className="w-full overflow-auto">
                    <CodeMirror
                        value={val}
                        theme={vscodeDark}
                        onPaste={() => toast.error("Don't cheat!")}
                        extensions={[javascript()]}
                        style={{ fontSize: 16 }}
                    />
                </div>
                <div className="w-full px-5 overflow-auto">
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
                        <div className="mr-2 items-start mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4 ">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-layer-2 py-1 cursor-pointer whitespace-nowrap rounded-lg px-4 relative">
                                    Case 1
                                </div>
                            </div>
                        </div>

                        <div className="mr-2 items-start mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4 ">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-layer-2 py-1 cursor-pointer whitespace-nowrap rounded-lg px-4 relative">
                                    Case 2
                                </div>
                            </div>
                        </div>

                        <div className="mr-2 items-start mt-2 text-white">
                            <div className="flex flex-wrap items-center gap-y-4 ">
                                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-layer-2 py-1 cursor-pointer whitespace-nowrap rounded-lg px-4 relative">
                                    Case 3
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-semibold my-4">
                        <p className="text-sm font-medium mt-4 text-white">Input:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            nums:[2,7,11,15], target:9
                        </div>
                        <p className="text-sm font-medium mt-4 text-white">Output:</p>
                        <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                            [0,1]
                        </div>
                    </div>
                </div>
            </Split>
        </div>
    );
}

export default Playground;
