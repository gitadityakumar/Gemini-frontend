"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { IconBrandYoutube, IconBrain, IconBrandNotion, IconBrowserPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail } from '@tabler/icons-react';

const LandingPage = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignupButton = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8">
          <nav className="flex justify-between items-center">
            <div className="w-32 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 blur"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" className="relative w-full h-auto">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="url(#gradient)">Means</text>
              </svg>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="hidden sm:inline-flex hover:bg-purple-500/10 hover:text-purple-200">Features</Button>
              <Button variant="ghost" className="hidden sm:inline-flex hover:bg-purple-500/10 hover:text-purple-200">Contact</Button>
              <Button 
                className="px-6 py-2 bg-transparent text-white border border-purple-500 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30"
                onClick={handleSignupButton}
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </header>

        <main className="mt-24">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-30 blur-xl"></div>
              <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  Record, process, and export YouTube video content
                </span>
              </h2>
            </div>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300 leading-relaxed">
              Seamlessly integrate with your browser and leverage the power of Gemini AI to transform your learning experience.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30">
                Get Started
              </Button>
              <Button className="px-8 py-4 text-lg bg-transparent text-white border-2 border-blue-500 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/30" onClick={()=>router.push('https://www.youtube.com/@a_LEGION')}>
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="mt-32 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 py-2 bg-gradient-to-r from-black via-gray-900 to-black text-lg font-medium text-gray-300">
                Why Choose Means
              </span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

const features = [
  {
    icon: <IconBrowserPlus size={32} className="text-blue-400" />,
    title: "Smart Chrome Extension",
    description: "Record YouTube videos instantly while watching. Our extension automatically tracks timestamps, chapters, and key moments."
  },
  {
    icon: <IconBrain size={32} className="text-purple-400" />,
    title: "Gemini AI Analysis",
    description: "Leverage Google's Gemini AI to automatically generate comprehensive notes, summaries, and key takeaways."
  },
  {
    icon: <IconBrandYoutube size={32} className="text-red-400" />,
    title: "Vocabulary Enhancement",
    description: "Automatically extract and learn new words at medium proficiency level. Get contextual meanings, usage examples, and personalized word lists from your favorite YouTube content."
  },
  {
    icon: <IconBrandNotion size={32} className="text-gray-400" />,
    title: "Notion Integration",
    description: "Export your processed content and vocabulary lists directly to Notion. Create structured databases of words with meanings, examples, and source videos."
  }
];

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group relative p-6 rounded-xl bg-gray-900/50 hover:bg-gray-900 transition-all duration-300 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-800 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-100">{title}</h3>
        <p className="text-gray-400 text-sm flex-grow leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-gray-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="w-32">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" className="w-full h-auto">
                <defs>
                  <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor:"#3b82f6", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#8b5cf6", stopOpacity:1}} />
                  </linearGradient>
                </defs>
                <text x="10" y="45" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="url(#footerGradient)">Means</text>
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              Revolutionizing online learning through AI-powered content processing. Transform YouTube videos into structured knowledge with Means.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'FAQ'].map((item) => (
                <li key={item}>
                  <span className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">Stay Updated</h3>
            <p className="text-gray-400 text-sm">Join our newsletter for the latest updates about new features and tips.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg flex-grow text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              />
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Means. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              {[IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail].map((Icon, index) => (
                <span key={index} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200">
                  <Icon size={24} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingPage;