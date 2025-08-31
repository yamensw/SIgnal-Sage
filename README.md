# Signal & Sage Consulting – Static Site

Simple static site (HTML/CSS + vanilla JS).

## Local Preview
Open `index.html` in your browser.

## Deploy to GitHub Pages
1. Create a new repository on GitHub (e.g., `signal-sage-site`).
2. Upload `index.html` and `styles.css` (or push via git).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch (usually `main`) and folder **/** (root). Save.
6. Your site will be live at the URL GitHub shows (often `https://<username>.github.io/<repo>/`).

## Optional: Push via command line
```bash
git init
git add .
git commit -m "Initial commit: Signal & Sage site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
