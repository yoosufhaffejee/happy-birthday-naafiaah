# Rose Birthday Website

A static birthday page built for GitHub Pages. It opens on an OLED black background, lets the visitor tap to bloom, plays a short cropped music loop, and reveals a rose-style line animation with a birthday message.

## Features

- Static HTML, CSS, and JavaScript only
- OLED black background with premium glow styling
- Tap-to-bloom start screen
- Optional background music with a sound toggle
- Randomized rose color palette on page load
- Randomized friendly birthday note on page load
- Multiple rose drawing styles with slower, softer animation timing
- Mobile-first layout for sending as a birthday link

## Current Variations

The site currently randomizes:

- 6 color palettes
- 14 friendly birthday notes
- 5 drawing styles

That gives `420` possible combinations when color, message, and drawing style are included.

## Files

- `index.html` - Page structure, rose SVG, birthday text, audio element
- `styles.css` - Layout, colors, glow effects, animation timing, responsive design
- `script.js` - Randomization, tap-to-start behavior, music controls
- `rose.ico` - Browser tab favicon
- `Roses_Background_Music.mp3` - Original music file
- `Roses_Background_Music_cropped.mp3` - Smaller cropped music file used by the site

## Local Preview

From the project root, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Opening `index.html` directly may work for the visuals, but using a local server is better for testing audio and browser behavior.

## GitHub Pages

To host it on GitHub Pages:

1. Push this folder to a GitHub repository.
2. Open the repository settings.
3. Go to `Pages`.
4. Set the source to the main branch root.
5. Save and use the generated GitHub Pages link.

## Customizing

To edit the birthday name or main message, update the text in `index.html`.

To edit the small randomized notes, update the `messages` array in `script.js`.

To edit the color palettes or drawing styles, update the `palettes` and `drawStyles` arrays in `script.js`.

To change the music, replace `Roses_Background_Music_cropped.mp3` or update the audio `src` in `index.html`.
