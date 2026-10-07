"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const videos = [
  {
    titleKey: "videoTitle1",
    poster: "/videos/loop-bosphorus-poster.jpg",
    desktopSrc: "/videos/loop-bosphorus.mp4",
    mobileSrc: "/videos/loop-bosphorus-lite.mp4",
  },
  {
    titleKey: "videoTitle2",
    poster: "/videos/loop-mosque-poster.jpg",
    desktopSrc: "/videos/loop-mosque.mp4",
    mobileSrc: "/videos/loop-mosque-lite.mp4",
  },
  {
    titleKey: "videoTitle3",
    poster: "/videos/loop-cappadocia-poster.jpg",
    desktopSrc: "/videos/loop-cappadocia.mp4",
    mobileSrc: "/videos/loop-cappadocia-lite.mp4",
  },
];

function PromoVideo({
  titleKey,
  poster,
  desktopSrc,
  mobileSrc,
}: (typeof videos)[number] & { titleKey: string }) {
  const t = useTranslations("home");
  const title = t(titleKey);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const shouldLoad = isInView && isPageVisible && !isOpen;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDevice = () => setIsMobile(mediaQuery.matches);
    updateDevice();
    mediaQuery.addEventListener("change", updateDevice);
    return () => mediaQuery.removeEventListener("change", updateDevice);
  }, []);

  useEffect(() => {
    const updatePageVisibility = () =>
      setIsPageVisible(document.visibilityState === "visible");
    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);
    return () =>
      document.removeEventListener("visibilitychange", updatePageVisibility);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad) {
      video.load();
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.load();
    }
  }, [shouldLoad, isMobile]);

  return (
    <article className="group">
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted shadow-sm"
      >
        <video
          ref={videoRef}
          aria-label={title}
          autoPlay={shouldLoad}
          muted
          loop
          playsInline
          disablePictureInPicture
          preload={shouldLoad ? "auto" : "none"}
          poster={poster}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        >
          {shouldLoad && (
            <source
              src={isMobile ? mobileSrc : desktopSrc}
              type="video/mp4"
            />
          )}
        </video>
        <button
          type="button"
          aria-label={t("playVideo", { title })}
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/20 focus-visible:bg-black/20 focus-visible:outline-none"
        >
          <span className="flex h-14 w-14 scale-100 items-center justify-center rounded-full bg-white/90 text-navy opacity-100 shadow-lg transition-all duration-300 sm:scale-90 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100 sm:group-focus-within:scale-100 sm:group-focus-within:opacity-100">
            <Play className="ml-1 h-6 w-6" fill="currentColor" />
          </span>
        </button>
      </div>
      <h3 className="mt-4 text-center text-lg font-bold text-navy transition-colors group-hover:text-gold dark:text-white">
        {title}
      </h3>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="w-[min(96vw,1400px,156.44vh)] max-w-none gap-0 border-0 bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <video
            autoPlay={isOpen}
            controls
            disablePictureInPicture
            loop
            muted
            playsInline
            preload={isOpen ? "auto" : "none"}
            poster={poster}
            className="block aspect-video w-full rounded-xl object-contain"
          >
            {isOpen && (
              <source
                src={isMobile ? mobileSrc : desktopSrc}
                type="video/mp4"
              />
            )}
          </video>
        </DialogContent>
      </Dialog>
    </article>
  );
}

export function PromoVideos() {
  const t = useTranslations("home");
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-navy dark:text-white mb-3">
            {t("promoVideosTitle")}
          </h2>
          <div className="w-24 h-1 bg-gold rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {videos.map((video) => (
            <PromoVideo key={video.titleKey} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
