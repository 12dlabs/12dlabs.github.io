/**
  * Module name.
  */
export declare var moduleName: string;
/**
  * Root path.
  */
export declare var rootPath: string;
/**
  * Gets SVG source string.
  * @param key  The key.
  */
export declare function svg(key: string): string;
/**
  * Gets HTML source string.
  * @param key  The key.
  */
export declare function html(key: string): string;
/**
  * Gets local string.
  * @param key  The key.
  */
export declare function strings(key: string, lang?: string): string;
/**
  * Sets strings of specific market code.
  * @param lang  The market code.
  * @param value  The strings.
  */
export declare function local(lang: string, value: AliHub.Collection.DictionaryContract<string> | Object): void;
/**
  * Gets data package resolver.
  * @param key  The key.
  */
export declare function webResolver<T>(key: string, value?: string | AliHub.Web.WebResolverInfoContract<T>): AliHub.Web.BaseDataPackageResolver<T>;
