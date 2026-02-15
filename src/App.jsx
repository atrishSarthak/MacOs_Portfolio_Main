import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock, Home } from '#components'
import { Terminal, X, LinkedIn, LeetCode, Resume, Finder, Text, ImageFile } from '#windows'

const App = () => {
  return (
    <main>
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
        <Home />
      </div>
    </main>
  )
}

export default App;
