# PostCSS Potassium


This repo contains a plugin to PostCSS that parses KSS, which is an extension of CSS that adds spatial selectors and types.

**If you can write CSS then you can write KSS**

The main project page is at [PotassiumES.org](https://potassiumes.org/).

## Overview

This tool (together with PotassiumES) enables web designers to declaratively style, layout, and animate 3D scenes in the same way that they currently do for flat HTML elements.

This repo has the build-time code for reading in KSS and outputting CSS (which every web browser can parse) and a JSON data structure representing styles for a 3D scene like Three.js.

To actually apply your styles to a 3D scene, you'll need a style engine like the Stylist in PotassiumES. The style engine will read in the JSON data emitted by this plugin and then update the 3D scene before each frame is rendered to the screen.

Your workflow will go like this:

- write KSS files
- use this plugin to emit CSS and JSON (probably in a package.json `run` script)
- load the JSON into an app framework like PotassiumES
- enjoy your newly styled 3D scene

## Project Goals
 
**Goal 1:** Enable the wider web

The "wider web" adds augmented and virtual reality to the existing flat web. It incorporates the essential harassment management tools required for healthy social systems.

See [What Is The Wider Web](https://potassiumes.org/wider-web/) for more details.

**Goal 2**: Explore new design, art, and social capabilities

The wider web provides fresh ground to explore new user experience designs, flat graphics, 3D graphics, art forms, and social situations.

This project supports and encourages exploration of these new directions.

## Audience

PotassiumES is for teams who create wider web applications:

- Project managers
- Designers
- Artists
- Writers
- Coders

## Products

A delightful technical framework for wider web applications:
- [Quickstart skeleton project](https://github.com/PotassiumES/potassium-skeleton/)
- [Samples](https://github.com/potassiumes/potassium-samples/)
- [API Documentation](https://potassiumes.org/docs/es/)

A library of beautiful user interface controls.
- [Component Library](https://github.com/PotassiumES/potassium-components) (accessibility core features are in-progress)
- [API Documentation](https://potassiumes.org/docs/components/)

Educational resources for wider-web creation teams.
- In progress

A solid social framework for organizing and realizing progressive projects.
- In progress

## Contributors

Making the wider web is a lot of work! Go look at the [Issues](https://github.com/PotassiumES/potassium-es/issues) to see what's happening and how you can help!

This project has a somewhat unique [Code of Conduct](https://github.com/PotassiumES/potassium-es/blob/master/CODE%20OF%20CONDUCT.md) that holds contributors to a higher standard than most other collective action.

If all else fails, ask [Trevor Flowers](http://trevor.smith.name/) &lt;trevor@trevor.smith.name&gt;
