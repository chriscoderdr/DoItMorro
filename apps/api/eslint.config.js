// eslint.config.js
const js = require("@eslint/js");
const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const prettierPlugin = require("eslint-plugin-prettier");
const globals = require("globals");

module.exports = [
    // JavaScript configurations
    js.configs.recommended,
    {
        files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
        languageOptions: {
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
            },
        },
    },

    // TypeScript configurations
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: "./tsconfig.json",
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            // Customize TypeScript rules as needed
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-empty-object-type": "off",
        },
    },

    // Prettier integration
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": [
                "error",
                {},
                {
                    usePrettierrc: true,
                },
            ],
        },
    },
];
