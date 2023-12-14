import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        Drawer was designed from the ground up to be easily instancied and used.
      </>
    ),
  },
  {
    title: 'Fully customisable',
    Svg: require('@site/static/img/advanced_customization.svg').default,
    description: (
      <>
        Drawer was designed for be fully customisable. U can use integrated tool or create you'r own. Be free !
      </>
    ),
  },
  {
    title: 'Open source',
    Svg: require('@site/static/img/open_source.svg').default,
    description: (
      <>
        Drawer is fully free and open source. This approach allows to have broader views and improve the base code


      </>
    ),
  },
  {
    title: 'Using Typescript',
    Svg: require('@site/static/img/code_review.svg').default,
    description: (
      <>
        Drawer is fully coded using Typescript and Vite. Typescript is an additional security on the reliability of the code.
      </>
    ),
  },
  {
    title: 'Lightweight',
    Svg: require('@site/static/img/fast_loading.svg').default,
    description: (
      <>
        Drawer is lightweight (127ko) and fast.
      </>
    ),
  },
  {
    title: 'For all device',
    Svg: require('@site/static/img/mobile_content.svg').default,
    description: (
      <>
        Drawer is also designed for mobile.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
