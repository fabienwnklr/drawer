/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  getStartedSidebar: [ 'get-started', 'constants', 'events', 'contribute'],
  examplesSidebar: [
    {
      type: 'category',
      label: 'Drawer samples',
      link: {
        type: 'generated-index',
        title: 'Examples',
        description: 'Some samples for Drawer use',
        slug: 'examples',
        keywords: ['examples', 'drawer'],
      },
      items: [
        "examples/basic",
        "examples/custom-toolbar",
        "examples/full-toolbar",
      ]
    }
  ],
  apiSidebar: [
    'api',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Drawer Api Guides',
        description: 'Check all api documentation that you can use with Drawer',
        slug: '/category/api',
        keywords: ['api'],
        image: '/img/logo.svg',
      },
      items: [
        'api/classes/Drawer.Drawer',
        'api/classes/ui_Modal.Modal',
        'api/classes/ui_Toolbar.Toolbar',
        'api/classes/ui_SettingsModal.SettingsModal',
        'api/classes/ui_ConfirmModal.ConfirmModal',
        'api/classes/utils_DrawError.DrawerError',
        'api/classes/utils_History.History',
        'api/enums/types.DrawTools',
        'api/enums/types.ToolbarPosition',
        'api/interfaces/types.DrawerOptions',
        'api/interfaces/types.Position',
        'api/interfaces/types.ModalOptions',
        'api/interfaces/types.ToolbarOptions',
        'api/modules/utils_DrawError',
        'api/modules/utils_DrawEvent',
        'api/modules/utils_History',
        'api/modules/utils_dom',
        'api/modules/utils_infos',
        'api/modules/utils_perf',
        'api/modules/utils_utils',
      ],
    },
  ],
};

module.exports = sidebars;
