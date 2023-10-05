import React, { useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';
import { Drawer } from '../../../static/drawer.cjs';
import '../../../static/style.css';

export default function Basics() {
  useEffect(() => {
    const $el = document.getElementById('canvas-container');
    new Drawer($el);
  }, []);

  return (
    <>
      <h4>The most vanilla of examples.</h4>

      <CodeBlock className="language-html" title="Html">
        {`<div id="canvas-container"></div>`}
      </CodeBlock>
      <CodeBlock className="language-javascript" title="Javascript">
{`const $el = document.getElementById('drawer-container');
new Drawer($el);`}
      </CodeBlock>

      <div id="canvas-container"></div>
    </>
  );
}
