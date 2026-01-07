# Google Club Website - Customization Guide

This guide will help you customize and maintain your Google Club website.

## 📁 File Structure

```
src/
├── data/
│   └── mockData.js          # All your content data (projects, activities, sprints)
├── pages/
│   ├── Home.jsx             # Homepage
│   ├── Projects.jsx         # Projects page with 3D carousel
│   ├── Activities.jsx       # Activities page
│   └── Sprints.jsx          # Sprints/Leaderboard page
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── ProjectCard.jsx      # Project display cards
│   ├── ActivityCard.jsx     # Activity display cards
│   └── Hero3D.jsx           # 3D elements on homepage
└── index.css                # Theme styles and colors
```

## 🎨 Changing Content

### 1. **Projects** (`src/data/mockData.js`)

Edit the `projects` array to add/modify projects:

```javascript
{
    id: 1,                    // Unique ID
    title: "Your Project",    // Project name
    team: "Team Name",        // Team name (appears as badge)
    description: "...",       // Short description
    tags: ["React", "AI"],    // Technology tags (max 3 shown)
    image: "https://...",     // Project thumbnail image URL
    demoUrl: "",              // Optional: GIF/video demo URL
    githubUrl: "https://github.com/username/repo"  // GitHub repository link
}
```

**To add a new project:**
1. Copy an existing project object
2. Change the `id` to a new unique number
3. Update all fields with your project details
4. Add to the `projects` array

**Image URLs:**
- Use Unsplash: `https://images.unsplash.com/photo-...`
- Or upload to your own hosting and use that URL

### 2. **Activities** (`src/data/mockData.js`)

Edit the `activities` array:

```javascript
{
    id: 1,
    title: "Activity Name",
    type: "Workshop",         // Workshop, Hackathon, Meetup, etc.
    date: "Jan 15, 2026",    // Event date
    time: "6:00 PM",         // Event time
    location: "Room 101",    // Event location
    description: "...",      // Event description
    image: "https://...",    // Event image
    registrationLink: "https://forms.google.com/..."  // Registration form link
}
```

### 3. **Sprints & Leaderboard** (`src/data/mockData.js`)

**Leaderboard:**
```javascript
{
    rank: 1,
    name: "Team Name",
    points: 1250,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TeamName"
}
```

**Current Sprint:**
```javascript
export const currentSprint = {
    title: "Sprint 5: Your Sprint Name",
    deadline: "Feb 1, 2026",
    tasks: [
        { 
            id: 1, 
            title: "Task Name", 
            status: "Done",          // Done, In Progress, Todo
            points: 100, 
            assignedTo: "Team Name" 
        }
    ]
};
```

## 🎨 Changing Colors & Themes

### Theme Colors (`src/index.css`)

The site has 3 themes: **Basic**, **Arcade**, and **Anime**

**To change theme colors**, edit the CSS variables in `src/index.css`:

```css
[data-theme='anime'] {
  --background: 250 100% 98%;      /* Page background */
  --foreground: 240 10% 10%;       /* Text color */
  --primary: 330 100% 60%;         /* Pink accent color */
  --secondary: 200 100% 60%;       /* Blue accent color */
  /* ... more colors */
}
```

**Color format:** `hue saturation lightness`
- Hue: 0-360 (color wheel)
- Saturation: 0-100% (color intensity)
- Lightness: 0-100% (brightness)

### Changing Team Names

Team names appear in multiple places. To change them globally:

1. **Projects**: Update `team` field in each project
2. **Leaderboard**: Update `name` field
3. **Sprint Tasks**: Update `assignedTo` field

**Tip:** Use Find & Replace (Ctrl+H) to change all instances:
- Find: `"Team Alpha"`
- Replace: `"Your New Team Name"`

## 📅 Updating Dates

### Footer Year
The footer automatically shows the current year using:
```javascript
{new Date().getFullYear()}
```
No manual update needed!

### Activity Dates
Update in `src/data/mockData.js`:
```javascript
date: "Jan 15, 2026",  // Change this
time: "6:00 PM",       // And this
```

### Sprint Deadlines
```javascript
deadline: "Feb 1, 2026",  // Update sprint deadline
```

## 🔗 Changing Links

### GitHub Repository Links
In `src/data/mockData.js`, update each project's `githubUrl`:
```javascript
githubUrl: "https://github.com/YourUsername/YourRepo"
```

### Registration Links
For activities:
```javascript
registrationLink: "https://forms.google.com/your-form-id"
```

### Social Media Links
Edit `src/components/Navbar.jsx` to add social links in the footer or navbar.

## 🖼️ Changing Images

### Project Images
Use high-quality images (recommended: 1000x600px):
- **Unsplash**: Free stock photos
- **Your own**: Upload to GitHub, Imgur, or cloud storage

```javascript
image: "https://images.unsplash.com/photo-ID?auto=format&fit=crop&q=80&w=1000"
```

### Activity Images
Same as project images - use URLs from image hosting services.

## 🎯 Common Customizations

### 1. Change Club Name
Find and replace "Google Club" with your club name:
- `src/components/Navbar.jsx` - Navbar title
- `src/pages/Home.jsx` - Homepage title
- `src/layouts/Layout.jsx` - Footer text

### 2. Add More Projects
The carousel shows the first 8 projects. If you have more:
- They'll appear in the "View More Projects" list view
- To change the carousel limit, edit `src/pages/Projects.jsx`:
  ```javascript
  const carouselProjects = projects.slice(0, 8);  // Change 8 to your number
  ```

### 3. Disable a Theme
In `src/components/ThemeSwitcher.jsx`, comment out unwanted themes:
```javascript
const themeOptions = [
    { name: themes.BASIC, icon: Code },
    { name: themes.ARCADE, icon: Gamepad2 },
    // { name: themes.ANIME, icon: Sparkles },  // Disabled
];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/your-repo",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Vercel/Netlify
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 📝 Tips

1. **Test locally** before deploying:
   ```bash
   npm run dev
   ```

2. **Keep backups** of `mockData.js` before major changes

3. **Use consistent naming** for teams across all sections

4. **Optimize images** before uploading (use tools like TinyPNG)

5. **Update regularly** - Keep sprint data and activities current

## 🐛 Troubleshooting

**White screen after changes?**
- Check browser console (F12) for errors
- Verify JSON syntax in `mockData.js` (commas, brackets)
- Make sure all required fields are filled

**Images not loading?**
- Check if image URLs are accessible
- Use HTTPS URLs, not HTTP
- Verify image URLs end with file extensions (.jpg, .png, .gif)

**Theme not changing?**
- Clear browser cache (Ctrl+Shift+R)
- Check if theme switcher is visible
- Verify theme CSS in `index.css`

## 📧 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify your changes against this guide
3. Revert to a working version and try again

---

**Last Updated:** January 2026
**Version:** 1.0
