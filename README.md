> **Disclaimer**: This README has been written with the help of AI.

# Google Club CU 🚀

Hey there! Welcome to the digital headquarters of the Google Club at Chandigarh University.

This isn't your average club website. We wanted to build something that reflects who we are—innovators, dreamers, and yes, slightly obsessed with cool tech. So, instead of a boring static page, we built an interactive 3D experience that changes based on your mood (or luck!).

## What's Cool About This? 🌟

The entire site is built around a **Theme System**. It's not just a "Dark Mode" switch; the entire world changes.

1.  **Space Mode (Default)**: A deep dive into the cosmos with a Black Hole visualization and constellation timelines.
2.  **Arcade Mode**: A retro 80s cyberpunk vibe with neon grids, a playable-looking arcade cabinet, and glitch effects.
3.  **Anime Mode**: A peaceful, Ghibli-inspired floating island with falling cherry blossoms and a paper-craft aesthetic.

**Fun Fact**: If you're new here, the site rolls a dice to pick a random theme for you on your first visit (or every reload, if we're feeling chaotic).

## Tech Stack 🛠️

We used some heavy hitters to make this work:

*   **React (Vite)**: The engine driving the ship.
*   **Three.js (@react-three/fiber)**: For all the 3D magic in the browser.
*   **Tailwind CSS**: For keeping our styling sane and fast.
*   **Framer Motion**: For those buttery smooth 2D animations.

## Getting Started 🏃‍♂️

Want to run this locally? It's pretty standard:

1.  **Clone the repo** (You know the drill).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Spin it up**:
    ```bash
    npm run dev
    ```

Open your browser, and you should be live!

## Exploring the Code 🧭

If you're a developer looking to learn or contribute, check out the `src` folder. We've organized things pretty neatly:

*   `src/themes/`: This is where the magic lives. Each theme has its own folder (`basic`, `arcade`, `anime`) containing its unique 3D models and logic.
*   `src/context/`: The "Brain" of the app that handles state management.

Feel free to poke around, break things, and fix them again. That's how we learn!

---
*Crafted with ❤️ (and a bit of silicon).*

* **IMPORTANT_NOTE**: As the code or data grows we should need a backedn so keep that in mind ( would appreciate support. )
