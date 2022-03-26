/**
 * Fetches an HRTF file and returns it as an array buffer.
 *
 * @param  {String} url  The URL to the HRTF file
 * @return               An array buffer
 */
const fetchHrtfFile = url => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

/**
 * Registers an HRTF file with the toolkit and returns its
 * virtual file path.
 *
 * More specifically, it creates a file on emscripten's virtual
 * file system, where it will then be accessible internally
 * by the toolkit.
 *
 * @param  {String}      filename  The HRTF file's filename
 * @param  {ArrayBuffer} data      The HRTF file data
 * @return {String}                A (virtual) file path
 */
const registerHrtf = (toolkit, filename, data) => {
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
const init3DTI = async (audioContext) => {
  const toolkit = await AudioToolkit();
  const binauralApi = new toolkit.BinauralAPI();
  const listener = binauralApi.CreateListener(0.08);
  const sourceL = binauralApi.CreateSource();
  const sourceR = binauralApi.CreateSource();

  // Source position
  const tL = new toolkit.CTransform();
  const vL = new toolkit.CVector3(-1,0,-0.15);
  tL.SetPosition(vL);

  const tR = new toolkit.CTransform();
  const vR = new toolkit.CVector3(1, 0,-0.15);
  tR.SetPosition(vR);

  sourceL.SetSourceTransform(tL);
  sourceR.SetSourceTransform(tR);

  // Fetch an HRTF file
  const hrtfData= await fetchHrtfFile('/resources/3DTI_HRTF_IRC1053_512s_48000Hz.3dti-hrtf');

  console.log("HRTF Data", hrtfData);

  // Register the HRTF file with
  const virtualHrtfFilePath = registerHrtf(toolkit, 'dataset.3dti-hrtf', hrtfData)

    // Set the HRTF using the toolkit API.
  toolkit.HRTF_CreateFrom3dti(virtualHrtfFilePath, listener)

  const inputBufferL = new toolkit.CMonoBuffer();
  inputBufferL.resize(512, 0)

  const inputBufferR = new toolkit.CMonoBuffer();
  inputBufferR.resize(512, 0)

  const outputBuffersL = new toolkit.CStereoBuffer()
  outputBuffersL.resize(1024, 0)

  const outputBuffersR = new toolkit.CStereoBuffer()
  outputBuffersR.resize(1024, 0)

  // Create a ScriptProcessorNode
  const processorNode = audioContext.createScriptProcessor(512, 2, 2)

  // New method

  //await audioContext.audioWorklet.addModule('js/hrtf-processor.js')
  //const randomNoiseNode = new AudioWorkletNode(audioContext, 'hrtf-processor')


  // Process audio in the processorNode's onaudioprocess
  // event callback
  processorNode.onaudioprocess = audioProcessingEvent => {
    const { inputBuffer, outputBuffer } = audioProcessingEvent

    // Copy the audio data to your toolkit buffers
    for (let i = 0; i < processorNode.bufferSize; i++) {
      inputBufferL.set(i, inputBuffer.getChannelData(0)[i])
      inputBufferR.set(i, inputBuffer.getChannelData(1)[i])
    }

    // Let the toolkit do its thang
    sourceL.ProcessAnechoic(inputBufferL, outputBuffersL)
    sourceR.ProcessAnechoic(inputBufferR, outputBuffersR)

    // Copy back the processed audio data to the processor
    // node's buffers
    for (let i = 0; i < processorNode.bufferSize; i++) {
      outputBuffer.getChannelData(0)[i] = outputBuffersL.get(i * 2) + outputBuffersR.get(i * 2);
      outputBuffer.getChannelData(1)[i] = outputBuffersR.get(i * 2 + 1) + outputBuffersL.get(i * 2 + 1);
    }
  };

  const setOrientation = (yaw, pitch, roll) => {
    const quat = toolkit.CQuaternion.FromYawPitchRoll(yaw, pitch, roll);
    const transform = new toolkit.CTransform();
    transform.SetOrientation(quat);
    listener.SetListenerTransform(transform);
  };

  return {
    listener : {
      setOrientation
    },
    processorNode
  }
};
