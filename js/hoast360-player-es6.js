import HOASTRotator from 'hoast360/dependencies/HoastRotator.js'
import MatrixMultiplier from 'hoast360/dependencies/MatrixMultiplier.js'
import HOASTBinDecoder from 'hoast360/dependencies/HoastBinauralDecoder.js'
import HOASTloader from 'hoast360/dependencies/HoastLoader.js'

window.initHOAST360 = async (audioContext, audioElement) => {
  
  return new Promise((resolve, reject) => {
    console.log("Init HOAST360");

    const order = 2;
    const numCh = 9;
    
    const rotator = new HOASTRotator(audioContext, order);
    console.log(rotator);

    const multiplier = new MatrixMultiplier(audioContext, 4);
    console.log(multiplier);

    decoder = new HOASTBinDecoder(audioContext, order);
    console.log(decoder);

    const masterGain = audioContext.createGain();
    masterGain.gain.value = 1.5;

    const source = audioContext.createMediaElementSource(audioElement);
    source.channelCount = numCh;
    source.connect(rotator.in);
    //rotator.out.connect(multiplier.in);
    //multiplier.out.connect(decoder.in);
    rotator.out.connect(decoder.in);
    decoder.out.connect(masterGain);
    masterGain.connect(audioContext.destination);

    const setOrientation = (yaw, pitch, roll) => {
      rotator.yaw = yaw;
      rotator.pitch = pitch;
      rotator.roll = roll;

      rotator.updateRotMtx();
    };

    const loader_filters = new HOASTloader(audioContext, order, 'resources/hoast_o2.wav', (foaBuffer, hoaBuffer) => {
      console.log("Filters loaded");
      resolve({
         setOrientation
      });
    });

    loader_filters.load();
  })
};
