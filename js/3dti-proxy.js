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

  await audioContext.audioWorklet.addModule('js/hrtf-processor.js')
  const processorNode = new AudioWorkletNode(
    audioContext,
    'hrtf-processor',
    { numberOfInputs: 6, outputChannelCount: [2]}
  );

  const hrtfData = await fetchHrtfFile('/resources/3DTI_HRTF_IRC1053_512s_48000Hz.3dti-hrtf');

  processorNode.port.postMessage({message: "hrtf", data: hrtfData});

  const setOrientation = (yaw, pitch, roll) => {
    processorNode.port.postMessage({message: "orientation", data: {yaw, pitch, roll}})
  };
  const setSourceDistance = (sourceIndex, distance) => {
    processorNode.port.postMessage({message: "source-distance", data: {sourceIndex, distance}})
  };

  return {
    listener : {
      setOrientation,
      setSourceDistance
    },
    processorNode
  }
};

export { init3DTI };
