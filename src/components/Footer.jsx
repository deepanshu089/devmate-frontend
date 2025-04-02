import React from 'react'
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-neutral text-neutral-content py-8 border-t border-neutral-800">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col space-y-4 md:items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">D</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">DevMate</h2>
                <p className="text-sm opacity-75">Connecting developers since 2024</p>
              </div>
            </div>
            <p className="text-sm opacity-75">
              © {currentYear} DevMate. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col space-y-4 md:items-end">
            <div className="flex gap-6 justify-center md:justify-end">
              <a
                href="https://github.com/devmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/devmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/company/devmate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-content hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
            <p className="text-sm opacity-75 text-center md:text-right">
              Contact us: hello@devmate.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




