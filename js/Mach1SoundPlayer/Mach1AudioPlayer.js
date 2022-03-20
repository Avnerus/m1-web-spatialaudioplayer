/*
 * Nach1 Spatial Web SoundPlayer Example
 * Description: Example of an audio player for Mach1Decode API and spatial audio playback
*/

/* eslint-disable new-cap, no-alert */

class Mach1AudioPlayer { // eslint-disable-line no-unused-vars
  #soundFilesCount = 0
  #soundFilesCountReady = 0

  #isDeleted = false
  #isFromBuffer = false
  #isPlaying = false
  #isSoundReady = false

  #buffer

  #volume = 1.0

  #gainNode
  #gainAnalyser
  #gains
  #pannerNode
  #smp

  #cache = {}
  audioContext = (window.AudioContext) ? new window.AudioContext() : new window.webkitAudioContext()

  #startTime = 0;
  #stopTime = 0;

  NYT = true;

  /**
   * Private method which should calculate and return time before start playing,
   * based on Audio Context
   * @type {Number}
   */
  #currentTime = () => {
    if (!this.isReady() || !this.#isPlaying) {
      return this.#stopTime - this.#startTime > 0 ? this.#stopTime - this.#startTime : 0;
    }
    return this.audioContext.currentTime - this.#startTime;
  }

  #needToPlay = false;
  #playLooped = false;
  #waitToPlay = 0;
  /**
   * Create new array with fixed item count, each item have zero value
   * @type {Array}
   */
  #initArray = (count = this.#soundFilesCount) => new Array(count).fill(0.0)
  /**
   * Set default time value for a gain nodes (for all buffered sound files)
   * @type {}
   */
  #setGains = (vols) => {
    if (this.isReady() && this.#isPlaying) {
      for (let i = 0; i < this.#gainNode.length; i += 1) {
        this.#gainNode[i].gain.setTargetAtTime(vols[i], this.audioContext.currentTime, 0.05);
      }
    }
  }

  /**
   * @param {Array|AudioBuffer} input array with sound files paths [url]
   */
  constructor(input) {
    const source = this.audioContext.createMediaElementSource(input);
    console.log("Source", source);
    const channels = 8;

    source.channelCount = channels;

    const splitter = this.audioContext.createChannelSplitter(channels);
    const merger = this.audioContext.createChannelMerger(channels * 2);

    source.connect(splitter);
    this.audioContext.createGain = this.audioContext.createGain || this.audioContext.createGainNode;

    this.#gainNode = [];
    this.#gainAnalyser = [];

    let position = -1;
    const processing = (channel) => {
      //const analyser = this.audioContext.createAnalyser();
      const gain = this.audioContext.createGain();
      const panner = this.audioContext.createPanner();

      gain.gain.value = 0;

      panner.setPosition(position, 0, 0);
      panner.panningModel = 'equalpower';

      //console.log("Connect panner to gain at position", position, 0, 0);
      panner.connect(gain);

      //console.log("Connect spliiter to gain from output", channel);
      splitter.connect(gain, channel);

      //console.log("Connect gain to merger from output index", 0, "to input ", position === -1 ? 0 : 1, "at merger" );
      gain.connect(merger, 0, position === -1 ? 0 : 1);

      //gain.connect(analyser);

      //console.log("Processing",gain,analyser);
      this.#gainNode.push(gain);
      //this.#gainAnalyser.push(analyser);

      position *= -1;
      if (position === 1) processing(channel);
    };

    [...Array(8).keys()].forEach(processing);

    merger.connect(this.audioContext.destination);

  }

  /**
   * Return progress information in percent
   * @return {String} Percentages from 0 to 100 as a string [integer]
   */
  get progress() {
    return ((this.#soundFilesCountReady / this.#soundFilesCount) * 100).toFixed(0);
  }

  /**
   * Setting gains for all files
   * @param  {Array} vols binding new gain values by index
   */
  set gains(vols) {
    if (this.#isPlaying) {
      this.#setGains(vols);
    }
  }

  /**
   * Getting gains for all files
   * @param  {Array} vols return last gain values by index
   */
  get gains() {
    return this.#gains;
  }

 /**
   * Setting Master Gain/Volume
   * @param  {Array} volume
   */
  set volume(vol) {
    this.#volume = parseFloat(vol);
  }
  
  /**
   * Return Master Gain/Volume
   * @return {String} Volume from 0 to 1 as a float
   */
  get volume() {
    return this.#volume;
  }

  /**
   * Start playing sound files
   */
  play(looped, time = this.#currentTime()) {
    if (this.isReady() && !this.#isPlaying && !this.#isDeleted) {
      this.#startTime = this.audioContext.currentTime - time;
      console.log("Resume audio context");
      this.audioContext.resume();
      this.#isPlaying = true;

    } else {
      this.#needToPlay = true;
      this.#playLooped = looped;
      this.#waitToPlay = time;
    }
  }

  /**
   * Stopping play any sound file
   */
  stop() {
    if (this.isReady() && this.#isPlaying && !this.#isDeleted) {
      this.#isPlaying = false;
      this.#needToPlay = false;

      this.#stopTime = this.audioContext.currentTime;
    }
  }

  /**
   * Alias for the this.stop() method
   */
  pause() {
    this.stop();
  }

  remove() {
    if (this.isReady()) this.#smp.forEach((smp) => smp.stop());
    this.#isDeleted = true;
  }

  rewind(time = 0) {
    this.stop();
    this.play(time >= 0 ? time : 0);
  }

  isReady() {
    return !this.#isDeleted;
  }

  isPlaying() {
    return this.#isPlaying;
  }

  getAudioContext() {
    return this.audioContext;
  }

  rotationToVector(rotation) {
    // convert degrees to radians and offset the angle so 0 points towards the listener
    const {yaw, pitch, roll} = rotation;

    const radians = (yaw - 90) * (Math.PI / 180);
    // using cosine and sine here ensures the output values are always normalized
    // i.e. they range between -1 and 1
    const x = Math.cos(radians);
    const z = Math.sin(radians);

    // we hard-code the Y component to 0, as Y is the axis of rotation
    return [x, 0, z];
  };
}
