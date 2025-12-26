import nj from 'numjs';
//import sounddevice. i'm not sure what package javascript has which is similar to sounddevice

function sonify(radius){
  //Sonify the curve given in polar form by 'r = radius(theta)'. 
  //:param radius: the radius function. 'radius' should take and return numpy arrays

  const duration = 4.0;
  const sampleRate = 44100;
  const sampleCount = Math.floor(sampleRate * duration);
  const theta = linspace(0, 2 * Math.PI, sampleCount);
  const r = radiusFn(theta);
  const dtheta = theta[1] - theta[0];
  const phase = cumsum(r).map(v => 400 * 2 * Math.PI * v * dtheta);
  //const tone
  for (let i = 0; i < sampleCount; i++){
    if (radiusFn([theta[i]])[0] < 0){
      tone[i] += (Math.random() * 0.02 - 0.01);
    }
  }
  //sd.play(tone, samplerate = sampleRate)
  

