import React, { useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
// import { Drawer } from '../../js/drawer';
import '../../../static/css/style.css';

export default function CustomToolbar() {
  useEffect(() => {
    const $el = document.getElementById('canvas-container');
    // eslint-disable-next-line no-undef
    const customToolbar = new Drawer.Drawer($el, { defaultToolbar: false });
    customToolbar.toolbar.addToolbar();
    customToolbar.toolbar.addDrawGroupBtn();
    window.customToolbar = customToolbar;
  }, []);

  return (
    <>
      <h4>The most vanilla of examples.</h4>

      <Admonition type="tip" icon="💡" title="Tip...">
        <p>
          You can access to this <code>Drawer</code> instance in console, just typing{' '}
          <code>customToolbar.toolbar.addLineThicknessBtn();</code> for example.
        </p>
        <p>
          For more methods, see
          <Link className="button--secondary button--sm margin-left--xs" to="/docs/api/classes/ui_Toolbar.Toolbar#methods">
            Toolbar API doc
          </Link>
        </p>
      </Admonition>
      <CodeBlock className="language-html" title="Html">
        {`<div id="canvas-container"></div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`const $el = document.getElementById('drawer-container');
const customToolbar = new Drawer($el, { defaultToolbar: false });
customToolbar.toolbar.addToolbar();
customToolbar.toolbar.addBrushBtn();
customToolbar.toolbar.addEraserBtn();`}
      </CodeBlock>

      <div id="canvas-container"></div>
    </>
  );
}
