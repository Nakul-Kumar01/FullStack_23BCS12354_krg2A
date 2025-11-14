import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { NavLink } from "react-router";

export default function Problem() {
    const { user } = useSelector((state) => state.auth);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [filters, setFilters] = useState({
        difficulty: 'all',
        tag: 'all',
        status: 'all'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [problemsResponse, solvedResponse] = await Promise.all([
                    axiosClient.get('/problem/getAllProblem'),
                    user ? axiosClient.get('/problem/problemSolvedByUser') : Promise.resolve({ data: [] })
                ]);

                setProblems(problemsResponse.data);
                if (user) setSolvedProblems(solvedResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const filteredProblems = problems.filter(problem => {
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
        const statusMatch = filters.status === 'all' ||
            (filters.status === 'solved' ? solvedProblems.some(sp => sp._id === problem._id) : true);
        return difficultyMatch && tagMatch && statusMatch;
    });

    const difficultyOptions = [
        { value: 'all', label: 'All Difficulties', color: 'neutral' },
        { value: 'easy', label: 'Easy', color: 'success' },
        { value: 'medium', label: 'Medium', color: 'warning' },
        { value: 'hard', label: 'Hard', color: 'error' }
    ];

    const tagOptions = [
        { value: 'all', label: 'All Tags' },
        { value: 'array', label: 'Array' },
        { value: 'linkedList', label: 'Linked List' },
        { value: 'graph', label: 'Graph' },
        { value: 'dp', label: 'Dynamic Programming' }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Problems' },
        { value: 'solved', label: 'Solved Problems' }
    ];

    return (
        <div className="min-h-screen relative w-full bg-[#121C39] text-white overflow-hidden p-6">
            <div className="pointer-events-none absolute -top-40 -left-40 w-[720px] h-[720px] rounded-full bg-gradient-to-tr from-[#6ee7b7] via-[#7c3aed] to-[#ec4899] opacity-18 blur-[160px] transform-gpu" />
            <div className="pointer-events-none absolute -bottom-36 -right-36 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-[#06b6d4] via-[#8b5cf6] to-[#f43f5e] opacity-14 blur-[140px] transform-gpu" />

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mt-15  mb-10">
                <div className="mb-8 text-center">
                    <h1 className="text-5xl font-bold text-yellow-500  mb-4">
                        <span className="text-[#5BBBBB]">Coding</span> Problems
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        Practice coding problems and improve your skills. Track your progress and challenge yourself!
                    </p>
                </div>

                {/* Stats Section */}
                <div className="stats shadow-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 w-full mb-8">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <div className="stat-title text-slate-300">Total Problems</div>
                        <div className="stat-value text-primary">{problems.length}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div className="stat-title text-slate-300">Solved</div>
                        <div className="stat-value text-secondary">{solvedProblems.length}</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                            </svg>
                        </div>
                        <div className="stat-title text-slate-300">Progress</div>
                        <div className="stat-value text-info">
                            {problems.length > 0 ? Math.round((solvedProblems.length / problems.length) * 100) : 0}%
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-700/50 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-slate-300">Filter Problems</h2>
                    <div className="flex flex-wrap gap-4">
                        {/* Status Filter */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-slate-400">Status</span>
                            </label>
                            <select
                                className="select select-bordered bg-slate-700/50 border-slate-600 text-white"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-slate-400">Difficulty</span>
                            </label>
                            <select
                                className="select select-bordered bg-slate-700/50 border-slate-600 text-white"
                                value={filters.difficulty}
                                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                            >
                                {difficultyOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tag Filter */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-slate-400">Tags</span>
                            </label>
                            <select
                                className="select select-bordered bg-slate-700/50 border-slate-600 text-white"
                                value={filters.tag}
                                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                            >
                                {tagOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Problems List */}
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Problems</h2>
                        <span className="text-slate-400">
                            Showing {filteredProblems.length} of {problems.length} problems
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="loading loading-spinner loading-lg text-primary"></div>
                        </div>
                    ) : filteredProblems.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-16 w-16 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-xl font-medium text-slate-300">No problems found</h3>
                            <p className="mt-2 text-slate-500">Try adjusting your filters to find more problems.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {/* Table Header */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-slate-700/30 rounded-lg text-slate-400 font-medium">
                                <div className="col-span-6">Title</div>
                                <div className="col-span-3 text-center">Difficulty</div>
                                <div className="col-span-3 text-center">Tags</div>
                            </div>

                            {/* Problems List */}
                            {filteredProblems.map(problem => {
                                const isSolved = solvedProblems.some(sp => sp._id === problem._id);
                                return (
                                    <div
                                        key={problem._id}
                                        className={`card bg-slate-800/40 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${isSolved ? 'border-green-500/30' : 'border-slate-700/50'
                                            }`}
                                    >
                                        <div className="card-body py-4">
                                            <div className="grid grid-cols-12 gap-4 items-center">
                                                <div className="col-span-6">
                                                    <div className="flex items-center gap-3">
                                                        <h2 className="card-title text-lg">
                                                            <NavLink
                                                                to={`/problem/${problem._id}`}
                                                                className="hover:text-primary transition-colors"
                                                            >
                                                                {problem.title}
                                                            </NavLink>
                                                        </h2>
                                                        {isSolved && (
                                                            <div className="tooltip" data-tip="Solved">
                                                                <div className="badge badge-success gap-2 p-3">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-span-3 flex justify-center">
                                                    <div className={`badge badge-lg ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                                        {problem.difficulty}
                                                    </div>
                                                </div>

                                                <div className="col-span-3 flex justify-center">
                                                    <div className="badge badge-info badge-lg badge-outline">
                                                        {problem.tags}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'badge-success';
        case 'medium': return 'badge-warning';
        case 'hard': return 'badge-error';
        default: return 'badge-neutral';
    }
};