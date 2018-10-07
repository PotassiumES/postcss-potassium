# PostCSS Potassium

This repo contains a plugin to PostCSS that parses KSS, which is an extension of CSS that adds spatial selectors and types.

**If you can write CSS then you can write KSS**

## Overview

This tool enables web designers to declaratively style, layout, and animate 3D scenes in the same way that they currently do for flat HTML elements.

This repo has the build-time code for reading in KSS and outputting CSS (which every web browser can parse) and a JSON data structure representing styles for a 3D scene like Three.js.

To actually apply your styles to a 3D scene, you'll need a style engine like the Stylist in PotassiumES. The style engine will read in the JSON data emitted by this plugin and then update the 3D scene before each frame is rendered to the screen.

Your workflow will go like this:

- write KSS files
- use this plugin to emit CSS and JSON (probably in a package.json `run` script)
- load the JSON into an app framework like PotassiumES
- enjoy your newly styled 3D scene
 
