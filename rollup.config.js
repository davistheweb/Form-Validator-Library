import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'named', // Changed from 'default' to 'named'
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named', // Changed from 'default' to 'named'
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist',
    }),
    resolve(),
    commonjs()
  ],
  external: ['react', 'react-dom'],
};