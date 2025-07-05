import React, { useState, useEffect, useCallback } from 'react';
import { LazyImage } from './LazyImage';
import { Photo, loadAllPhotos } from '../utils/imageLoader';

export const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const allPhotos = await loadAllPhotos();
        setPhotos(allPhotos);
      } catch (err) {
        setError('Failed to load photos from repository');
        console.error('Error loading photos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const handleImageLoad = useCallback(() => {
    setLoadedCount(prev => prev + 1);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-red-400 mb-2">Error loading photos</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <main className="relative">
      {photos.map((photo, index) => (
        <article key={photo.id} className="relative group">
          {/* Photo Container */}
          <div className="relative w-full overflow-hidden">
            <LazyImage
              src={photo.src}
              alt={photo.alt}
              className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-102 block"
              loading={index === 0 ? 'eager' : 'lazy'}
              onLoad={handleImageLoad}
            />
            
            {/* Date Overlay - Left Aligned */}
            <div className="absolute bottom-0 left-0 p-4 sm:p-8 z-10">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-all duration-700 ease-out">
                <div className="text-white/50">
                  <span className="text-sm sm:text-base font-light opacity-50">{photo.date}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
};