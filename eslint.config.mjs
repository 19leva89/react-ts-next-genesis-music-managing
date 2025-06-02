import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([
	{
		ignores: ['client/**'],
	},
	{
		extends: compat.extends(
			"eslint-config-prettier",
			"eslint:recommended",
			"plugin:@typescript-eslint/recommended",
			"plugin:prettier/recommended"
		),

		plugins: {
			prettier,
			"@typescript-eslint": tsPlugin
		},

		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: __dirname,
			}
		},

		rules: {
			"prettier/prettier": ["error", {
				endOfLine: "auto",
				printWidth: 110,
				usePrettierrc: true,
			}],

			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",

			"@typescript-eslint/no-unused-expressions": ["error", {
				allowShortCircuit: true,
			}],
		},
	}
]);