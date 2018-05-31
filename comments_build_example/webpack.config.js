module.exports = {
    entry: './js/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, //for all files that end with js/jsx
                use: {
                    loader: 'babel-loader', //use the babel loader to load:
                    options: {
                        presets: ["es2015", "react"] //the es2015 compiler
                    }
                }
            }
        ]
    }
};
