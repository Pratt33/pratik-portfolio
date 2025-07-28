# 🚀 Quick Setup Guide

## If you want to host this on your own repository:

### 1. **Create a new repository** on GitHub/GitLab
```bash
# Don't initialize with README (you already have one)
```

### 2. **Add your new remote**
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### 3. **Update domain references** (optional)
Replace `your-domain.com` in `index.html` with your actual domain:
```html
<meta property="og:url" content="https://your-domain.com/black-hole" />
```

### 4. **Commit your changes**
```bash
git add .
git commit -m "Enhanced black hole visualization with modern UI"
git push -u origin main
```

## If you want to deploy to GitHub Pages:

1. **Push to GitHub** (steps above)
2. **Go to repository Settings**
3. **Navigate to Pages section**
4. **Select source**: Deploy from branch `main` / `root`
5. **Your site will be available at**: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Local Development Server:

For best results, serve via HTTP (some browsers block local file loading):

### Python 3:
```bash
python -m http.server 8000
```

### Python 2:
```bash
python -m SimpleHTTPServer 8000
```

### Node.js:
```bash
npx serve .
```

Then open: `http://localhost:8000`

---

## 📝 Customization Tips:

- **Replace favicon**: Update the SVG in `index.html` head section
- **Change music**: Replace `assets/sakura.mp3` with your audio file
- **Modify colors**: Edit CSS variables in `style.css`
- **Add analytics**: Insert tracking code before `</head>` tag
- **Custom domain**: Update meta tags and add CNAME file for GitHub Pages
