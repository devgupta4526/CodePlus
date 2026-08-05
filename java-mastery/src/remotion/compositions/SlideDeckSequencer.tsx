import React from "react";
import { Series } from "remotion";
import { TitleSlide } from "./TitleSlide";
import { DiagramSlide } from "./DiagramSlide";
import { CompareSlide } from "./CompareSlide";
import { CodeSlide } from "./CodeSlide";

export const SlideDeckSequencer: React.FC = () => {
  return (
    <Series>
      {/* Slide 1: Kinetic Title (180 frames = 3 seconds at 60fps) */}
      <Series.Sequence durationInFrames={180}>
        <TitleSlide
          title="Java Object-Oriented Programming"
          subtitle="A Cinematic Deep Dive into Memory, Classes, and Compilation Architecture"
          badge="JAVA MASTERY STUDIO"
          lessonNum="LESSON 01"
          author="Java Master Class"
        />
      </Series.Sequence>

      {/* Slide 2: Pipeline Diagram (240 frames = 4 seconds at 60fps) */}
      <Series.Sequence durationInFrames={240}>
        <DiagramSlide
          title="The Java Compilation & Execution Pipeline"
          subtitle="How Java source code is transformed into bytecode and executed by the JVM"
        />
      </Series.Sequence>

      {/* Slide 3: Compare Primitives vs References (240 frames = 4 seconds at 60fps) */}
      <Series.Sequence durationInFrames={240}>
        <CompareSlide
          title="Primitive Types vs Reference Types"
          subtitle="Memory layout, stack vs heap allocation, and value passing mechanics"
        />
      </Series.Sequence>

      {/* Slide 4: Code & Live Memory Engine (300 frames = 5 seconds at 60fps) */}
      <Series.Sequence durationInFrames={300}>
        <CodeSlide
          title="Live Object Instantiation & Memory Layout"
          activeLine={11}
        />
      </Series.Sequence>
    </Series>
  );
};
