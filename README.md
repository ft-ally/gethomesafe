<p align="center">
  <img src="assets/logo.png" alt="GetHomeSafe Logo" width="200"/>
</p>

**get home safe** is a web app exploring the TomTom Maps SDK for JavaScript by building a safety-focused routing application. Features planned include route planning, location tracking, and real-time sharing capabilities.

## How to Run

### You'll need to have the following:
- Node.js (`brew install node` if you are on Mac, otherwise you gotta figure it out)
- A TomTom API key (you can get one at [TomTom Developer Portal](https://developer.tomtom.com/))

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your API key:**
   - Copy `.env.example` to `.env`
   - Add your TomTom API key to `.env`:
     ```
     VITE_API_KEY=your_api_key_here
     ```
**Note: always double check your .env is in the .gitignore!!!**

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## Why Vite?
This project uses Vite as a build tool :)
- It handles environment variables securely (the `VITE_` prefix)
- It enables ES6 modules in the browser
- It provides hot module reloading for faster development

Vite is installed automatically when you run `npm install`.
