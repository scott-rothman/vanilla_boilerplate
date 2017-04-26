/* globals require */
require('velocity-animate');

const ScrollMagic = require('scrollmagic');

const Scroller = {
  init() {
    this.controller = new ScrollMagic.Controller();
    this.buildScene(500, 0, 'scene-1', this.controller);
  },
  buildScene(duration, offset, pin, controller) {
    new ScrollMagic.Scene({
      duration: duration,
      offset: offset
    })
    .setPin(`#${pin}`)
    .addTo(controller);
  }
};

Scroller.init();
