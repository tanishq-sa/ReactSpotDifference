Here’s a context.md file that you can use with another AI (e.g., GitHub Copilot or GPT-based agent) to generate the game as described in the PDF. This file sets the scope, outlines the game logic, JSON structure, and specifies the tech stack to be used.

⸻

context.md

# Project: Spot the Difference Game

## Overview

This is a configurable "Spot the Difference" game where two images are displayed side-by-side. The player must spot and click on the differences between the images. When a difference is clicked, it is highlighted, and the score is updated. The game is configured via a JSON file, making it reusable for different image sets without changing the core code.

## Goals

- Build a fully functional "Spot the Difference" game.
- Load image and hotspot data dynamically from a JSON file.
- Support highlighting and scoring.
- Provide a clear success message when all differences are found.
- Optionally include:
  - Timer functionality
  - Responsive design
  - Sound effects or animations

## Functional Requirements

1. **UI Layout**
   - Two images displayed side by side (or top and bottom for mobile).
   - Overlay to highlight differences.
   - Score display.
   - Optional timer.

2. **Core Gameplay**
   - Differences defined in a JSON file with bounding boxes (x, y, width, height).
   - Detect clicks and check if they fall within any difference box.
   - Prevent duplicate detection of already found differences.
   - Show a visual cue when a difference is found (e.g., circle or border).

3. **End Game**
   - Display "You found all differences!" or similar upon completion.
   - Stop timer (if implemented).

4. **JSON Configuration**
   Example JSON:
   ```json
   {
     "gameTitle": "Spot the Difference - Animals",
     "images": {
       "image1": "assets/image1.jpg",
       "image2": "assets/image2.jpg"
     },
     "differences": [
       { "x": 100, "y": 200, "width": 50, "height": 50 },
       { "x": 300, "y": 150, "width": 40, "height": 40 },
       { "x": 500, "y": 300, "width": 30, "height": 30 }
     ]
   }

Tech Stack
	•	Frontend
	•	HTML5
	•	CSS3 (Flexbox/Grid for layout, Media Queries for responsiveness)
	•	JavaScript (ES6+)
	•	fetch() API for JSON
	•	canvas or DOM manipulation for overlay/highlighting
	•	Optional Enhancements
	•	Sound: HTML5 Audio API
	•	Animations: CSS transitions or JS-based animations
	•	Timer: setInterval() logic
	•	Responsive design: Media queries, mobile-first layout
	•	Framework (Optional): None required, but can optionally use small utility libraries if needed (e.g., Lodash)
	•	Deployment
	•	Host on Vercel, GitHub Pages, or any static hosting platform.

Deliverables
	•	Complete project hosted and live on Vercel.
	•	GitHub repository containing:
	•	index.html, style.css, script.js
	•	config.json (sample with images and difference data)
	•	README.md with:
	•	Instructions to run locally
	•	How the game loads and uses JSON

Notes for AI
	•	Code must be modular, clean, and commented where necessary.
	•	Must use the JSON file dynamically—do not hardcode image paths or differences.
	•	Assume placeholder images can be used.
	•	Include fallback error messages if JSON fails to load or data is incorrect.

---
