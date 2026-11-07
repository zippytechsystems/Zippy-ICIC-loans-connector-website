import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Hammer,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  MapPin
} from 'lucide-react';

// Direct asset imports ensure Vite compiles and bundles them with relative URLs (./assets/...)
import familyDreamHomeImg from '../../assets/hero/family-dream-home.jpg';
import homeConstructionImg from '../../assets/hero/home-construction.jpg';
import businessMsmeLoanImg from '../../assets/hero/business-msme-loan.jpg';

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  tabLabel: string;
  tag: string;
  tagIcon: React.ComponentType<{ className?: string }>;
  tagColor: string;
  headline: string;
  subheadline: string;
  metrics: {
    label: string;
    value: string;
  }[];
  highlights: string[];
  primaryCta: {
    text: string;
    url: string;
  };
  secondaryCta: {
    text: string;
    url: string;
  };
}

const SLIDES: SlideItem[] = [
  {
    id: 'family-dream-home',
    image: familyDreamHomeImg,
    alt: 'Happy Indian family in front of their new dream home in Hyderabad',
    tabLabel: 'Family Dream Home Loan',
    tag: 'Dream Home Loans',
    tagIcon: Home,
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    headline: "Make Your Family's Dream Home a Reality",
    subheadline: 'End-to-end guidance for new flats, independent villas, and resale houses across Hyderabad & Telangana with competitive bank interest rates.',
    metrics: [
      { label: 'Indicative Rates', value: 'From 8.00%*' },
      { label: 'Max Tenure', value: 'Up to 30 Yrs' },
      { label: 'Sanction Speed', value: '24-48 Hrs*' }
    ],
    highlights: [
      'Low processing charges & 100% transparent advisory',
      'High loan eligibility up to ₹10 Crores',
      'Doorstep assistance in Hyderabad & Secunderabad'
    ],
    primaryCta: {
      text: 'Explore Home Loans',
      url: '/services/home-loan'
    },
    secondaryCta: {
      text: 'Check Eligibility',
      url: '/eligibility'
    }
  },
  {
    id: 'home-construction',
    image: homeConstructionImg,
    alt: 'Residential house building and home construction in progress in Hyderabad',
    tabLabel: 'Construction & Renovation',
    tag: 'Construction & Plot Loans',
    tagIcon: Hammer,
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    headline: 'Construct & Renovate Your Home With Full Confidence',
    subheadline: 'Staged fund disbursements matching your exact civil construction phases for open plots, new floor additions, or comprehensive home remodeling.',
    metrics: [
      { label: 'Disbursement Mode', value: 'Stage-by-Stage' },
      { label: 'Loan Funding', value: 'Up to 90%*' },
      { label: 'Advisory Charge', value: 'Zero Upfront' }
    ],
    highlights: [
      'Flexible draws as civil construction progresses',
      'Plot purchase + house construction combination loan',
      'Architect cost estimate review & lender dossier prep'
    ],
    primaryCta: {
      text: 'Explore Construction Loans',
      url: '/services/construction-loan'
    },
    secondaryCta: {
      text: 'Calculate EMI',
      url: '#emi-calculator'
    }
  },
  {
    id: 'business-msme-loan',
    image: businessMsmeLoanImg,
    alt: 'Financial advisor discussing best business loan options for MSMEs in 2025',
    tabLabel: 'Business & MSME Loans',
    tag: 'MSME & Business Credit 2025',
    tagIcon: Briefcase,
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    headline: 'Best Business Loan Options for MSMEs in 2025-26',
    subheadline: 'Accelerate business expansion, manage urgent working capital, or purchase commercial machinery with fast collateral-free financing options.',
    metrics: [
      { label: 'Collateral Option', value: 'Collateral-Free' },
      { label: 'Credit Limit', value: 'Up to ₹10 Cr' },
      { label: 'Processing', value: 'Express 24-Hr' }
    ],
    highlights: [
      'Unsecured working capital lines up to ₹1 Crore',
      'Machinery, plant & trade inventory expansion credit',
      'Fast sanction based on GST & bank banking score'
    ],
    primaryCta: {
      text: 'Explore Business Loans',
      url: '/services/business-loan'
    },
    secondaryCta: {
      text: 'Submit Enquiry',
      url: '#enquiry-form'
    }
  }
];

const AUTOPLAY_INTERVAL = 5000; // 5 seconds per slide

