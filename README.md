# Map of Things demo

Demo application for how to create and use a zoomable, filterable, interactive map of basically any random images. 

The idea and most of the implementation came from an official project where I had to create a similar map from scratch. For this demonstration I chose to use Google's Material Icons since their number is over 2000, and it is also possible to apply filters for them by categories.

![Gif](https://stuff.p-kin.com/screentogif/map-of-things.gif)

## Features:

- Demo of a zoomable, pannable, filterable, interactive map of 2000+ images
- Tools and documentation to generate such a map

## Technologies used:

- React
- TypeScript
- OpenSeaDragon
- SVG generation and HTML2Image
- GitHub Actions

## Development, map generator usage

To set up and run the project locally you only need `Node js` installed, preferably LTS v16+.

Available NPM commands:
```shell
# Install the dependencies
$ npm ci

# Run the development server
$ npm run start

# Check code formatting
$ npm run format:check

# Run the linter
$ npm run lint

# Build for deployment
$ npm run build
```

To learn how to generate your own map using this application, please read [the related documentations](./docs/map-generation.md).

## Deployment

Deployment is automated using GitHub Actions on each push to the `master` branch.

Visit the site on [map-of-things.p-kin.com](https://map-of-things.p-kin.com)!
