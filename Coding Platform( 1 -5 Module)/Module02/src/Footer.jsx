
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#071428] text-white py-8">
            <div className="container mx-auto  flex  md:flex-row justify-between items-center px-50">
                <div className=" w-[30%] mb-4 md:mb-0">
                    <div  >
                        <svg width="100" height="40" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="loopGradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#FE9A00" />
                                    <stop offset="1" stop-color="#FFD166" />
                                </linearGradient>
                            </defs>
                            <path d="M20 40C20 20 50 20 70 40C90 60 120 60 140 40C160 20 180 20 180 40C180 60 150 60 130 40C110 20 80 20 60 40C40 60 20 60 20 40Z"
                                stroke="url(#loopGradient)" stroke-width="6" fill="none" stroke-linecap="round" />
                            <text x="35" y="65" fill="#FE9A00" font-size="28" font-family="Poppins, sans-serif" font-weight="bold">Nex</text>
                            <text x="100" y="65" fill="#ffffff" font-size="28" font-family="Poppins, sans-serif" font-weight="bold">Loop</text>
                        </svg>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Sharpen your coding skills and forge your future with our comprehensive problem-solving platform.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-gray-300">QUICK LINKS</h4>
                    <ul className="space-y-1 text-gray-400">
                        <li><a href="#" className="hover:text-[#FE9A00]">About Us</a></li>
                        <li><a href="#" className="hover:text-[#FE9A00]">Contact</a></li>
                        <li><a href="#" className="hover:text-[#FE9A00]">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2 text-gray-300">CONNECT WITH US</h4>
                    <ul className="space-y-1 text-gray-400">
                        <li><a href="https://github.com/Nakul-Kumar01" target='_blank' className="hover:text-[#FE9A00]">GitHub</a></li>
                        <li><a href="https://x.com/Nakul1001" target='_blank' className="hover:text-[#FE9A00]">Twitter</a></li>
                        <li><a href="https://www.linkedin.com/in/nakulkumar126/" target='_blank' className="hover:text-[#FE9A00]">LinkedIn</a></li>
                    </ul>
                </div>

            </div>
            <div className="text-center text-gray-500 text-sm mt-8">
                © 2025 HackForge. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;