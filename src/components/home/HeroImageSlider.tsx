import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Hammer,
  Briefcase,
  ArrowRight
} from 'lucide-react';

interface SlideItem {
  id: string;
  image: string;
  alt: string;
  tag: string;
  tagIcon: React.ComponentType<{ className?: string }>;
  tagColor: string;
  headline: string;
  subheadline: string;
  keyMetric: {
    label: string;
    value: string;
  };
  secondaryMetric: {
    label: string;
    value: string;
  };
  features: string[];
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
    id: 'family-home-loan',
    image: '/images/hero/family-dream-home.jpg',
    alt: 'Happy Indian family in front of their new dream home in Hyderabad',
    tag: 'Dream Home Loan',
    tagIcon: Home,
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    headline: "Make Your Family's Dream Home a Reality",
    subheadline: 'End-to-end guidance for flats, independent villas & resale homes across Hyderabad & Telangana with preferential lender rates.',
    keyMetric: {
      label: 'Indicative Rates',
      value: 'From 8.50%*'
    },
    secondaryMetric: {
      label: 'Repayment Tenure',
      value: 'Up to 30 Yrs'
    },
    features: [
      'Low processing charges & transparent terms',
      'High loan eligibility up to ₹10 Crores',
      'Authorized lender doorstep service'
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
    id: 'home-construction-loan',
    image: '/images/hero/home-construction.jpg',
    alt: 'Residential house building and home construction in progress in Hyderabad',
    tag: 'Construction & Renovation',
    tagIcon: Hammer,
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    headline: 'Build & Construct With Full Financial Confidence',
    subheadline: 'Staged fund disbursements matching your exact civil construction phases for plots, additional floors, or comprehensive home remodeling.',
    keyMetric: {
      label: 'Disbursement Mode',
      value: 'Stage-by-Stage'
    },
    secondaryMetric: {
      label: 'Loan Value',
      value: 'Up to 90%*'
    },
    features: [
      'Flexible draws as civil work advances',
      'Plot purchase + construction combo funding',
      'Architect estimate assistance'
    ],
    primaryCta: {
      text: 'Explore Construction Loans',
      url: '/services/construction-loan'
    },
    secondaryCta: {
      text: 'Check Eligibility',
      url: '/eligibility'
    }
  },
  {
    id: 'business-msme-loan',
    image: '/images/hero/business-msme-loan.jpg',
    alt: 'Financial advisor discussing best business loan options for MSMEs in 2025',
    tag: 'MSME & Business Credit',
    tagIcon: Briefcase,
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    headline: 'Best Business Loan Options for MSMEs in 2025-26',
    subheadline: 'Accelerate business expansion, manage working capital, or purchase high-yield commercial machinery with collateral-free options.',
    keyMetric: {
      label: 'Collateral Option',
      value: 'Collateral-Free'
    },
    secondaryMetric: {
      label: 'Sanction Speed',
      value: 'Fast 24-48 Hrs*'
    },
    features: [
      'Unsecured working capital lines up to ₹1 Crore',
      'Machinery & expansion credit up to ₹10 Crores',
      'GST & bank-statement based assessment'
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

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Go to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  }, []);

  // Jump to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50; // update progress every 50ms
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

  // Touch handlers for mobile swipe
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
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-900 group select-none transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Loan Showcase Slider"
    >
      {/* Aspect Ratio Container */}
      <div className="relative w-full h-[520px] sm:h-[540px] md:h-[560px] lg:h-[580px] overflow-hidden">
        
        {/* Horizontal Sliding Track */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative w-full h-full shrink-0 overflow-hidden"
              aria-hidden={index !== currentIndex}
            >
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Gradient Dark Scrim Overlays for Superior Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />

              {/* Top Right Floating Badge */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 text-xs font-semibold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Referral Desk</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Foreground Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-7 md:p-8 pointer-events-none">
          
          {/* Top Bar: Slide Category Tab Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 max-w-full overflow-x-auto scrollbar-none">
              {SLIDES.map((slide, idx) => {
                const Icon = slide.tagIcon;
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{slide.tag.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Slide Counter badge */}
            <div className="px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/60 text-[11px] font-mono font-bold text-slate-300 backdrop-blur-md">
              <span className="text-accent">{currentIndex + 1}</span> / {SLIDES.length}
            </div>
          </div>

          {/* Bottom Area: Slide Information, Metrics & Call to Actions */}
          <div className="space-y-4 max-w-xl pointer-events-auto">
            
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm transition-all duration-300">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${currentSlide.tagColor} border`}>
                <TagIcon className="w-3.5 h-3.5" />
                <span>{currentSlide.tag}</span>
              </span>
              <span className="text-slate-300 text-[11px] hidden sm:inline">Hyderabad & Telangana</span>
            </div>

            {/* Headline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
              {currentSlide.headline}
            </h2>

            {/* Subheadline */}
            <p className="text-xs sm:text-sm text-slate-200/95 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal drop-shadow">
              {currentSlide.subheadline}
            </p>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 py-1">
              <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">{currentSlide.keyMetric.label}</span>
                <span className="text-sm sm:text-base font-extrabold text-white font-mono">{currentSlide.keyMetric.value}</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">{currentSlide.secondaryMetric.label}</span>
                <span className="text-sm sm:text-base font-extrabold text-accent font-mono">{currentSlide.secondaryMetric.value}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Link
                to={currentSlide.primaryCta.url}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-secondary via-blue-600 to-secondary hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
              >
                <span>{currentSlide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {currentSlide.secondaryCta.url.startsWith('#') ? (
                <a
                  href={currentSlide.secondaryCta.url}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600/60 backdrop-blur-md active:scale-95 transition-all duration-200"
                >
                  {currentSlide.secondaryCta.text}
                </a>
              ) : (
                <Link
                  to={currentSlide.secondaryCta.url}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/90 border border-slate-600/60 backdrop-blur-md active:scale-95 transition-all duration-200"
                >
                  {currentSlide.secondaryCta.text}
                </Link>
              )}
            </div>

          </div>

        </div>

        {/* Carousel Navigation Arrow Controls */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-700/70 hover:border-blue-500 flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 shadow-lg active:scale-90 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-blue-600 text-white border border-slate-700/70 hover:border-blue-500 flex items-center justify-center backdrop-blur-md opacity-80 hover:opacity-100 shadow-lg active:scale-90 transition-all duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Autoplay Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 z-30">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-accent transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              type="button"
              aria-label={`Go to slide ${idx + 1}: ${slide.tag}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-7 bg-accent shadow-sm shadow-amber-500/50'
                  : 'w-2 bg-slate-500/60 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
