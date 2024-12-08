import { app, shell, BrowserWindow, ipcMain,dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const path = require('path');

let mainWindow
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    icon: path.join(__dirname, '../../resources/ming_ri_xiang.ico')
  })

  mainWindow.on('ready-to-show', () => {
    console.log('新建文件夹')
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


ipcMain.handle('getPathAndAction', async (event,cur_path:string) => {
  // let result
  // if (cur_path) 
  // {
  //   result = await dialog.showOpenDialog(mainWindow, {
  //     properties: ['openFile'], // 选择文件
  //     filters: [
  //       { name: '骨骼文件', extensions: ['atlas'] }, // 限制文件类型
  //   ],
  //   });
  // }

  const filePath = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'], // 选择文件
    filters: [
      { name: '骨骼文件', extensions: ['atlas'] }, // 限制文件类型
    ],
    title: '选择骨骼文件',
    defaultPath: cur_path||path.join(app.getPath('desktop')), // 设置打开时的默认路径
  });
  if (filePath.filePaths.length === 0) {
    return null;
  }
  return filePath.filePaths[0];
  // console.log(filePath.filePaths[0]);
  
})


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })


  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})