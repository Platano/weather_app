const tailwindcss = require('tailwindcss');
module.exports = {
    plugins: [
        'postcss-preset-env',
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
};
