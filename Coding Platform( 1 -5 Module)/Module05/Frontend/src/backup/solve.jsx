import { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router';
import axiosClient from "../utils/axiosClient";
import Editor from "@monaco-editor/react";
import SubmissionHistory from "./SubmissionHistory";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ChartNoAxesCombined } from "lucide-react";


const langMap = {
    cpp: 'C++',
    java: 'Java',
    python: 'Python'
};

export default function Solve() {
    const [problem, setProblem] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('cpp');
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [runResult, setRunResult] = useState(null);
    const [submitResult, setSubmitResult] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState('description');
    const [activeRightTab, setActiveRightTab] = useState('code');
    const editorRef = useRef(null);
    let { problemId } = useParams();

    // animation states
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);
    const [progress, setProgress] = useState(0); // progress for circular animation
    const [showCheck, setShowCheck] = useState(false);

    // when submission result becomes accepted, run animations
    useEffect(() => {
        if (submitResult?.status === "accepted") {
            // start confetti and circle animation
            setShowConfetti(true);
            setShowCheck(false);
            setProgress(0);

            // animate progress from 0 -> 100
            let p = 0;
            const interval = setInterval(() => {
                p += 4; // speed, tweak as needed
                if (p >= 100) {
                    p = 100;
                    clearInterval(interval);
                    // show animated check after progress completes
                    setTimeout(() => setShowCheck(true), 250);
                }
                setProgress(p);
            }, 25);

            // stop confetti after 4.5s
            const confettiTimer = setTimeout(() => setShowConfetti(false), 4500);

            return () => {
                clearInterval(interval);
                clearTimeout(confettiTimer);
            };
        } else {
            // reset when non-accepted or null
            setShowConfetti(false);
            setProgress(0);
            setShowCheck(false);
        }
    }, [submitResult]);



    useEffect(() => {
        const fetchProblem = async () => {
            setLoading(true);
            try {

                const response = await axiosClient.get(`/problem/problemById/${problemId}`);
                //  console.log("done1");
                const CodeForUser = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).CodeForUser;
                //  console.log("done2");

                // console.log(CodeForUser);
                setProblem(response.data);
                // console.log(response.data.startCode);


                // console.log(CodeForUser);
                setCode(CodeForUser);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching problem:', error);
                setLoading(false);
            }
        };

        fetchProblem();
    }, [problemId]);

    // Update code when language changes
    useEffect(() => {
        if (problem) {
            // console.log("language changed");
            const CodeForUser = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.CodeForUser || '';
            // console.log(CodeForUser );
            setCode(CodeForUser);
        }
    }, [selectedLanguage, problem]);


    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'text-green-500';
            case 'medium': return 'text-yellow-500';
            case 'hard': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
    };

    const getLanguageForMonaco = (lang) => {
        switch (lang) {
            case 'python': return 'python';
            case 'java': return 'java';
            case 'cpp': return 'cpp';
            default: return 'python';
        }
    };

    const handleEditorChange = (value) => {
        // colsole.log("1st");
        setCode(value || '');
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
    };

    const handleRun = async () => {
        setLoading(true);
        setRunResult(null);

        try {
            const response = await axiosClient.post(`/submission/run/${problemId}`, {
                code,
                language: selectedLanguage
            });
            console.log(response);
            if(response?.success != false){
                response.success = true;
            }
            setRunResult(response);
            setLoading(false);
        } catch (error) {
            console.error('Error running code:', error);
            setRunResult({
                success: false,
                error: 'Internal server error'
            });
            setLoading(false);
        }
    };

    const handleSubmitCode = async () => {
        setLoading(true);
        setSubmitResult(null);

        try {
            console.log("submitting");
            const response = await axiosClient.post(`/submission/submit/${problemId}`, {
                code: code,
                language: selectedLanguage
            });
            // console.log(response.data);
            setSubmitResult(response.data);
            setLoading(false);
            setActiveLeftTab('result');

        } catch (error) {
            console.error('Error submitting code:', error);
            setSubmitResult(null);
            setLoading(false);
            setActiveLeftTab('result');
        }
    };

    if (loading && !problem) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="pt-20 bg-[#071428] text-gray-200 min-h-screen flex">
            {/* Left Panel */}
            <div className="w-1/2 flex flex-col border-r border-gray-700 bg-[#0b1a33]/80 backdrop-blur-md shadow-xl">
                {/* Left Tabs */}
                <div className="tabs tabs-bordered bg-[#0e213d] px-4 sticky top-0 z-10">
                    {["description", "editorial", "solutions", "submissions", "result"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab text-sm tracking-wide transition-all ${activeLeftTab === tab
                                ? "tab-active text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                                : "hover:text-yellow-400"
                                }`}
                            onClick={() => setActiveLeftTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Left Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {problem && (
                        <>
                            {activeLeftTab === "description" && (
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <h1 className="text-2xl font-bold text-yellow-500">{problem.title}</h1>
                                        <div
                                            className={`badge border-2 px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)
                                                }`}
                                        >
                                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                                        </div>
                                        <div className="badge bg-yellow-500/10 text-yellow-500 border border-yellow-500">
                                            {problem.tags}
                                        </div>
                                    </div>

                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                                            {problem.discription}
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold mb-4 text-yellow-400">Examples:</h3>
                                        <div className="space-y-4">
                                            {problem.visibleTestCases.map((example, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[#0e213d] border border-gray-700 p-4 rounded-lg shadow-md hover:border-yellow-500/50 transition"
                                                >
                                                    <h4 className="font-semibold mb-2 text-yellow-400">
                                                        Example {index + 1}:
                                                    </h4>
                                                    <div className="space-y-2 text-sm font-mono text-gray-300">
                                                        <div>
                                                            <strong className="text-yellow-500">Input:</strong> {example.input}
                                                        </div>
                                                        <div>
                                                            <strong className="text-yellow-500">Output:</strong> {example.output}
                                                        </div>
                                                        <div>
                                                            <strong className="text-yellow-500">Explanation:</strong>{" "}
                                                            {example.explanation}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeLeftTab === "editorial" && (
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-bold mb-4 text-yellow-400">Editorial</h2>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                                        Editorial is here for the problem
                                    </div>
                                </div>
                            )}

                            {activeLeftTab === "solutions" && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4 text-yellow-400">Solutions</h2>
                                    <div className="space-y-6">
                                        {problem.referenceSolution?.map((solution, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-700 rounded-lg bg-[#0e213d] shadow-lg hover:border-yellow-500/50 transition"
                                            >
                                                <div className="bg-[#122642] px-4 py-2 rounded-t-lg border-b border-gray-700">
                                                    <h3 className="font-semibold text-yellow-500">
                                                        {problem?.title} - {solution?.language}
                                                    </h3>
                                                </div>
                                                <div className="p-4">
                                                    <pre className="bg-[#071428] p-4 rounded text-sm overflow-x-auto text-gray-200 border border-gray-700">
                                                        <code>{solution?.completeCode}</code>
                                                    </pre>
                                                </div>
                                            </div>
                                        )) || (
                                                <p className="text-gray-500">Solutions will be available after you solve the problem.</p>
                                            )}
                                    </div>
                                </div>
                            )}

                            {activeLeftTab === "submissions" && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4 text-yellow-400">My Submissions</h2>
                                    <div className="text-gray-500">
                                        <SubmissionHistory problemId={problemId}></SubmissionHistory>
                                    </div>
                                </div>
                            )}
                            {activeLeftTab === 'result' && (
                                <div className="flex-1 p-6 overflow-y-auto h-full">
                                    <h3 className="font-semibold mb-6 text-yellow-400">Submission Result</h3>

                                    {/* confetti (absolute so it doesn't push content) */}
                                    {showConfetti && (
                                        <div className="pointer-events-none absolute left-0 top-20 z-20">
                                            <Confetti
                                                width={Math.max(300, Math.floor(width / 2))}
                                                height={height}
                                                numberOfPieces={220}
                                                recycle={false}
                                                gravity={0.22}
                                            />
                                        </div>
                                    )}

                                    {submitResult ? (
                                        <div className="relative z-10 h-full">
                                            {submitResult.status === "accepted" ? (
                                                <div className="h-full flex flex-col rounded-2xl border-2 border-yellow-500/20 bg-gradient-to-br from-[#061021] to-[#08122a] p-6 shadow-2xl overflow-hidden">
                                                    {/* Grid: left big progress, right details */}
                                                    <div className="grid grid-cols-12 gap-6 flex-1 items-center">
                                                        {/* big progress circle - occupies substantial vertical space */}
                                                        <div className="col-span-12 md:col-span-4 flex items-center justify-center">
                                                            <div className="w-40 h-40 md:w-44 md:h-44 p-1 rounded-xl bg-gradient-to-br from-[#071428] to-[#061021] shadow-inner ring-4 ring-yellow-500/10">
                                                                <CircularProgressbar
                                                                    className="text-yellow-500 font-extrabold"
                                                                    value={progress}
                                                                    text={showCheck ? "100%" : `${Math.round(progress)}%`}
                                                                    styles={buildStyles({
                                                                        textSize: '22px',
                                                                        textColor: showCheck ? "#facc15" : "#f59e0b",
                                                                        pathColor: "#f59e0b",
                                                                        trailColor: "#071428",
                                                                        backgroundColor: "#061021",
                                                                    })}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* details */}
                                                        <div className="col-span-12 md:col-span-8 flex flex-col justify-between">
                                                            <div>
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div>
                                                                        <h4 className="font-extrabold text-2xl md:text-3xl text-yellow-300 leading-tight">
                                                                            {showCheck ? (
                                                                                <span className="flex items-center gap-2">
                                                                                    <ChartNoAxesCombined className="text-yellow-300" /> Accepted
                                                                                </span>
                                                                            ) : (
                                                                                'Finalizing Results...'
                                                                            )}
                                                                        </h4>
                                                                        <p className="mt-2 text-sm text-gray-300 max-w-xl">
                                                                            Great job — your solution passed the checks.
                                                                        </p>
                                                                    </div>

                                                                    {/* trophy badge */}
                                                                    <div className={`flex items-center justify-center p-3 rounded-lg transition-transform duration-300 ${showCheck ? 'bg-yellow-500 text-black scale-105' : 'bg-yellow-500/20 text-yellow-200'}`}>
                                                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                                                            <path d="M8 2h8v2h2v6a5 5 0 01-5 5h-2a5 5 0 01-5-5V4h2V2z" />
                                                                        </svg>
                                                                    </div>
                                                                </div>

                                                                {/* big passed test-case badge */}
                                                                <div className="mt-6">
                                                                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-yellow-500 text-black font-mono font-extrabold text-2xl tracking-wide shadow-lg">
                                                                        <span className="text-xl">✔</span>
                                                                        <span>{submitResult.testCasesPassed}</span>
                                                                        <span className="text-base font-medium text-black/70">/</span>
                                                                        <span className="text-xl">{submitResult.testCasesTotal}</span>
                                                                        <span className="ml-3 text-sm font-medium text-black/60">{showCheck ? 'All Passed' : 'Running'}</span>
                                                                    </div>
                                                                </div>

                                                                {/* small stat cards */}
                                                                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                                    <div className="p-3 rounded-lg bg-[#071428] border border-yellow-500/10 flex flex-col">
                                                                        <span className="text-xs text-gray-400">Runtime</span>
                                                                        <span className="font-semibold text-yellow-400 text-lg">{submitResult.runtime.toFixed(3)} sec</span>
                                                                    </div>
                                                                    <div className="p-3 rounded-lg bg-[#071428] border border-yellow-500/10 flex flex-col">
                                                                        <span className="text-xs text-gray-400">Memory</span>
                                                                        <span className="font-semibold text-yellow-400 text-lg">{submitResult.memory.toFixed(1)} KB</span>
                                                                    </div>
                                                                    <div className="p-3 rounded-lg bg-[#071428] border border-yellow-500/10 flex flex-col">
                                                                        <span className="text-xs text-gray-400">Status</span>
                                                                        <span className="font-semibold text-green-400 text-lg flex items-center gap-2">
                                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                            Accepted
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* bottom area - message and CTA */}
                                                            <div className="mt-6">
                                                                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${showCheck ? 'bg-yellow-500 text-black' : 'bg-yellow-500/10 text-yellow-300'} font-semibold transition-transform duration-300`}>
                                                                    {showCheck ? 'All Tests Passed — Well done!' : 'Finalizing results...'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* tasteful sparkles (do not overlap content) */}
                                                    <div className="pointer-events-none">
                                                        <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full opacity-10 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.12), transparent)' }} />
                                                        <div className="absolute right-6 bottom-6 w-16 h-16 rounded-full opacity-8 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.08), transparent)' }} />
                                                    </div>
                                                </div>
                                            ) : (
                                                // failed layout - clear spacing and calm color
                                                <div className="rounded-xl p-6 bg-[#061021] border border-red-600/30 shadow-md">
                                                    <h4 className="font-bold text-lg text-red-400">❌ {submitResult.error || 'Failed'}</h4>
                                                    <p className="mt-3 text-sm text-gray-300">
                                                        Test Cases Passed: <span className="text-yellow-400 font-medium">{submitResult.testCasesPassed}</span> / {submitResult.testCasesTotal}
                                                    </p>
                                                    <div className="mt-4">
                                                        <button className="btn btn-sm bg-yellow-500 text-black hover:bg-yellow-400">View Details</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">Click "Submit" to submit your solution for evaluation.</div>
                                    )}
                                </div>
                            )}



                        </>
                    )}
                </div>
            </div>

            {/* Right Panel */}
            <div className="w-1/2 flex flex-col bg-[#0b1a33]/80 backdrop-blur-md shadow-xl">
                {/* Right Tabs */}
                <div className="tabs tabs-bordered bg-[#0e213d] px-4 sticky top-0 z-10">
                    {["code"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab text-sm tracking-wide transition-all ${activeRightTab === tab
                                ? "tab-active text-yellow-500 border-b-2 border-yellow-500 font-semibold"
                                : "hover:text-yellow-400"
                                }`}
                            onClick={() => setActiveRightTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="flex-1 flex flex-col">
                    {activeRightTab === "code" && (
                        <div className="flex-1 flex flex-col">
                            {/* Language Selector */}
                            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-[#0e213d]">
                                <div className="flex gap-2">
                                    {["python", "java", "cpp"].map((lang) => (
                                        <button
                                            key={lang}
                                            className={`btn btn-sm rounded-full ${selectedLanguage === lang
                                                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                                                : "btn-ghost text-gray-400 hover:text-yellow-400"
                                                }`}
                                            onClick={() => handleLanguageChange(lang)}
                                        >
                                            {lang === "cpp" ? "C++" : lang === "python" ? "Python" : "Java"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <div className="flex-1">
                                <Editor
                                    height="100%"
                                    language={getLanguageForMonaco(selectedLanguage)}
                                    value={code}
                                    onChange={handleEditorChange}
                                    onMount={handleEditorDidMount}
                                    theme="vs-dark"
                                    options={{
                                        fontSize: 14,
                                        minimap: { enabled: false },
                                        scrollBeyondLastLine: false,
                                        automaticLayout: true,
                                        tabSize: 2,
                                        insertSpaces: true,
                                        wordWrap: "on",
                                        lineNumbers: "on",
                                        glyphMargin: false,
                                        folding: true,
                                        lineDecorationsWidth: 10,
                                        lineNumbersMinChars: 3,
                                        renderLineHighlight: "line",
                                        selectOnLineNumbers: true,
                                        roundedSelection: false,
                                        readOnly: false,
                                        cursorStyle: "line",
                                        mouseWheelZoom: true,
                                    }}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 border-t border-gray-700 flex justify-between bg-[#0e213d]">
                                <div className="flex gap-2">
                                    <button
                                        className="btn btn-ghost btn-sm text-gray-400 hover:text-yellow-400"
                                        onClick={() => setActiveRightTab("testcase")}
                                    >
                                        Console
                                    </button>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className={`btn btn-outline btn-sm rounded-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition ${loading ? "loading" : ""
                                            }`}
                                        onClick={handleRun}
                                        disabled={loading}
                                    >
                                        Run
                                    </button>
                                    <button
                                        className={`btn btn-sm rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition ${loading ? "loading" : ""
                                            }`}
                                        onClick={handleSubmitCode}
                                        disabled={loading}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {runResult && (
                        <div className="w-full h-1/2 flex-1 p-4 overflow-y-auto">
                            <h3 className="font-semibold mb-4">Test Results</h3>
                            {(runResult?.success) ? (
                                <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
                                    <div>
                                        {console.log(runResult)}
                                        {runResult.success ? (
                                            <div>
                                                <h4 className="font-bold">✅ All test cases passed!</h4>
                                                <p className="text-sm mt-2">Runtime: {runResult.runtime + " sec"}</p>
                                                <p className="text-sm">Memory: {runResult.memory + " KB"}</p>

                                                <div className="mt-4 space-y-2">
                                                    {runResult?.testCases.map((tc, i) => (
                                                        <div key={i} className="bg-base-100 p-3 rounded text-xs">
                                                            <div className="font-mono">
                                                                <div><strong>Input:</strong> {tc.stdin}</div>
                                                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                                                <div><strong>Output:</strong> {tc.stdout}</div>
                                                                <div className={'text-green-600'}>
                                                                    {'✓ Passed'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <h4 className="font-bold">❌ Error</h4>
                                                <div className="mt-4 space-y-2">
                                                    {!runResult.success === false && runResult?.testCases.map((tc, i) => (
                                                        <div key={i} className="bg-base-100 p-3 rounded text-xs">
                                                            <div className="font-mono">
                                                                <div><strong>Input:</strong> {tc.stdin}</div>
                                                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                                                <div><strong>Output:</strong> {tc.stdout}</div>
                                                                <div className={tc.status_id == 3 ? 'text-green-600' : 'text-red-600'}>
                                                                    {tc.status_id == 3 ? '✓ Passed' : '✗ Failed'}
                                                                </div>
                                                            </div> 
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    Click "Run" to test your code with the example test cases.
                                </div>
                            )}
                        </div>
                    )}


                </div>
            </div>
        </div>

    )
}

