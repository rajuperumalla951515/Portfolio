import { useEffect } from 'react';

const setMetaTag = (attrName, attrValue, content) => {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (content === undefined || content === null) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setCanonical = (url) => {
  let element = document.querySelector('link[rel="canonical"]');
  if (!url) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', url);
};

export const usePageSEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://www.rajuperumalla.in/images/profile.png',
  robots = 'index, follow',
}) => {
  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
      setMetaTag('name', 'title', title);
      setMetaTag('property', 'og:title', title);
      setMetaTag('property', 'twitter:title', title);
    }

    // 2. Description
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'twitter:description', description);
    }

    // 3. Canonical URL
    if (canonical) {
      setCanonical(canonical);
      setMetaTag('property', 'og:url', canonical);
      setMetaTag('property', 'twitter:url', canonical);
    } else {
      setCanonical(null);
      setMetaTag('property', 'og:url', null);
      setMetaTag('property', 'twitter:url', null);
    }

    // 4. Open Graph Type & Images
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
      setMetaTag('property', 'twitter:image', ogImage);
    }

    // 5. Robots
    if (robots) {
      setMetaTag('name', 'robots', robots);
    }
  }, [title, description, canonical, ogType, ogImage, robots]);
};

export default usePageSEO;
