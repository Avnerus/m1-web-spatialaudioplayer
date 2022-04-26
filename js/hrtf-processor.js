import AudioToolkit from './3dti-toolkit.js'

const MACH1_OCTAHEDRON = [
  {
    azimuth: 45,
    elevation: 35.26,
  },
  {
    azimuth: 315,
    elevation: 35.26,
  },
  {
    azimuth: 135,
    elevation: 35.26,
  },
  {
    azimuth: 225,
    elevation: 35.26,
  },
  {
    azimuth: 45,
    elevation: -35.26,
  },
  {
    azimuth: 315,
    elevation: -35.26,
  },
  {
    azimuth: 135,
    elevation: -35.26,
  },
  {
    azimuth: 225,
    elevation: -35.26,
  },
]

const MACH1_DISTANCE = -2;

class HRTFProcessor extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
    this.ready = false;
    this.init();
  }
  async init() {
    // Create sources and buffers for the Mach1 octahedron
    this.inputBuffers = [];
    this.outputBuffers = [];
    this.sources = [];

    const toolkit = await AudioToolkit();
    const binauralApi = new toolkit.BinauralAPI();
    const listener = binauralApi.CreateListener(0.08);

    const mach1Vec = new toolkit.CVector3(0,0,MACH1_DISTANCE);

    for (const mach1Source of MACH1_OCTAHEDRON) {
      const quat = toolkit.CQuaternion.FromYawPitchRoll(
        -mach1Source.azimuth * Math.PI / 180,
        mach1Source.elevation * Math.PI / 180,
        0
      );
      const sourcePos = quat.RotateVector(mach1Vec);
      const sourceQuat = quat.Inverse();
      const sourceTransform  = new toolkit.CTransform();
      sourceTransform.SetPosition(sourcePos);
      sourceTransform.SetOrientation(sourceQuat);

      const source = binauralApi.CreateSource();
      source.SetSourceTransform(sourceTransform);
      //source.SetSpatializationMode(toolkit.TSpatializationMode.HighPerformance);

      this.sources.push(source);
      //console.log("Mach1 source:", mach1Source, "Quat:", sourceQuat, "Pos", sourcePos.x,sourcePos.y, sourcePos.z);

      const inputBuffer = new toolkit.CMonoBuffer();
      inputBuffer.resize(128, 0)
      this.inputBuffers.push(inputBuffer);

      const outputBuffer = new toolkit.CStereoBuffer()
      outputBuffer.resize(256, 0)
      this.outputBuffers.push(outputBuffer);
    }    
    this.port.onmessage = (e) => {
      //console.log("Got a message!", e.data, e.data instanceof ArrayBuffer)
      if (e.data.message == "hrtf") {
        const virtualHrtfFilePath = this.registerHrtf(toolkit, 'dataset.3dti-hrtf', e.data.data)
        console.log(virtualHrtfFilePath);
        toolkit.HRTF_CreateFrom3dti(virtualHrtfFilePath, listener)
        this.ready = true; 
      } else if (e.data.message == "orientation") {
        const {yaw, pitch, roll} = e.data.data;
        const quat = toolkit.CQuaternion.FromYawPitchRoll(yaw, pitch, roll);
        const transform = new toolkit.CTransform();
        transform.SetOrientation(quat);
        listener.SetListenerTransform(transform);
      } else {
        const {sourceIndex, distance} = e.data.data

        const arrayIndex = sourceIndex - 1;
        const mach1Source = MACH1_OCTAHEDRON[arrayIndex];
        const quat = toolkit.CQuaternion.FromYawPitchRoll(
          -mach1Source.azimuth * Math.PI / 180,
          mach1Source.elevation * Math.PI / 180,
          0
        );
        const vec = new toolkit.CVector3(0,0,distance);
        const sourcePos = quat.RotateVector(vec);
        const sourceQuat = quat.Inverse();
        const sourceTransform  = new toolkit.CTransform();
        sourceTransform.SetPosition(sourcePos);
        sourceTransform.SetOrientation(sourceQuat);

        const source = this.sources[arrayIndex];
        source.SetSourceTransform(sourceTransform);

    }
  }}
  process (inputs, outputs, parameters) {
    if (!this.ready) {
      return true;
    }
    const output = outputs[0]
    for (const [channelIndex, channelInput] of inputs.entries()) {
      if (channelInput.length > 0) {
        const buffer = channelInput[0];
        for (let i = 0; i < buffer.length; i++) {
           this.inputBuffers[channelIndex].set(i, buffer[i]);
        }
      }
      this.sources[channelIndex].ProcessAnechoic(this.inputBuffers[channelIndex], this.outputBuffers[channelIndex])
    }
    for (let i = 0; i < output[0].length; i++) {
      for (let j = 0; j < this.outputBuffers.length; j++) {
        output[0][i] += this.outputBuffers[j].get(i  * 2) // / this.inputBuffers.length;
        output[1][i] += this.outputBuffers[j].get(i  * 2 + 1)// / this.inputBuffers.length;
      }
    }
    return true
  }
  registerHrtf(toolkit, filename, data) {
    try {
      toolkit.FS_createDataFile(
        '/',
        filename,
        new Uint8Array(data),
        true,
        true,
        true
      )
    } catch (err) {
      // `EEXISTS` means we've mounted the same HRTF again,
      // which is fine. But the rest needs to be thrown!
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
    return `/${filename}`
  }
};

registerProcessor('hrtf-processor', HRTFProcessor);
