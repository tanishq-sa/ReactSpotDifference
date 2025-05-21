# Spot the Difference Game

A React-based "Spot the Difference" game where players can configure their own puzzles with custom images and difference spots.

## Features

- Side-by-side image comparison
- Click detection for differences
- Score tracking
- Responsive design (mobile-friendly)
- Visual feedback for found differences (red circle outline)
- Game completion message
- **Configuration screen:**
  - Upload two images
  - Add differences by clicking on either image (red circle appears where you click)
  - Remove differences before starting
  - Set a custom game title

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-spot-difference
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Configuration Screen

When you open the app, you'll see a configuration screen:
- **Game Title:** Enter a custom title for your game.
- **Image 1 & Image 2:** Upload two images to compare.
- **Add Difference:** Enable "Add Difference Mode" and click on either image to add a difference (a red circle will appear where you click).
- **Remove:** Remove any difference before starting.
- **Start Game with Current Settings:** Launch the game with your custom configuration.

## How to Play

1. Look at both images side by side
2. Click on the differences you spot (on either image)
3. Found differences will be highlighted with a red circle outline
4. Try to find all differences as quickly as possible
5. Your score will be displayed when you complete the game

## Technologies Used

- React
- JavaScript
- Vite
- Emotion (for styled components)

## License

MIT
