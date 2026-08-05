import React from "react";
import { Composition } from "remotion";
import { TitleSlide, TitleSlideProps } from "./compositions/TitleSlide";
import { CodeSlide, CodeSlideProps } from "./compositions/CodeSlide";
import { CompareSlide, CompareSlideProps } from "./compositions/CompareSlide";
import { DiagramSlide, DiagramSlideProps } from "./compositions/DiagramSlide";
import { SlideDeckSequencer } from "./compositions/SlideDeckSequencer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Complete Sequenced Presentation Deck */}
      <Composition
        id="JavaSlideDeck"
        component={SlideDeckSequencer}
        durationInFrames={960}
        fps={60}
        width={1920}
        height={1080}
      />

      {/* Standalone Title Slide */}
      <Composition
        id="TitleSlide"
        component={TitleSlide}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Object-Oriented Programming",
          subtitle: "Mastering Classes, Objects, Inheritance & Polymorphism in Java",
          badge: "JAVA MASTERY STUDIO",
          lessonNum: "LESSON 01",
          author: "Java Mastery Deck",
        } satisfies TitleSlideProps}
      />

      {/* Standalone Code & Memory Slide */}
      <Composition
        id="CodeSlide"
        component={CodeSlide}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Object Instantiation & Memory Layout",
          activeLine: 11,
        } satisfies CodeSlideProps}
      />

      {/* Standalone Compare Slide */}
      <Composition
        id="CompareSlide"
        component={CompareSlide}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Primitive Types vs Reference Types",
          subtitle: "Understanding memory allocation, passing conventions, and default values in Java",
        } satisfies CompareSlideProps}
      />

      {/* Standalone Diagram Slide */}
      <Composition
        id="DiagramSlide"
        component={DiagramSlide}
        durationInFrames={240}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "The Java Compilation & Execution Pipeline",
          subtitle: "How Java source code is transformed into platform-independent bytecode and executed by the JVM",
        } satisfies DiagramSlideProps}
      />
    </>
  );
};
