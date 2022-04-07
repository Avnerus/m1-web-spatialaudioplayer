# Notes
## Develop with AudioWorklet
```
npx concurrently "npx serve" "npx esbuild --watch --bundle ./js/hrtf-processor-es6.js --outfile=./js/hrtf-processor.js"
```
## Develop with Hoast360
```
npx concurrently "npx serve" "npx esbuild --watch --platform=node --bundle ./js/hoast360-player-es6.js --outfile=./js/hoast360-player.js"
```
