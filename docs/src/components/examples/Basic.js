import React, { useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { Drawer } from '../../../static/Drawer';
import '../../../static/style.css';

export default function Basic() {
  useEffect(() => {
    const $el = document.getElementById('canvas-container');
    window.basic = new Drawer($el);
  }, []);

  return (
    <>
      <h4>The most vanilla of examples.</h4>

      <Admonition type="tip" icon="💡" title="Tip...">
        <p>
          You can access to this <code>Drawer</code> instance in console, just typing <code>basic</code>.
        </p>
      </Admonition>
      <CodeBlock className="language-html" title="Html">
        {`<div id="canvas-container"></div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
        {`const $el = document.getElementById('drawer-container');
window.basic = new Drawer($el);`}
      </CodeBlock>

      <div id="canvas-container"></div>
    </>
  );
}
