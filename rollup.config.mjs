import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const dev = !!process.env.ROLLUP_WATCH;

export default {
  input: 'src/emby-meets-homeassistant.ts',
  output: {
    file: 'dist/emby-meets-homeassistant.js',
    format: 'es',
    sourcemap: dev,
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript(),
    !dev && terser(),
  ].filter(Boolean),
  watch: {
    clearScreen: false,
  },
};
