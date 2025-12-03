"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Linkedin, Github, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.set(menuRef.current, { display: 'block' });
      gsap.fromTo(menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo(menuItemsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menuRef.current, { display: 'none' });
        }
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href) as HTMLElement);
      const scrollY = window.scrollY + 100; // offset for nav height

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveIndex(index);
            
            // Clear any lingering hover effects on all links when scrolling
            navItems.forEach((_, i) => {
              const link = document.querySelector(`a[href="${navItems[i].href}"]`) as HTMLElement;
              if (link && i !== index) {
                gsap.set(link, {
                  scale: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0)'
                });
              }
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (indicatorRef.current) {
      const activeLink = document.querySelector(`a[href="${navItems[activeIndex].href}"]`) as HTMLElement;
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect();
        const containerRect = activeLink.parentElement?.parentElement?.getBoundingClientRect();
        if (containerRect) {
          gsap.to(indicatorRef.current, {
            x: rect.left - containerRect.left,
            width: rect.width,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      }
    }
  }, [activeIndex]);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    
    // Clear any lingering hover effects on all links
    navItems.forEach((_, i) => {
      const link = document.querySelector(`a[href="${navItems[i].href}"]`) as HTMLElement;
      if (link && i !== index) {
        gsap.set(link, {
          scale: 1,
          backgroundColor: 'rgba(255, 255, 255, 0)'
        });
      }
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-4 left-0 right-0 z-50 hidden md:flex items-center justify-between px-4">
        {/* Left Pill: Name */}
        <div className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          <span className="text-white font-bold text-base">Harshil Patel</span>
        </div>

        {/* Middle Pill: Navigation */}
        <div className="relative px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          <ul className="flex space-x-4 relative z-10">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(index)}
                  className="px-4 py-2 rounded-full text-white font-medium shadow-md transition-shadow duration-300 relative z-20"
                  onMouseEnter={(e) => {
                    if (activeIndex !== index) {
                      gsap.to(e.currentTarget, {
                        scale: 1.05,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeIndex !== index) {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        duration: 0.3,
                        ease: 'power2.out'
                      });
                    }
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          {/* Active Indicator */}
          <div
            ref={indicatorRef}
            className="absolute top-1/2 transform -translate-y-1/2 bg-white/20 rounded-full shadow-md"
            style={{ height: 'calc(100% - 8px)', width: 0 }}
          />
        </div>

        {/* Right Pill: Social Icons */}
        <div className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
          <div className="flex space-x-3">
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="mailto:your.email@example.com" className="text-white hover:text-red-300 transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 md:hidden p-2 bg-white/10 backdrop-blur-md rounded-md border border-white/20"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-64 bg-white/10 backdrop-blur-md border-l border-white/20 z-40 md:hidden"
        style={{ display: 'none' }}
      >
        <div className="p-4">
          <div className="text-xl font-bold mb-8">Portfolio</div>
          <ul ref={menuItemsRef} className="space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-white hover:text-blue-300 transition-colors duration-300 text-lg"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}