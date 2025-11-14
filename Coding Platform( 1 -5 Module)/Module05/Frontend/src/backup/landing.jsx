import { Code, Star, Rocket, Trophy, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import FlipLink from "./landingText";
import Header from "./header";
import Profile from "./profile";


export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative bg-black text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[180px]" />


      <div className="w-[33%] ">
        <FlipLink color="#C27AFF" >Programing</FlipLink>
        <FlipLink color="#FB64B6">Contest</FlipLink>
        <FlipLink colot="#7C86FF">Game</FlipLink>
      </div>

      <Profile></Profile>

      <div className="absolute right-0 bottom-1/6 transform -translate-y-1/2 text-2xl font-bold [writing-mode:vertical-rl] flex">NexLoop<Repeat className=" text-pink-500 mr-2  mt-2 rotate-90" /></div>

      <Header></Header>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-6 mt-20 relative z-10">
        <p className="text-lg max-w-2xl mb-8 text-gray-400">
          Push your coding limits with real-time battles, interactive problems, and thrilling contests
        </p>
        {/* <button className="btn btn-primary btn-lg rounded-full px-10 shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:scale-105 transition">
          Login
        </button> */}
      </div>

      {/* Stats Section */}
      <div className="flex justify-center gap-6 p-10 flex-wrap relative z-10">
        {/* Problems Solved */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card w-72 bg-white/5 backdrop-blur-lg shadow-xl border border-purple-500/30"
        >
          <div className="card-body text-center">
            <div className="flex items-center gap-2 justify-center text-lg font-medium">
              <Code className="text-purple-400" />
              <span>Problems Solved</span>
            </div>
            {/* <h2 className="text-3xl font-bold text-purple-300 mt-2">0</h2> */}
          </div>
        </motion.div>
        

        {/* Total Submissions */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card w-72 bg-white/5 backdrop-blur-lg shadow-xl border border-pink-500/30"
        >
          <div className="card-body text-center">
            <div className="flex items-center gap-2 justify-center text-lg font-medium">
              <Star className="text-pink-400" />
              <span>Total Submissions</span>
            </div>
            <h2 className="text-3xl font-bold text-pink-300 mt-2">0</h2>
          </div>
        </motion.div>

        {/* Contests Played */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="card w-72 bg-white/5 backdrop-blur-lg shadow-xl border border-indigo-500/30"
        >
          <div className="card-body text-center">
            <div className="flex items-center gap-2 justify-center text-lg font-medium">
              <Trophy className="text-indigo-400" />
              <span>Contests Played</span>
            </div>
            <h2 className="text-3xl font-bold text-indigo-300 mt-2">0</h2>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center mt-12 z-10 relative">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-[2px] rounded-full">
          <div className="bg-black px-8 py-6 rounded-full flex items-center gap-4 shadow-lg shadow-pink-500/20">
            <Rocket className="text-pink-400" />
            <p className="text-lg text-gray-300">Start Your Coding Journey in Dark Mode</p>
            <button className="btn btn-accent rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border-0 hover:scale-105 transition">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
