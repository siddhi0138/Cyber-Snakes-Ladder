# 🐍 **Cyber Snakes & Ladders – Learn Cybersecurity Through a Classic Game**

A gamified learning experience where **each snake represents a real cybersecurity exploit** and **each ladder represents a security defense**.
Players learn about attacks like SQL Injection, XSS, MitM, Credential Stuffing, RCE, and more — while climbing defenses like MFA, Validation, Zero Trust, Segmentation, etc.

Built with **React + Vite**, this project turns the nostalgic Snakes & Ladders board into a **cybersecurity education tool** for students, beginners, and professionals.

---

## 🎮 **Features**

### 🕹️ Game Mechanics

* Supports **2 to 4 players (local multiplayer)**
* Fully interactive digital board:

  * Dice roll
  * Player tokens
  * Snakes (falls)
  * Ladders (boosts)
  * Real-time movement animation
* Custom player names + colors
* Event popups for exploits & defenses

### 🔐 Cybersecurity Integration

Each special tile connects to a cybersecurity topic:

| Tile Type                 | Meaning                 | Examples                                        |
| ------------------------- | ----------------------- | ----------------------------------------------- |
| 🐍 **Snakes (Exploits)**  | Harmful attacks         | SQL Injection, XSS, MitM, RCE, Supply Chain     |
| 🪜 **Ladders (Defenses)** | Security best practices | MFA, Input Validation, Zero Trust, Segmentation |

When a player hits a snake/ladder, a **popup explains the attack/defense** in simple, real-world terms.

---

## 🌟 **Why This Project?**

This project is designed to:

* Teach cybersecurity concepts **through a playful experience**
* Help students visualize **attack progression**
* Build intuitive understanding of vulnerabilities
* Reinforce defensive practices in a fun way
* Create an interactive, colorful learning environment

Perfect for workshops, tech clubs, cybersecurity awareness, college fests, and training modules.

---

## 🚀 **Tech Stack**

* **React**
* **Vite**
* **Custom CSS (Cyber-Themed UI)**
* **Lucide Icons**
* **JavaScript (ES6+)**

---

## 📂 **Project Structure**

```
cyber-snakes-ladders/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── Intro.jsx
│   ├── GameBoard.jsx
│   ├── Modal.jsx
│   ├── data/
│   │   └── exploits.js
│   └── assets/
│
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔧 **Installation & Setup**

### 1️⃣ Clone the repository

```bash
git clone https://github.com/siddhi0138/cyber-snakes-ladders.git
cd cyber-snakes-ladders
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5173/
```

---

## 🏗️ **Build for Production**

```bash
npm run build
```

Output directory:

```
/dist
```

---

## 🌐 **Deployment**

### ✔ Vercel Deployment (Recommended)

1. Push your repo to GitHub
2. Open **[https://vercel.com](https://vercel.com)**
3. Import your repository
4. Build settings:

   * Build command: `npm run build`
   * Output directory: `dist`
5. Deploy 🚀

### ✔ Netlify

Drop your `/dist` folder on:
[https://app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🖼️ **Screenshots**

🧩 **Intro Screen – Setup, Rules & Concepts**

<img width="1915" height="895" alt="image" src="https://github.com/user-attachments/assets/e66dfa46-acd6-4113-aafe-7c5b6420f25a" />

Explains how to play, player setup, cybersecurity mapping.

🎲 **Gameplay – Dice, Movement, Snakes, Ladders**

<img width="1917" height="879" alt="image" src="https://github.com/user-attachments/assets/cbd87bc7-0efb-4c13-8f80-9ddd19bea969" />

<img width="1908" height="884" alt="image" src="https://github.com/user-attachments/assets/acfaaddf-1876-4866-9ad4-c6d8a697e31b" />

<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/157cef36-ee9d-43d9-aea5-a949497d92c5" />

Shows the board, players, token movement and event triggers.

⚠️ **Exploit Popup – Snakes**

<img width="1919" height="894" alt="image" src="https://github.com/user-attachments/assets/23dc3112-d8d3-4e5d-bf0e-bfcbab49d739" />

<img width="1917" height="895" alt="image" src="https://github.com/user-attachments/assets/6c30f3f7-73ea-4cb9-b2cd-f8bde2b70c15" />

Displays exploit explanation, impact, and mitigation.

🛡️ **Defense Popup – Ladders**

<img width="1919" height="895" alt="image" src="https://github.com/user-attachments/assets/135f09de-9e1f-4a97-84db-c5e6f14a63df" />

<img width="1919" height="901" alt="image" src="https://github.com/user-attachments/assets/71c3caae-7659-4b1d-8662-77a7fd479602" />

Shows why the defense matters and where it’s used.

---

## 🤖 **Game Logic**

* Fair dice roll algorithm
* Movement handled tile-by-tile
* Snakes mapped to real-world exploits
* Ladders mapped to real-world defenses
* Popup descriptions fetched dynamically
* Multi-player turn rotation system

---

## 🏁 **Game End Conditions**

* First player to reach **Tile 100** wins
* If a player passes 100, their position is adjusted
* Game announces winner automatically

---

## 📚 **Cybersecurity Topics Included**

### 🐍 Exploits (Snakes)

* SQL Injection – Injecting malicious queries into databases to manipulate or extract data.
* Cross-Site Scripting (XSS) – Injecting harmful scripts into web pages that execute in victims’ browsers.
* Credential Stuffing – Using leaked username–password pairs to break into user accounts.
* Man-in-the-Middle (MitM) – Intercepting and altering communication between two connected parties.
* Remote Code Execution (RCE) – Exploiting a flaw to run arbitrary code on a remote system.
* Privilege Escalation – Gaining unauthorized higher-level access, often becoming admin/root.
* Supply Chain Attack – Compromising third-party software or dependencies to infiltrate targets.

### 🪜 Defenses (Ladders)

* Multi-Factor Authentication (MFA) – Adds a second verification layer, keeping accounts safe even if passwords leak.
* Input Validation – Ensures only safe and expected data is processed, blocking malicious payloads.
* Encoding & Sanitization – Converts or cleans user input to prevent scripts and injections from executing.
* Network Segmentation – Splits networks into zones so attackers can’t freely move laterally.
* Monitoring & Logging – Tracks system activity to quickly detect, investigate, and stop attacks.
* Zero Trust Architecture – Never trusts any device or user by default; verifies every request continuously.

---

## 🤝 **Contributing**

Feel free to open issues or submit PRs!

Some requested features:

* Sound effects
* Animated dice roll
* Online multiplayer mode
* Custom board themes
* More vulnerabilities & defenses

---

