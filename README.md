# clockOS
**clockOS is still under development** No stable release is available.

clockOS is an app that runs on a Raspberry Pi with a display and converts it into a smart desktop clock.
Programming language is Node.js.

For contributing take a look at the <a href="https://github.com/iGerli/clockOS/wiki">Contributing</a> page.

For any suggestion add an issue on GitHub.

## Getting Started
Before getting started you need to setup your Pi and attach your TFT to then set it up with [Resin.io](http://resin.io) if you haven't already.
- First make sure your display is working with ResinOS. To make your display work you might need to set a `Fleet Configuration` with the name `RESIN_HOST_CONFIG_dtoverlay` with value `pitft28-resistive,rotate=90`, you may want to tweak that depending on your display. Note: Some overlays may not be available, that depends on your ResinOS version, I had to sideload mine `rpi-display` in my SD card.
- Then wire your navigation buttons, you're going to need 4.
  Default pins are (you can modify this in main.js):
  ```
    upButton: 16,
    downButton: 17,
    backButton: 27,
    selectButton: 22
  ```
  - To change your time zone modify [this](https://github.com/iGerli/clockOS/blob/master/Dockerfile.template#L64) line from your `Dockerfile.template`.

## Deploying to Resin.io
To deploy clone or fork and clone this project to desktop and add resin.io remote.
Then just run `git push resin master`. And this will deploy to all your devices in that app.

## License
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
