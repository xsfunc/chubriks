declare global {
  interface FxParam {
    id: string,
    type: "number" | "string" | "boolean" | "color" | "select" | "bigint",
    default?: string | number | bigint | boolean
    name?: string,
    update?: "page-reload" | "sync" | "code-driven",
    options?: object,
  }

  type FxFeatureValue = string | number | boolean
  interface FxFeatures {
    [string]: FxFeatureValue
  }

  const $fx: {
    hash: string, // a random 64 characters hexadecimal string. This particular variable will be hardcoded with a static hash when someone mints a token from your GT
    minter: string, // The string of the wallet address of the minter injected into the iteration
    isPreview: boolean, // is TRUE when capture module is running the project
    
    /**
     * The iteration number is obtained directly from the **fxiteration** URL parameter when the iteration is loaded.
     */
    iteration: number,

    /**
    * The code is executed within the context, which is directly retrieved from the **fxcontext** URL parameter. The fxhash will ensure that a fxcontext flag is passed, depending on the location where the code is executed. For example, on the minting UI for collectors, the fxcontext is set to `minting`.
    * 
    * There are three possible values for this flag.
    * - `standalone`: (default) refers to when the final output should be displayed, such as on the main project page.
    * - `capture`: when the code is executed in the capture environment, it allows you to obtain an image preview of an iteration.
    * - `minting`: refers to the execution of code during the minting flow of the collector.
     */
    context: "standalone" | "capture" | "minting",

    preview: () => void, // trigger for capture module

    params: (params: FxParam[]) => void, // sets your projects fx(params) definitions
    getParam: (id: string) => any, // get transformed fx(params) value by id
    getRawParam: (id: string) => any, // get raw fx(params) value by id
    getParams: () => FxParam[], // get all transformed fx(params) values
    getRawParams: () => FxParam[], // get all raw fx(params) values
    getDefinitions: () => any, // get all fx(params) definitions

    features: (features: FxFeatures) => void, // sets your projects features
    getFeature: (id: string) => FxFeatureValue | undefined, // get feature by id
    getFeatures: () => FxFeatures, // get all features
    stringifyParams: (definitions) => string, // JSON.stringify that can handle bigint

    rand: () => number, // a PRNG function seeded with the hash, that generates deterministic PRN between 0 and 1
    rand: {
      reset: () => void,
    }

    randminter: () => number, // a PRNG function seeded with the minter address that generates deterministic PRN between 0 and 1
    randminter: {
      reset: () => void,
    }
  }
}

export { }
