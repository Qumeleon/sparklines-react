import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import pkg from './package.json' with { type: 'json' };

const external = [
    ...Object.keys(pkg.peerDependencies || {}),
    'react/jsx-runtime'
];

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: pkg.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        external,
        plugins: [
            peerDepsExternal(),
            resolve({
                extensions: ['.js', '.ts', '.tsx'],
            }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                presets: [
                    ['@babel/preset-react', { runtime: 'classic' }]
                ],
                exclude: 'node_modules/**'
            }),
        ],
    },
    {
        input: 'dist/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
];