export const HeroImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<number | null>(null);

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Direct jump
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Vite development & runtime telemetry logging
  useEffect(() => {
    console.log(
      `%c[Vite:HeroSlider] Active slide ${currentIndex + 1}/${SLIDES.length}: "${SLIDES[currentIndex].tabLabel}" (${SLIDES[currentIndex].headline})`,
      'color: #38bdf8; font-weight: bold;'
    );
  }, [currentIndex]);

  // Autoplay timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const stepIncrement = (intervalStep / AUTOPLAY_INTERVAL) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null) {
      if (touchDeltaX > 50) {
        prevSlide();
      } else if (touchDeltaX < -50) {
        nextSlide();
      }
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsPaused(false);
  };

  const currentSlide = SLIDES[currentIndex];
  const TagIcon = currentSlide.tagIcon;

  return (
    <section
      className="relative w-full bg-slate-950 text-white overflow-hidden select-none border-b border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Loan Categories Hero Slider"
    >
      {/* Main Slider Viewport: Grand Height for Maximum First-Impression */}
      <div className="relative w-full min-h-[590px] xs:min-h-[580px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[680px] overflow-hidden flex items-center">
        
        {/* Horizontal Sliding Track (Automatic side sliding with GPU acceleration) */}
        <div
          className="absolute inset-0 flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 overflow-hidden"
              aria-hidden={index !== currentIndex}
            >
              {/* Image with High-Definition object-cover and dual-path fallback */}
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true';
                    target.src = `/images/hero/${slide.id}.jpg`;
                    console.warn(`[Vite:HeroSlider] Bundled image load issue for ${slide.id}, falling back to public image.`);
                  }
                }}
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out brightness-105"
              />

              {/* Balanced cinematic scrim overlays: clear image visibility on right, optimal text contrast on left */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 md:via-slate-950/50 to-slate-950/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-slate-950/30 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(23,105,170,0.25),transparent_60%)] pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Foreground Content: Anchored in Max-Width Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-10 sm:py-14 md:py-16 pb-16 sm:pb-14">
          
          {/* Top Quick Category Navigation Tabs (User can click any tab to switch directly) */}
          <div className="mb-4 sm:mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl max-w-full overflow-x-auto scrollbar-none touch-pan-x">
              {SLIDES.map((slide, idx) => {
                const Icon = slide.tagIcon;
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    type="button"
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-secondary to-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{slide.tabLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Region Trust Tag */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-slate-300 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Hyderabad • Secunderabad • Telangana</span>
            </div>
          </div>

          {/* Active Slide Text & Call to Actions */}
          <div className="max-w-3xl space-y-4 sm:space-y-5">
            
            {/* Category Tag Badge */}
            <div className="inline-flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider ${currentSlide.tagColor} border backdrop-blur-md shadow-sm`}>
                <TagIcon className="w-3.5 h-3.5" />
                <span>{currentSlide.tag}</span>
              </span>
              <span className="hidden xs:inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-blue-950/70 border border-blue-500/30 text-blue-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Instant Referral Guidance</span>
              </span>
            </div>

            {/* Big Headline for Unforgettable First Impression */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.12] drop-shadow-lg">
              {currentSlide.headline}
            </h1>

            {/* Subheadline Description */}
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-slate-200/95 leading-relaxed font-normal max-w-2xl drop-shadow">
              {currentSlide.subheadline}
            </p>

            {/* Key Metrics Floating Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-1.5 sm:py-2 max-w-xl">
              {currentSlide.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-700/70 backdrop-blur-md shadow-md hover:border-slate-600 transition-colors"
                >
                  <span className="text-[9px] xs:text-[10px] sm:text-xs text-slate-400 block font-medium uppercase tracking-wider truncate">
                    {metric.label}
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base md:text-lg font-extrabold text-white font-mono block mt-0.5 truncate">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Feature Checkmarks */}
            <div className="pt-0.5 sm:pt-1 space-y-1 sm:space-y-1.5 text-xs text-slate-200">
              {currentSlide.highlights.map((h, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] sm:text-xs">{h}</span>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 sm:pt-3 flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-4">
              <Link
                to={currentSlide.primaryCta.url}
                className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-secondary via-blue-600 to-secondary hover:from-blue-600 hover:to-blue-700 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base text-center"
              >
                <span>{currentSlide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {currentSlide.secondaryCta.url.startsWith('#') ? (
                <a
                  href={currentSlide.secondaryCta.url}
                  className="w-full xs:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm sm:text-base text-center flex items-center justify-center"
                >
                  {currentSlide.secondaryCta.text}
                </a>
              ) : (
                <Link
                  to={currentSlide.secondaryCta.url}
                  className="w-full xs:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200 text-sm sm:text-base text-center flex items-center justify-center"
                >
                  {currentSlide.secondaryCta.text}
                </Link>
              )}
            </div>

          </div>

        </div>

        {/* Carousel Navigation Arrow Controls (Visible on tablets and desktop, swipe enabled on mobile) */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/75 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 items-center justify-center backdrop-blur-md shadow-2xl active:scale-90 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/75 hover:bg-blue-600 text-white border border-slate-700/80 hover:border-blue-500 items-center justify-center backdrop-blur-md shadow-2xl active:scale-90 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Autoplay Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-900/80 z-30">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-secondary to-accent transition-all duration-100 ease-linear shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 sm:gap-2.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              type="button"
              aria-label={`Switch to slide ${idx + 1}: ${slide.tabLabel}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-6 sm:w-8 bg-accent shadow-md shadow-amber-500/50'
                  : 'w-2 sm:w-2.5 bg-slate-600/70 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
