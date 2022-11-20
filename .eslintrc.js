module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "cypress/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:cypress/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "cypress"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off", // 关闭 自定义规则
        "no-var": "error", //禁用 var，用 let 和 const 代替
        "quotes": ["warn", "single"], // 单引号
        "@typescript-eslint/no-var-requires": 0, // 允许使用 require
        // "no-debugger": "warn",
        // "cypress/no-assigning-return-values": "error",
        // "cypress/no-unnecessary-waiting": "error",
        // "cypress/assertion-before-screenshot": "warn",
        // "cypress/no-force": "warn",
        // "cypress/no-async-tests": "error",
        // "cypress/no-pause": "error"
    }
}
