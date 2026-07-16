export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export interface ClassDictionary {
  [id: string]: any;
}

export interface ClassArray extends Array<ClassValue> {}

/**
 * Conditionally joins classNames together.
 *
 * @param args - The class names, arrays of class names, or objects of class names to join.
 * @returns A string of space-separated class names.
 */
export function cx(...args: ClassValue[]): string {
  let classes = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Skip falsy values like false, null, undefined, 0, or empty strings
    if (!arg) continue;

    const type = typeof arg;

    if (type === 'string' || type === 'number') {
      classes += (classes ? ' ' : '') + arg;
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = cx(...arg);
        if (inner) {
          classes += (classes ? ' ' : '') + inner;
        }
      }
    } else if (type === 'object') {
      const obj = arg as ClassDictionary;
      // Check for custom toString method (e.g., CSS Modules, custom class wrappers)
      if (obj.toString !== Object.prototype.toString && typeof obj.toString === 'function') {
        classes += (classes ? ' ' : '') + obj.toString();
        continue;
      }

      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key]) {
          classes += (classes ? ' ' : '') + key;
        }
      }
    }
  }

  return classes;
}
