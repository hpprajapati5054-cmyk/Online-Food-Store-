import React from 'react';
import { TwitterIcon, InstagramIcon, FacebookIcon } from './Icons';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
             <a href="#"><Logo className="h-10 text-white" /></a>
             <p className="mt-4 text-sm text-slate-400">
               &copy; {new Date().getFullYear()} Food Store Inc.
             </p>
          </div>
          
          <div>
            <h4 className="font-bold tracking-wider text-slate-300 uppercase mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold tracking-wider text-slate-300 uppercase mb-4">Contact us</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Partner with us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Ride with us</a></li>
            </ul>
          </div>

           <div>
            <h4 className="font-bold tracking-wider text-slate-300 uppercase mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-slate-500 mb-4 sm:mb-0">All Rights Reserved.</p>
             <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-slate-500 hover:text-white transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-slate-500 hover:text-white transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Facebook" className="text-slate-500 hover:text-white transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;