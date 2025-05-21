# Spot the Difference Game

A React-based "Spot the Difference" game where players need to find differences between two similar images.

## Features

- Side-by-side image comparison
- Click detection for differences
- Score tracking
- Timer functionality
- Responsive design (mobile-friendly)
- Visual feedback for found differences (red circle outline)
- Game completion message

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

## Game Configuration

The game is configured through a JSON file located at `src/config/gameConfig.json`. The configuration includes:

- Game title
- Image paths
- Difference coordinates (x, y, width, height)

Example configuration:
```json
{
  "gameTitle": "Spot the Difference - Animals",
  "images": {
    "image1": "/assets/1.jpg",
    "image2": "/assets/2.jpg"
  },
  "differences": [
    { "x": 100, "y": 200, "width": 50, "height": 50 },
    { "x": 300, "y": 150, "width": 40, "height": 40 },
    { "x": 500, "y": 300, "width": 30, "height": 30 }
  ]
}
```

## How to Play

1. Look at both images side by side
2. Click on the differences you spot
3. Found differences will be highlighted with a red circle outline
4. Try to find all differences as quickly as possible
5. Your score and time will be displayed when you complete the game

## Technologies Used

- React
- JavaScript
- Vite
- Emotion (for styled components)

## License

MIT
