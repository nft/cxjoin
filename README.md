# cxjoin

A lightweight, zero-dependency utility for conditionally joining class names together. It supports string, number, array, and object arguments, and serves as a highly optimized, fully-typed replacement for `classnames` or `clsx`.

## Features

- 🚀 **Super lightweight**: Zero dependencies.
- 📦 **Dual ESM/CommonJS**: Pre-configured exports for modern build chains and Node.js.
- 📘 **TypeScript Ready**: Full type declarations included out-of-the-box.
- 🛠 **Custom `toString()` support**: Works seamlessly with objects having custom `toString()` methods (e.g. CSS Modules).
- 🧹 **Robust**: Ignores falsy values (like `false`, `null`, `undefined`, `0`, or `""`).

## Installation

You can install `cxjoin` using your preferred package manager:

```bash
# npm
npm install cxjoin

# yarn
yarn add cxjoin

# pnpm
pnpm add cxjoin

# bun
bun add cxjoin
```

## Usage

```typescript
import { cx } from 'cxjoin';

// Strings & Numbers
cx('foo', 'bar'); // => 'foo bar'
cx('foo', 100, 'bar'); // => 'foo 100 bar'

// Falsy values are ignored
cx('foo', false, 'bar', null, undefined, '', 0); // => 'foo bar'

// Arrays (recursively flattened)
cx(['foo', 'bar']); // => 'foo bar'
cx(['foo', ['bar', 'baz']]); // => 'foo bar baz'

// Objects (keys with truthy values are added)
cx({ foo: true, bar: false, baz: true }); // => 'foo baz'

// Custom toString objects
const customObj = {
  toString() {
    return 'custom-class';
  }
};
cx(customObj); // => 'custom-class'

// Mixed arguments
cx('foo', ['bar', { baz: true, qux: false }], { final: true });
// => 'foo bar baz final'
```

## Development & Build

### Install dependencies
```bash
bun install
```

### Run Tests
```bash
bun test
```

### Build Package
Compile CJS, ESM, and TypeScript definitions into the `dist` directory:
```bash
bun run build
```

## License

MIT
