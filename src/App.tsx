import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { PhotoGallery } from './components/PhotoGallery';
import { loadAllPhotos } from './utils/imageLoader';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [heroImage, setHeroImage] = useState<string>('');
  const [hasPhotos, setHasPhotos] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadHeroImage = async () => {
      try {
        const photos = await loadAllPhotos();
        if (photos.length > 0) {
          // Use the first (newest) photo as hero background
          setHeroImage(photos[0].src);
          setHasPhotos(true);
        } else {
          // Use default background when no photos found
          setHeroImage('/bg.jpg');
          setHasPhotos(false);
        }
      } catch (error) {
        console.error('Error loading hero image:', error);
        // Fallback to default background on error
        setHeroImage('/bg.jpg');
        setHasPhotos(false);
      }
    };

    loadHeroImage();
  }, []);

  // Calculate header transform based on scroll
  const headerTransform = Math.min(scrollY * 0.8, 400); // Max 400px upward movement
  const headerOpacity = Math.max(1 - scrollY / 300, 0); // Fade out over 300px

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {heroImage && (
            <img 
              src={heroImage}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Header Content Overlay */}
        <header 
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{
            transform: `translateY(-${headerTransform}px)`,
            opacity: headerOpacity
          }}
        >
          <div className="text-center px-4 sm:px-6">
            {/* Blur backdrop for text */}
            <div className="backdrop-blur-md bg-black/20 rounded-3xl p-8 sm:p-12 border border-white/10">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-wide text-white mb-4 sm:mb-6">
                NIR DREMER
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-200 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8">
                Product builder, investor, family guy & amateur photographer
              </p>
              
              {/* Contact Links */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <a 
                  href="mailto:hey@dremer.net" 
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base group"
                >
                  <Mail className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                  <span>hey@dremer.net</span>
                </a>
                <a 
                  href="https://twitter.com/nird" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base group"
                >
                  <Twitter className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                  <span>@nird</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/dremer/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base group"
                >
                  <Linkedin className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/NirDremer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm sm:text-base group"
                >
                  <Github className="w-4 h-4 mr-2 group-hover:scale-105 transition-transform duration-300" />
                  <span>GitHub</span>
                </a>
                <div className="flex items-center text-gray-300 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Belmont, CA</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scroll indicator */}
        {hasPhotos && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Footer */}
      <footer className="bg-black/95 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center">
          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <a 
              href="mailto:hey@dremer.net" 
              className="text-gray-400 hover:text-white transition-colors duration-300 group"
              aria-label="Email"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="https://twitter.com/nird" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 group"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="https://www.linkedin.com/in/dremer/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a 
              href="https://github.com/NirDremer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 group"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
          
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nir Dremer
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;