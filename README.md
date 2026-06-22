# 🏏 Cricket Scorecard App

A live cricket scoring app built with **React + Vite**. Track runs, wickets, overs, bowlers, and generate a PDF scorecard at the end of the match.

---

## ✨ Features

- **Match Setup** — Enter team names, choose who bats first, and set match length (20, 40, 50 overs or custom)
- **Live Scoring** — Score runs (0–6), wides, no-balls, and byes with one tap
- **Wicket Tracking** — Record dismissals and automatically update the batting lineup
- **Strike Rotation** — Automatically swaps strike on odd runs and at the end of each over
- **Free Hit** — Triggered automatically after a no-ball; batter cannot be dismissed
- **Bowler Management** — Track current bowler's runs, wickets, and overs; enforces the rule that the same bowler can't bowl consecutive overs
- **Over-by-Over History** — Full bowler history with economy and wickets displayed
- **Batter History** — Runs and balls faced with strike rate for every dismissed batter
- **Second Innings / Chase** — Switches innings automatically or manually; displays target, runs left
- **PDF Scorecard** — Download a full match scorecard as a PDF when the match ends
- **Match Persistence** — Match state is saved to `localStorage` so you can close and reopen the tab without losing progress
- **New Match** — Reset everything and start a fresh game

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 | UI and state management |
| Vite | Build tool and dev server |
| localStorage | Match state persistence |
| PDF library (`scorecardpdf.js`) | Scorecard download |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/cricket-scorecard.git

# Navigate into the project
cd cricket-scorecard

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

---

## 📖 How to Use

1. **Enter team names** and choose who bats first
2. **Select match length** (20 overs, 40 overs, 50 overs, or custom)
3. **Enter the opening batters** (striker and non-striker) and save them
4. **Select a bowler** for the first over and save
5. **Tap scoring buttons** to record runs, wides, no-balls, byes, or wickets
6. When a wicket falls, **enter the next batter's name** and continue
7. At the end of each over, **select a new bowler** (same bowler cannot bowl consecutive overs)
8. Click **End Innings** (or it switches automatically when overs are completed / all out)
9. The second innings begins — chase the target!
10. When the match ends, click **Download Scorecard (PDF)**

---

## 📁 Project Structure

```
cricket-scorecard/
├── public/             # Static assets
├── src/
│   ├── App.jsx         # Root component
│   ├── Greeter.jsx     # Main scoring component
│   ├── scorecardpdf.js # PDF generation logic
│   └── main.jsx        # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚠️ Known Limitations

- No authentication — single device/browser use only
- `localStorage` is used for persistence; clearing browser data will erase the match
- No DLS (Duckworth-Lewis) method support
- No network/multiplayer scoring

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

> Built with ❤️ for cricket fans everywhere 🏏