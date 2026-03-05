"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const Orb = dynamic(() => import("@/components/Orb"), { ssr: false });

type PageState = "landing" | "loading" | "result";

/* Shared mobile frame: all pages use this wrapper for consistent sizing */
const FRAME = "w-[414px] h-[852px] mx-auto relative overflow-hidden";

function Logo() {
  return (
    <div className="flex items-center gap-1 h-[33px] w-[140px] relative shrink-0">
      <div className="relative w-[28px] h-full">
        <Image src="/images/logo-icon.svg" alt="" fill className="object-contain" />
      </div>
      <div className="relative flex-1 h-[24px]">
        <Image src="/images/logo-text.svg" alt="聊心茶室" fill className="object-contain" />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between w-full px-8 py-4 bg-primary-light border-b border-[#ededed]">
      <Logo />
      <button aria-label="選單" className="p-1">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0H22V2H0V0Z" fill="black" />
          <path d="M0 7H22V9H0V7Z" fill="black" />
          <path d="M0 14H22V16H0V14Z" fill="black" />
        </svg>
      </button>
    </header>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex">
      <span className="animate-bounce [animation-delay:0ms]">.</span>
      <span className="animate-bounce [animation-delay:150ms]">.</span>
      <span className="animate-bounce [animation-delay:300ms]">.</span>
    </span>
  );
}

/* ─── Landing Page ─── */
function LandingPage({ onStartMatch }: { onStartMatch: () => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className={`${FRAME} flex flex-col bg-white`}>
      <Header />

      <section className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a3a2a] via-[#1a2a1a] to-[#0a1a0a]">
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-[350px] h-[350px] rounded-full border border-white/20" />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3 text-center text-white">
              <h1 className="text-2xl font-normal tracking-[2.16px] whitespace-nowrap">
                AI 媒合屬於你的心理師
              </h1>
              <p className="text-sm font-light tracking-[0.7px] leading-normal px-4">
                輸入你正在煩惱的事，聊心茶室會幫你分析推薦合適的心理師
              </p>
            </div>

            <div className="relative w-[345px] h-[160px] bg-[#c0d3c8] rounded-2xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.25)] p-4">
              <label className="block text-sm font-medium text-secondary-dark leading-[1.7]">
                最近讓你困擾的是什麼？
              </label>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="最近常常失眠，腦袋停不下來"
                className="w-full mt-1 bg-transparent text-sm font-normal text-[#6f7e60] placeholder-[#6f7e60] outline-none resize-none leading-[1.7]"
                rows={3}
              />
              <button
                onClick={onStartMatch}
                className="absolute bottom-[10px] right-[10px] flex items-center justify-center gap-1 px-3 py-1.5 bg-button-primary rounded-lg cursor-pointer"
              >
                <span className="text-base font-medium text-white leading-[1.7]">
                  開始媒合
                </span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 pt-2 text-center whitespace-nowrap">
              <span className="text-sm font-light text-white tracking-[0.7px]">
                想自己慢慢挑選？
              </span>
              <a href="#" className="text-base font-normal text-secondary-light leading-[1.7]">
                使用進階篩選
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen() {
  const allTips = [
    "正在深入分析需求",
    "正在比對心理師背景",
    "正在評估對話風格",
    "專業媒合值得等待",
    "諮詢內容將全程保密",
    "為您建立安全連結",
  ];

  // Randomly pick 3 tips to rotate for the 8s duration
  const [tips] = useState(() => {
    return [...allTips].sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 2600); // Syncs with the 2.6s CSS animation
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className={`${FRAME} flex flex-col items-center justify-center bg-black`}>
      <div className="absolute inset-0">
        <Orb
          hue={120}
          hoverIntensity={0.3}
          rotateOnHover={true}
          forceHoverState={true}
          backgroundColor="#000000"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <p className="text-2xl font-normal text-white tracking-[2.16px]">
          媒合中
          <LoadingDots />
        </p>
        <div className="h-6 flex items-center justify-center">
          <p
            key={currentTipIndex}
            className="text-sm font-light text-white/70 tracking-[0.7px] animate-tip"
          >
            {tips[currentTipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Result Page ─── */
function ResultPage({ onRematch }: { onRematch: () => void }) {
  return (
    <div className={`${FRAME} bg-[#dce3c4] border border-[#dbdbdb]`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <Header />
      </div>

      {/* Description text */}
      <p className="absolute top-[84px] left-[23px] w-[366px] text-[12px] text-black leading-[1.7]">
        根據你提到的
        <br />
        <span className="font-bold">
          「減肥反覆、容易復胖、很想吃東西但又對外表焦慮、壓力很大」
        </span>
        我們替你找到一位特別擅長處理這類困擾的心理師。
      </p>

      {/* Therapist Card */}
      <div className="absolute top-[164px] left-[40px] w-[333px] h-[410px] rounded-[24px] overflow-hidden border-[6px] border-white shadow-[0px_0px_13.2px_0px_rgba(152,152,152,0.25)]">
        <Image
          src="/images/therapist-zhangxinyi.png"
          alt="張心怡心理師"
          fill
          className="object-cover"
        />

        {/* Bottom gradient + blur */}
        <div className="absolute bottom-0 left-0 right-0 h-[228px] bg-gradient-to-b from-transparent to-[#ebebeb] backdrop-blur-[2.65px]" />

        {/* Name + info */}
        <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-[277px] flex flex-col text-black">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold leading-[1.7]">張心怡</span>
            <span className="text-sm font-medium leading-[1.7]">心理師</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 2C4.11929 2 3 3.11929 3 4.5V5H2.5C1.67157 5 1 5.67157 1 6.5V12.5C1 13.3284 1.67157 14 2.5 14H13.5C14.3284 14 15 13.3284 15 12.5V6.5C15 5.67157 14.3284 5 13.5 5H13V4.5C13 3.11929 11.8807 2 10.5 2H5.5ZM12 5V4.5C12 3.67157 11.3284 3 10.5 3H5.5C4.67157 3 4 3.67157 4 4.5V5H12Z" />
              </svg>
              <span className="text-base font-normal leading-[1.7]">諮心字第005273號</span>
            </div>
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM7.25 4.5C7.25 4.08579 7.58579 3.75 8 3.75C8.41421 3.75 8.75 4.08579 8.75 4.5V7.68934L10.7803 9.71967C11.0732 10.0126 11.0732 10.4874 10.7803 10.7803C10.4874 11.0732 10.0126 11.0732 9.71967 10.7803L7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5Z" />
              </svg>
              <span className="text-base font-normal leading-[1.7]">NTD$2,500</span>
            </div>
          </div>
        </div>

        {/* Inner shadow */}
        <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_2px_2px_6px_0px_rgba(0,0,0,0.81)]" />
      </div>

      {/* AI Recommendation Box */}
      <div className="absolute top-[590px] left-1/2 -translate-x-1/2 w-[366px] bg-[#f2f7f4] border border-[#38ed8c] rounded-lg px-4 py-[15px]">
        <p className="text-[16px] text-black leading-[1.7]">
          張心怡心理師有多年協助「減重心理」、「情緒性飲食」、「壓力與自我覺察」的經驗，
          <span className="font-bold">
            擅長陪伴個案重新理解飲食、身體與情緒之間的關係
          </span>
          ，找到不再依靠意志力苦撐、而是能長久維持的方式。
        </p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-[762px] left-[23px] w-[366px] flex flex-col gap-2">
        <button className="w-full flex items-center justify-center px-3 py-1.5 bg-button-primary rounded-lg cursor-pointer">
          <span className="text-base font-medium text-white leading-[1.7]">查看有空時間</span>
        </button>
        <div className="flex items-center justify-between w-full">
          <button onClick={onRematch} className="flex items-center justify-center px-3 py-1.5 rounded-lg cursor-pointer">
            <span className="text-sm font-normal text-[#606060] leading-[1.7]">重新媒合</span>
          </button>
          <button className="flex items-center justify-center px-3 py-1.5 rounded-lg cursor-pointer">
            <span className="text-sm font-normal text-[#606060] leading-[1.7]">心理師完整介紹</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page Controller ─── */
export default function AiMatchPage() {
  const [pageState, setPageState] = useState<PageState>("landing");

  useEffect(() => {
    if (pageState === "loading") {
      const timer = setTimeout(() => setPageState("result"), 8000);
      return () => clearTimeout(timer);
    }
  }, [pageState]);

  const handleStartMatch = () => setPageState("loading");
  const handleRematch = () => setPageState("landing");

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {pageState === "loading" && <LoadingScreen />}
      {pageState === "result" && <ResultPage onRematch={handleRematch} />}
      {pageState === "landing" && <LandingPage onStartMatch={handleStartMatch} />}
    </div>
  );
}
