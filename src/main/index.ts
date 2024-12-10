import { app, shell, BrowserWindow, ipcMain,dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {SkeletonBinary,SkeletonJson,AttachmentLoader, AtlasAttachmentLoader, TextureAtlas} from '@esotericsoftware/spine-core'
// import spine from "@esotericsoftware/spine-core"

let cur_path;

const path = require('path');
const fs = require('fs');

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
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false
    },
    icon: path.join(__dirname, '../../resources/ming_ri_xiang.ico')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}


ipcMain.handle('getPathAndAction', async (event) => {
  const filePath = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'], // 选择文件
    filters: [
      { name: '骨骼文件', extensions: ['skel','json'] }, // 限制文件类型
    ],
    title: '选择骨骼文件',
    defaultPath: cur_path||path.join(app.getPath('desktop')), // 设置打开时的默认路径
  });

  if (filePath.filePaths.length === 0) {
    console.log('未选择文件');
    return null;
  }

  const file_path = filePath.filePaths[0];
  cur_path = file_path.substring(0,file_path.lastIndexOf("\\"));

  // const atlas_path = file_path.replace(/\.skel$/, '.atlas');
  // const atlasData = fs.readFileSync(atlas_path, 'utf-8');
  // const atlas = new spine.TextureAtlas(atlasData);

  let context:string = ""
  //如果是skel格式，则需要转换为十六进制并且重新打开
  // 读取文件并根据文件格式处理

  if (file_path.endsWith('.skel')) {
    try {
      const msg = ""
      mainWindow.webContents.send('alert_warning',msg);
    } catch (error) {
      console.log(error)
    }
  }
  else {
    const data = fs.readFileSync(file_path, 'utf-8');
    context = JSON.parse(data);
    console.log("非skel文件，直接读取文件内容")
  }


  if(context!="")
  {
    console.log("读取文件成功")
  }
  console.log(context)

  return {file_path};

})


function loadAtlas(atlasPath: string) {
  const atlasData = fs.readFileSync(atlasPath, 'utf-8');
  const atlas = new TextureAtlas(atlasData);

  return atlas;
}


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
