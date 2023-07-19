declare global {

  const $fx: {
    /**
     * A random 64-character hexadecimal string will be used for this particular variable. 
     * When someone mints a token from your GT, this variable will be hardcoded with a static hash.
     */
    hash: string,
    /**
     * The wallet address of the minter is injected into the iteration as a string. 
     */
    minter: string,
    /**
     * The iteration number is obtained directly from the **fxiteration** URL parameter when the iteration is loaded.
     */
    iteration: number,
    /**
     * A pseudorandom number generator (PRNG) function is seeded with the hash, which generates deterministic pseudorandom numbers (PRNs) between 0 and 1.
     */
    rand: {
      (): number;
      reset: () => void;
    }
    /**
     * A pseudorandom number generator (PRNG) function is used, which is seeded with the minter address. This PRNG generates deterministic pseudorandom numbers between 0 and 1.
     */
    randminter: {
      (): number;
      reset: () => void;
    }


    /**
    * The code is executed within the context, which is directly retrieved from the **fxcontext** URL parameter. The fxhash will ensure that a fxcontext flag is passed, depending on the location where the code is executed. For example, on the minting UI for collectors, the fxcontext is set to `minting`.
    * 
    * There are three possible values for this flag.
    * - `standalone`: (default) refers to when the final output should be displayed, such as on the main project page.
    * - `capture`: when the code is executed in the capture environment, it allows you to obtain an image preview of an iteration.
    * - `minting`: refers to the execution of code during the minting flow of the collector.
     */
    context: "standalone" | "capture" | "minting",
    /**
     * Trigger for capture module
     */
    preview: () => void,
    /**
     * Capture module flag
     */
    isPreview: boolean,


    /**
     * Sets your projects features
     */
    features: (features: FxFeatures) => void,
    /**
     * Get feature by id
     */
    getFeature: (id: string) => FxFeatureValue | undefined,
    /**
     * Get all features
     */
    getFeatures: () => FxFeatures,
    /**
     * JSON.stringify that can handle bigint
     */
    stringifyParams: (definitions) => string,


    /**
     * Sets fx(params) definitions
     */
    params: (paramsDefinitions: FxParamBaseDefinition[]) => void,
    /**
     * Gets fx(params) definitions
     */
    getDefinitions: () => FxParamBaseDefinition[],
    /**
     * Returns the processed value of the parameter where the id matches the parameter of the same id as defined in your params definition.
     */
    getParam: <T extends FxParamValue>(id: string) => T,
    /**
     * Returns an object containing the processed parameters, with the parameter IDs as the keys. 
     * Must be called after the `$fx.params` function.
     */
    getParams: () => FxParamsValues,
    /**
     * Returns the hexadecimal string byte sequence corresponding to the parameter, before any processing. 
     * Must be called after `$fx.params` function.
     */
    getRawParam: (id: string) => string,
    /**
     * Returns all raw fx(params) values
     */
    getRawParams: () => { [string]: string },


    on: (event: FxEventId, handler: () => void, onDone: () => void) => void,
    /**
     * Allow you to emit fxhash-related events, 
     * which may have an effect on the parent running the in which the code is executed.
     */
    emit: (event: FxEventId, data: FxEmitData) => void,
  }

  interface FxParamBaseDefinition {
    id: string,
    default?: string | number | bigint | boolean
    name?: string,
    update?: "page-reload" | "sync" | "code-driven",
    type: "number" | "string" | "boolean" | "color",
    options?: object
  }
  interface FxParamBigIntDefinition extends FxParamBaseDefinition {
    type: "bigint",
    default?: bigint,
    options: {
      mint: bigint,
      max: bigint,
    },
  }
  interface FxParamSelectDefinition extends FxParamBaseDefinition {
    type: "select",
    default?: string,
    options: string[],
  }
  interface FxParamsValues {
    [string]: FxParamValue
  }

  type FxParamNumber = number
  type FxParamBoolean = boolean
  type FxParamString = string
  type FxParamValue = FxParamBoolean
    | FxParamNumber
    | FxParamString
    | FxParamColor

  interface FxParamColor {
    arr: {
      rgb: [number, number, number],
      rgba: [number, number, number, number],
    },
    hex: {
      rgb: string,
      rgba: string,
    },
    obj: {
      rgb: { r: number, g: number, b: number },
      rgba: { r: number, g: number, b: number, a: number },
    }
  }

  type FxFeatureValue = string | number | boolean
  interface FxFeatures {
    [string]: FxFeatureValue
  }

  type FxEventId = 'params:update'
  type FxEmitData = { [string]: FxParamValue }
  type FxEmitFunction = (event: FxEventId, data: FxEmitData) => void
}

export { }
