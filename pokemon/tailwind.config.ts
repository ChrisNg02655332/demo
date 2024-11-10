// @ts-nocheck
import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';
import { readdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/components/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui(),
    plugin(function({ matchComponents, theme }) {
      let iconsDir = join(__dirname, 'public/icons');
      let values = {};

      let icons = [
        ['', '/'],
        ['-mini', '/'],
        ['-micro', '/'],
      ];

      icons.forEach(([suffix, dir]) => {
        readdirSync(join(iconsDir, dir)).forEach((file) => {
          let name = basename(file, '.svg') + suffix;
          values[name] = { name, fullPath: join(iconsDir, dir, file) };
        });
      });

      matchComponents(
        {
          icon: ({ name, fullPath }) => {
            const content = readFileSync(fullPath)
              .toString()
              .replace(/\r?\n|\r/g, '');

            let size = theme('spacing.6');
            if (name.endsWith('-mini')) {
              size = theme('spacing.5');
            } else if (name.endsWith('-micro')) {
              size = theme('spacing.4');
            }

            return {
              [`--icon-${name}`]: `url('data:image/svg+xml;utf8,${encodeURIComponent(content)}')`,
              '-webkit-mask': `var(--icon-${name})`,
              mask: `var(--icon-${name})`,
              'mask-repeat': 'no-repeat',
              'background-color': 'currentColor',
              'vertical-align': 'middle',
              display: 'inline-block',
              minWidth: size,
              minHeight: size,
              width: size,
              height: size,
            };
          },
        },
        { values }
      );
    })
  ],
};
export default config;
