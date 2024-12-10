// src/global.d.ts
declare global {
    interface Window {
      api: {
        getPathAndAction: () => Promise<{path : string; action:Dictionary<string,List<string>>}>;
      };
    }
  }

  export {};