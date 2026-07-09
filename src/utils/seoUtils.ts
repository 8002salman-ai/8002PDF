// SEO utilities for dynamic meta tag management in SPA
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  canonicalUrl?: string;
}

export const toolMetadata: Record<string, SEOMetadata> = {
  home: {
    title: '8002PDF - Free Online PDF & Utility Tools | Merge, Split, Compress',
    description: 'Free online PDF tools and utilities. Merge, split, compress, convert PDFs. QR codes, barcodes, calculators, text tools, and more. 100% privacy - no account needed.',
    keywords: ['pdf tools', 'merge pdf', 'split pdf', 'compress pdf', 'free online tools', 'qr code generator', 'barcode generator', 'pdf converter'],
    url: 'https://8002pdf.com',
    type: 'website',
  },
  merge: {
    title: 'Merge PDF - Combine Multiple PDFs Online | 8002PDF',
    description: 'Combine multiple PDF files into one. Free, fast, and secure. No login required. Merge up to 50 PDFs at once.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf', 'pdf merger', 'merge pdf online', 'free pdf merge'],
    canonicalUrl: 'https://8002pdf.com/#merge',
  },
  split: {
    title: 'Split PDF - Extract Pages Online | 8002PDF',
    description: 'Split PDF files by page ranges. Extract specific pages from your PDF. Free, fast, and secure.',
    keywords: ['split pdf', 'extract pages', 'pdf splitter', 'separate pdf', 'pdf page extractor', 'free split pdf'],
    canonicalUrl: 'https://8002pdf.com/#split',
  },
  compress: {
    title: 'Compress PDF - Reduce File Size | 8002PDF',
    description: 'Reduce PDF file size without losing quality. Free online PDF compression tool. Works with any PDF size.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor', 'shrink pdf', 'smaller pdf file', 'free compress pdf'],
    canonicalUrl: 'https://8002pdf.com/#compress',
  },
  extract: {
    title: 'Extract PDF Pages - Get Specific Pages | 8002PDF',
    description: 'Extract specific pages from your PDF file. Select page numbers and download as new PDF.',
    keywords: ['extract pages', 'pdf page extractor', 'get pdf pages', 'extract from pdf', 'page extraction'],
    canonicalUrl: 'https://8002pdf.com/#extract',
  },
  'delete-pages': {
    title: 'Delete PDF Pages - Remove Pages Online | 8002PDF',
    description: 'Delete unwanted pages from your PDF file. Select and remove pages instantly.',
    keywords: ['delete pdf pages', 'remove pages', 'page deletion', 'edit pdf pages'],
    canonicalUrl: 'https://8002pdf.com/#delete-pages',
  },
  rotate: {
    title: 'Rotate PDF - Fix Page Orientation | 8002PDF',
    description: 'Rotate PDF pages 90°, 180°, or 270°. Fix page orientation issues.',
    keywords: ['rotate pdf', 'pdf rotation', 'fix pdf orientation', 'rotate pages'],
    canonicalUrl: 'https://8002pdf.com/#rotate',
  },
  watermark: {
    title: 'Add Watermark to PDF - Protect Your Documents | 8002PDF',
    description: 'Add text watermarks to your PDF documents. Customize opacity, rotation, and font size.',
    keywords: ['watermark pdf', 'add watermark', 'text watermark', 'pdf protection', 'document watermark'],
    canonicalUrl: 'https://8002pdf.com/#watermark',
  },
  'image-to-pdf': {
    title: 'Image to PDF - Convert Images Online | 8002PDF',
    description: 'Convert images (JPG, PNG, WebP) to PDF files. Batch conversion supported.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert image', 'image converter'],
    canonicalUrl: 'https://8002pdf.com/#image-to-pdf',
  },
  'pdf-to-image': {
    title: 'PDF to Image - Convert PDFs to Images | 8002PDF',
    description: 'Convert PDF pages to PNG or JPEG images. High quality output, batch download.',
    keywords: ['pdf to image', 'pdf to png', 'pdf to jpg', 'convert pdf', 'pdf converter'],
    canonicalUrl: 'https://8002pdf.com/#pdf-to-image',
  },
  metadata: {
    title: 'Edit PDF Metadata - Modify Document Properties | 8002PDF',
    description: 'Edit PDF title, author, subject, and keywords. View and modify document metadata.',
    keywords: ['pdf metadata', 'edit pdf properties', 'document metadata', 'pdf editor'],
    canonicalUrl: 'https://8002pdf.com/#metadata',
  },
  protect: {
    title: 'Protect PDF - Secure Your Documents | 8002PDF',
    description: 'Add password protection to your PDF documents. Secure sensitive information.',
    keywords: ['protect pdf', 'pdf password', 'secure pdf', 'encrypt pdf', 'password protect'],
    canonicalUrl: 'https://8002pdf.com/#protect',
  },
  'qr-generator': {
    title: 'QR Code Generator - Create QR Codes Free | 8002PDF',
    description: 'Generate QR codes from text, URLs, or emails. Customize size and colors. Download as PNG.',
    keywords: ['qr code generator', 'create qr code', 'qr code maker', 'free qr code', 'qr generator'],
    canonicalUrl: 'https://8002pdf.com/#qr-generator',
  },
  'qr-scanner': {
    title: 'QR Code Scanner - Scan QR Codes Online | 8002PDF',
    description: 'Scan QR codes using your camera or upload an image. Fast and accurate QR decoding.',
    keywords: ['qr code scanner', 'scan qr code', 'qr decoder', 'qr reader', 'online qr scanner'],
    canonicalUrl: 'https://8002pdf.com/#qr-scanner',
  },
  'barcode-generator': {
    title: 'Barcode Generator - Create Barcodes Free | 8002PDF',
    description: 'Generate barcodes in multiple formats (CODE128, EAN-13, UPC, CODE39). Download as PNG or SVG.',
    keywords: ['barcode generator', 'create barcode', 'barcode maker', 'free barcode', 'barcode creator'],
    canonicalUrl: 'https://8002pdf.com/#barcode-generator',
  },
  'word-counter': {
    title: 'Word Counter - Count Words & Characters | 8002PDF',
    description: 'Count words, characters, sentences, and paragraphs. Real-time statistics.',
    keywords: ['word counter', 'character counter', 'word count tool', 'text counter'],
    canonicalUrl: 'https://8002pdf.com/#word-counter',
  },
  'case-converter': {
    title: 'Case Converter - Change Text Case Online | 8002PDF',
    description: 'Convert text to uppercase, lowercase, camelCase, snake_case, and more. 10+ formats.',
    keywords: ['case converter', 'text case converter', 'uppercase converter', 'lowercase converter'],
    canonicalUrl: 'https://8002pdf.com/#case-converter',
  },
  'password-generator': {
    title: 'Password Generator - Create Strong Passwords | 8002PDF',
    description: 'Generate secure random passwords. Customize length and character types.',
    keywords: ['password generator', 'random password', 'strong password', 'secure password generator'],
    canonicalUrl: 'https://8002pdf.com/#password-generator',
  },
  'color-picker': {
    title: 'Color Picker - HEX RGB HSL Converter | 8002PDF',
    description: 'Pick colors and convert between HEX, RGB, HSL formats. Generate color palettes.',
    keywords: ['color picker', 'color converter', 'hex to rgb', 'color palette', 'color tool'],
    canonicalUrl: 'https://8002pdf.com/#color-picker',
  },
  'json-formatter': {
    title: 'JSON Formatter - Format & Validate JSON | 8002PDF',
    description: 'Format, minify, and validate JSON. Pretty print with customizable indentation.',
    keywords: ['json formatter', 'json validator', 'json pretty print', 'json minifier'],
    canonicalUrl: 'https://8002pdf.com/#json-formatter',
  },
  'image-compressor': {
    title: 'Image Compressor - Compress Images Online | 8002PDF',
    description: 'Reduce image file size while maintaining quality. Batch compression, multiple formats.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'image optimizer'],
    canonicalUrl: 'https://8002pdf.com/#image-compressor',
  },
};

