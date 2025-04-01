import React from 'react'
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral text-neutral-content h-16 w-full">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4">
        <aside className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-neutral-content/10 flex items-center justify-center">
          
          </div>
          <div className='flex flex-row gap-2'>
            <p className="font-bold text-base">
              DevMate
              <span className="text-xs opacity-75 ml-2">
                Connecting developers since 2024
              </span>
            </p>
           
          </div>
        </aside>
        <nav>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  )
}

export default Footer




