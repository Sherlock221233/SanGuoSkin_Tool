import { app, shell, BrowserWindow, ipcMain,dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import path from 'path-browserify';
// import spine from "@esotericsoftware/spine-core"

let cur_path;
// const __dirname = __webpack_require__.c[__dirname]; // webpack 提供的 __dirname
const path = require('path');
const fs = require('fs');

let mainWindow
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      sandbox: false,
      preload: join(__dirname, '../preload/index.mjs'),
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

  let context: Record<string, any> = {};
  //如果是skel格式，则需要转换为十六进制并且重新打开
  // 读取文件并根据文件格式处理

  const paras:Record<string,string[]> = {};

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

    try {
      if(context.skins)
        {
          paras['skins'] = [];
          for (const skin of context.skins) {

            paras['skins'].push(skin.name);
          }
        }

        if(context.animations)
        {
          paras['animations'] = [];
          Object.keys(context.animations).forEach(key => {
            paras.animations.push(key);
        });
        }

        if(context.skeleton)
          {
            paras['version'] = [];
            paras['version'].push(context.skeleton.spine.match(/(\d+\.\d+?)/)[0])
          }

    } catch (error:any) {
      dialog.showErrorBox("错误",error.toString());
    }


    }

  return {file_path,paras};

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
