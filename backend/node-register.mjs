import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register ts-node's ESM loader using the supported register() API.
// This avoids using the deprecated --experimental-loader flag.
register('ts-node/esm', pathToFileURL('./'));

// Import the TypeScript entrypoint.
import('./index.ts');
