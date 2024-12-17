import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

console.log('👋 Preload')

// Custom APIs for renderer
// const api = {
//     getPathAndAction: async () => {
//       return ipcRenderer.invoke('getPathAndAction')
//     },
//     alert_warning:(callback)=>
//     {
//       ipcRenderer.on('alert_warning',(_event,msg:string)=>{
//         callback(msg)
//       })
//     }
// }

const ElectronAPI = {
  getPathAndAction: async () => {
    return ipcRenderer.invoke('getPathAndAction')
  },
  alert_warning:(callback)=>
  {
    ipcRenderer.on('alert_warning',(_event,msg:string)=>{
      callback(msg)
    })
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', ElectronAPI)
    // contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  // window.api = api
}
