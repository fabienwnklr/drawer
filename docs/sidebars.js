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
        'api/classes/ui_Toolbar.Toolbar',
        'api/classes/ui_Modal.Modal',
        'api/classes/ui_SettingsModal.SettingsModal',
        'api/classes/utils_DrawError.DrawerError',
        'api/classes/utils_History.History',
        'api/enums/types_drawer.DrawTools',
        'api/enums/types_toolbar.ToolbarPosition',
        'api/interfaces/types_drawer.DrawerOptions',
        'api/interfaces/types_drawer.Position',
        'api/interfaces/types_modal.ModalOptions',
        'api/interfaces/types_toolbar.ToolbarOptions',
        'api/modules/icons_arrow',
        'api/modules/icons_brush',
        'api/modules/icons_circle',
        'api/modules/icons_clear',
        'api/modules/icons_close',
        'api/modules/icons_color',
        'api/modules/icons_download',
        'api/modules/icons_eraser',
        'api/modules/icons_line',
        'api/modules/icons_rect',
        'api/modules/icons_redo',
        'api/modules/icons_setting',
        'api/modules/icons_shape',
        'api/modules/icons_square',
        'api/modules/icons_star',
        'api/modules/icons_text',
        'api/modules/icons_triangle',
        'api/modules/icons_undo',
        'api/modules/icons_upload',
        'api/modules/utils_DrawError',
        'api/modules/utils_DrawEvent',
        'api/modules/utils_History',
        'api/modules/utils_dom',
        'api/modules/utils_infos',
        'api/modules/utils_perf',
        'api/modules/utils_utils',
        'api/modules/vite_env',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
