import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
    ...nextCoreWebVitals,
    {
        rules: {
            '@next/next/no-img-element': 'off',
            '@next/next/no-html-link-for-pages': 'off',
            'react-hooks/set-state-in-effect': 'warn',
            'react-hooks/incompatible-library': 'warn',
            'react-hooks/immutability': 'warn',
            'react-hooks/static-components': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
];

export default eslintConfig;
