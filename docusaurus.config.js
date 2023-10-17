// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MythicalSystems',
  tagline: 'Welcome to the enchanting realm where magic begins! Since our inception in 2021, we have garnered the trust of over 10,000 users and continue to captivate their imaginations.',
  favicon: 'https://avatars.githubusercontent.com/u/117385445',

  // Set the production url of your site here
  url: 'https://docs.mythicalsystems.me',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MythicalLTD', // Usually your GitHub org/user name.
  projectName: 'MythicalDocs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'https://camo.githubusercontent.com/4cf45904e67161611071520974b92a39ef49544ad2c03c027a4e07bf7f44d871/68747470733a2f2f692e696d6775722e636f6d2f784933474c46632e6a706567',
      navbar: {
        title: 'MythicalSystems',
        logo: {
          alt: 'MythicalSystems Logo',
          src: 'https://avatars.githubusercontent.com/u/117385445?s=200&v=4',
        },
        items: [
          {
            to: 'https://mythicalsystems.me',
            activeBasePath: 'docs',
            label: 'Home Page',
            position: 'left',
          },
          {
            to: 'https://github.com/mythicalltd',
            activeBasePath: 'docs',
            label: 'GitHub',
            position: 'left',
          },
          {
            to: 'https://discord.gg/eWUYVEZVxz',
            activeBasePath: 'docs',
            label: 'Discord',
            position: 'left',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
        ],
        
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'MythicalDash',
                to: '/docs/mythicaldash',
              },
              {
                label: 'KosmaPanel',
                to: '/docs/kosmapanel',
              },
              {
                label: 'KosmaPanel Daemon',
                to: '/docs/mythicaldash-daemon',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/mythicalltd',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/eWUYVEZVxz',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Sponsor',
                href: 'https://github.com/sponsors/nayskutzu',
              },
              {
                label: 'Status',
                href: 'https://status.mythicalsystems.me',
              },
              {
                label: 'Company houses',
                href: 'https://find-and-update.company-information.service.gov.uk/company/15124191',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MythicalSystems LTD. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
    
};
module.exports = {
  plugins: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
  },
};
module.exports = config;
