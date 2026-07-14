import { useEffect } from 'react';
import { calculateHeaderOffset } from '../services/scrollUtils';

/**
 * Hook to handle smart scrolling to hash sections once components are ready.
 * @param isReady Boolean indicating if the target page/component has finished rendering.
 */
export const useScrollToSection = (isReady: boolean) => {
    useEffect(() => {
        if (!isReady) return;

        const handleNavigation = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#article/')) return; // Shared navigation handled by App.tsx

            // Handle both #obs/section and specific internal tool anchors
            const match = hash.match(/#obs\/(.+)/) || hash.match(/#(.+)/);
            if (!match) return;

            const sectionId = match[1].split('?')[0];
            const element = document.getElementById(sectionId);

            if (!element) {
                // Only warn if it's a known internal section or if not navigating to a subpage
                return;
            }

            // Use IntersectionObserver to wait until the element is actually present in layout
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].intersectionRatio >= 0) {
                        const headerOffset = calculateHeaderOffset();
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        observer.disconnect();
                    }
                },
                { threshold: 0.01 }
            );

            observer.observe(element);
            return () => observer.disconnect();
        };

        handleNavigation();

        // Also listen for partial hash changes if needed internally
        window.addEventListener('hashchange', handleNavigation);
        return () => window.removeEventListener('hashchange', handleNavigation);
    }, [isReady]);
};
