import { useEffect, useRef, useState } from 'react';
import { getSettings } from '../store/adminStore';

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'footer' | 'inContent';
}

export default function AdBanner({ slot }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [settings] = useState(getSettings());

  const slotMap = {
    header: {
      adsense: settings.adsenseSlotHeader,
      adsterra: settings.adsterraScriptHeader,
    },
    sidebar: {
      adsense: settings.adsenseSlotSidebar,
      adsterra: settings.adsterraScriptSidebar,
    },
    footer: {
      adsense: settings.adsenseSlotFooter,
      adsterra: settings.adsterraScriptFooter,
    },
    inContent: {
      adsense: settings.adsenseSlotInContent,
      adsterra: settings.adsterraScriptInContent,
    },
  };

  const currentSlot = slotMap[slot];

  useEffect(() => {
    if (!containerRef.current) return;

    // Insert Adsterra script
    if (settings.adsterraEnabled && currentSlot.adsterra) {
      containerRef.current.innerHTML = currentSlot.adsterra;
      // Execute any scripts in the inserted HTML
      const scripts = containerRef.current.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }

    // Initialize AdSense
    if (settings.adsenseEnabled && currentSlot.adsense && settings.adsensePublisherId) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // AdSense might not be loaded, silently continue
      }
    }
  }, [settings.adsterraEnabled, settings.adsenseEnabled, currentSlot.adsterra, currentSlot.adsense, settings.adsensePublisherId]);

  // Don't render if neither ad network is configured for this slot
  const hasAdsense = settings.adsenseEnabled && currentSlot.adsense && settings.adsensePublisherId;
  const hasAdsterra = settings.adsterraEnabled && currentSlot.adsterra;

  if (!hasAdsense && !hasAdsterra) {
    return null;
  }

  return (
    <div className="w-full flex justify-center my-4">
      <div ref={containerRef} className="max-w-full overflow-hidden min-h-[90px] bg-gray-50 rounded-lg flex items-center justify-center">
        {hasAdsense && !hasAdsterra && (
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '300px', minHeight: '90px' }}
            data-ad-client={settings.adsensePublisherId}
            data-ad-slot={currentSlot.adsense}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
        {!hasAdsense && !hasAdsterra && (
          <p className="text-xs text-gray-300">Ad Space</p>
        )}
      </div>
    </div>
  );
}
