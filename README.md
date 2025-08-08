# ThreatAtlas - Vulnerability Assessment Dashboard

A modern React and Vite-based dashboard for vulnerability assessment and security scoring.

## 🔐 Features

- **Base Vulnerable Score**: Core security vulnerability assessment
- **Actionable Score**: Remediable security issues tracking
- **Total Score**: Combined risk assessment calculation
- **Interactive Dashboard**: Real-time vulnerability scoring with visual indicators
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Security-Focused UI**: Dark theme optimized for security professionals

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ThreatAtlas
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

## 🛠 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint for code linting
- `npm run preview` - Preview the production build locally

## 📊 Dashboard Components

### Score Cards
- **Base Vulnerable Score**: Displays core vulnerabilities (0-10 scale)
- **Actionable Score**: Shows remediable issues (0-10 scale)  
- **Total Score**: Combined assessment (0-20 scale)

### Vulnerability Breakdown
- Critical, High, Medium, Low vulnerability counts
- Actionable items tracking
- Color-coded severity indicators

## 🎨 Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with modern features (Grid, Flexbox, Gradients)
- **ES6+** JavaScript features

## 🔧 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── Dashboard.css   # Dashboard styles
│   ├── ScoreCard.tsx   # Score card component
│   └── ScoreCard.css   # Score card styles
├── types/              # TypeScript type definitions
│   └── vulnerability.ts # Vulnerability data types
├── App.tsx             # Main app component
├── App.css             # Global styles
└── main.tsx           # Application entry point
```

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be generated in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**ThreatAtlas** - Empowering security professionals with comprehensive vulnerability assessment tools.
