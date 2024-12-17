// global.d.ts
// declare global {
//   interface Window {
//     api:Api
//   }
// }

// export interface Api {
//     getPathAndAction: () => Promise<{ file_path: string; paras: Record<string, string[]> }>;
//     alert_warning: (msg: string) => void;
// }

// export {};

// electron-env.d.ts
export interface IElectronAPI {
	// getFilePath 方法时preload.ts中使用的方法，后面添加方法，此处也要同步申明
    getPathAndAction: () => Promise<{ file_path: string; paras: Record<string, string[]> }>;
    // alert_warning: (msg: string) => void;
    alert_warning: (callback: (msg: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}