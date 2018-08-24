# devo
Devo is a Google Chrome and Mozilla Firefox extension that displays GitHub Trending, Hacker News and Product Hunt on every new tab. It caches the information for 30 minutes, so that there is no extra calls to the external services, hence allowing a faster experience.

## Demo
[Demo can be found here.](https://burakkarakan.com/devo/)

## How to build?

First of all, you need to install the npm dependencies. After that, you can run the build command and the optimized bundle will be created in `dist/` directory:
```sh
npm install # install the dependencies.
npm run build # build the optimized bundle.
```