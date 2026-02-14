import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock } from '#components'
import { Terminal, X, LinkedIn, LeetCode } from '#windows'

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
      </div>
    </main>
  )
}

export default App;
