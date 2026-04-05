import React, { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock, Home, BootScreen } from "#components";
import {
  Terminal,
  X,
  LinkedIn,
  LeetCode,
  Resume,
  Finder,
  Text,
  ImageFile,
  Contact,
} from "#windows";

const App = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <main>
      {!bootComplete && <BootScreen onComplete={() => setBootComplete(true)} />}
      <div>
        <Navbar />
        <Welcome />
        <Dock />

        <Terminal />
        <X />
        <LinkedIn />
        <LeetCode />
        <Resume />
        <Finder />
        <Text />
        <ImageFile />
        <Contact />
        <Home />
      </div>
    </main>
  );
};

export default App;
