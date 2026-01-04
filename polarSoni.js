let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

const DURATION = 4.0;
const SAMPLE_COUNT = 1000;
const BASE_FREQUENCY = 440;
const DTHETA = (2 * Math.PI) / SAMPLE_COUNT;

/**
 * Sonify the curve given in polar form by r = radius(theta).
 * 
 * @param {Function} radius - A function that takes a single number theta and returns a number r.
 *     The `radius` function should be defined for all values of `theta` between 0 and 2*pi.
 */
function sonify(radius) {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  oscillator.connect(ctx.destination);
  
  const startTime = ctx.currentTime;
  const frequency0 = BASE_FREQUENCY * radius(0);
  oscillator.frequency.setValueAtTime(frequency0, startTime);
  
  for (let i = 1; i < SAMPLE_COUNT; i++) {
    const theta = i * DTHETA;
    const frequency = BASE_FREQUENCY * radius(theta);

    // `sampleTime` is the length of the linear ramp
    const sampleTime = startTime + (i / SAMPLE_COUNT) * DURATION;
    
    oscillator.frequency.linearRampToValueAtTime(frequency, sampleTime);
  }
  
  oscillator.start(startTime);
  oscillator.stop(startTime + DURATION);
}
