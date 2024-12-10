// src/global.d.ts
declare global {
    interface Window {
      api: {
        getPathAndAction: () => Promise<{path : string; paras:Record<string,string[]>}>;
      };
    }
  }

  export {};