// @ts-nocheck
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { readdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#192232',
        secondary: '#80C926',
        accent: '#EFF3F4',
        dark: '#192232',
      },
    },
  },
  plugins: [
    plugin(function ({ matchComponents, theme }) {
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
    }),
  ],
};
export default config;