export function updateSEOMeta(page: string, customMeta?: Partial<SEOMetadata>) {
  const metadata = toolMetadata[page] || toolMetadata.home;
  const meta = { ...metadata, ...customMeta };

  // Update title
  document.title = meta.title;

  // Update or create meta tags
  updateMetaTag('description', meta.description);
  updateMetaTag('keywords', meta.keywords.join(', '));
  updateMetaTag('og:title', meta.title, 'property');
  updateMetaTag('og:description', meta.description, 'property');
  updateMetaTag('og:type', meta.type || 'website', 'property');
  updateMetaTag('og:url', meta.url || meta.canonicalUrl || 'https://8002pdf.com', 'property');
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', meta.title, 'name');
  updateMetaTag('twitter:description', meta.description, 'name');

  // Update canonical URL
  if (meta.canonicalUrl) {
    updateCanonicalURL(meta.canonicalUrl);
  }

  // Update structured data
  updateStructuredData(page, meta);
}

function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonicalURL(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);
}

function updateStructuredData(page: string, meta: SEOMetadata) {
  // Remove existing script
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Create schema.org structured data
  const schema = {
    '@context': 'https://schema.org',
    '@type': page === 'home' ? 'WebApplication' : 'WebPage',
    name: meta.title,
    description: meta.description,
    url: meta.url || meta.canonicalUrl || 'https://8002pdf.com',
    applicationCategory: 'Utility',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Add breadcrumb for non-home pages
  if (page !== 'home') {
    (schema as any).breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://8002pdf.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.title.split(' - ')[0],
          item: meta.canonicalUrl || 'https://8002pdf.com',
        },
      ],
    };
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
