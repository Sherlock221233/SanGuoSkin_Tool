// src/global.d.ts
declare global {
    interface Window {
      api: {
        getPathAndAction: () => Promise<{path : string; action:List<string>}>;
      };
    }
  }

  export {};