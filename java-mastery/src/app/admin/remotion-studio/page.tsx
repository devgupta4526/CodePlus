"use client";

import React, { useState } from "react";
import { Player } from "@remotion/player";
import { SlideDeckSequencer } from "@/remotion/compositions/SlideDeckSequencer";
import { TitleSlide } from "@/remotion/compositions/TitleSlide";
import { CodeSlide } from "@/remotion/compositions/CodeSlide";
import { CompareSlide } from "@/remotion/compositions/CompareSlide";
import { DiagramSlide } from "@/remotion/compositions/DiagramSlide";

export default function RemotionStudioPage() {
  const [selectedComposition, setSelectedComposition] = useState<string>("full");

  return (
    <div className="min-h-screen bg-[#06080e] text-white p-8 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-indigo-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-2">
            🎬 Remotion Motion Graphics Studio
          </div>
          <h1 className="text-3xl font-extrabold text-white">
            Java Mastery Cinematic Motion Deck
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Frame-accurate 60 FPS React video engine & interactive presentation studio
          </p>
        </div>

        {/* Composition Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedComposition("full")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedComposition === "full"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Full Deck (16s)
          </button>
          <button
            onClick={() => setSelectedComposition("title")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedComposition === "title"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Title
          </button>
          <button
            onClick={() => setSelectedComposition("diagram")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedComposition === "diagram"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Diagram
          </button>
          <button
            onClick={() => setSelectedComposition("compare")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedComposition === "compare"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Compare
          </button>
          <button
            onClick={() => setSelectedComposition("code")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedComposition === "code"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Code & Memory
          </button>
        </div>
      </div>

      {/* Main Remotion Player Box */}
      <div className="max-w-7xl mx-auto bg-slate-950/80 rounded-2xl border border-slate-800 p-6 shadow-2xl overflow-hidden">
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-indigo-500/20 shadow-inner bg-black">
          {selectedComposition === "full" && (
            <Player
              component={SlideDeckSequencer}
              durationInFrames={960}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              controls
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
            />
          )}

          {selectedComposition === "title" && (
            <Player
              component={TitleSlide}
              durationInFrames={180}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              controls
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
              inputProps={{
                title: "Object-Oriented Programming",
                subtitle: "Mastering Classes, Objects, Inheritance & Polymorphism in Java",
                badge: "JAVA MASTERY STUDIO",
                lessonNum: "LESSON 01",
                author: "Java Mastery Deck",
              }}
            />
          )}

          {selectedComposition === "diagram" && (
            <Player
              component={DiagramSlide}
              durationInFrames={240}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              controls
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
              inputProps={{
                title: "The Java Compilation & Execution Pipeline",
                subtitle: "How Java source code is transformed into bytecode and executed by the JVM",
              }}
            />
          )}

          {selectedComposition === "compare" && (
            <Player
              component={CompareSlide}
              durationInFrames={240}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              controls
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
              inputProps={{
                title: "Primitive Types vs Reference Types",
                subtitle: "Understanding memory allocation, passing conventions, and default values in Java",
              }}
            />
          )}

          {selectedComposition === "code" && (
            <Player
              component={CodeSlide}
              durationInFrames={300}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              controls
              style={{ width: "100%", height: "100%" }}
              autoPlay
              loop
              inputProps={{
                title: "Object Instantiation & Memory Layout",
                activeLine: 11,
              }}
            />
          )}
        </div>

        {/* Control & Export Notes */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
              ⚡ 60 FPS Motion Controls
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Use the timeline slider to scrub frame-by-frame (`useCurrentFrame`), pause at key moments, or toggle full screen.
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              📹 CLI HD Export Command
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              npm run remotion:render
            </p>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
              🎨 Interactive Studio Preview
            </h4>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              npx remotion preview src/remotion/index.ts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
