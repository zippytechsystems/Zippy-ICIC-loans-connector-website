import { useEffect } from 'react';
import { BRAND_CONFIG } from '../../config/brandConfig';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalPath = ''
}) => {
  useEffect(() => {
    // Update Document Title
    const fullTitle = `${title} | ${BRAND_CONFIG.brandName}`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords, canonicalPath]);

  return null;
};
