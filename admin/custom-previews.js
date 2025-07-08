function HomePreview({ entry, getAsset }) {
  if (!entry || !entry.getIn) {
    console.log('HomePreview: entry o getIn no están definidos.');
    return null;
  }

  const data = entry.get('data');

  const getField = (fieldName) => {
    const value = data.get(fieldName);
    return value;
  };

  const getMarkdownHtml = (fieldName) => {
    const content = getField(fieldName);
    return content && typeof window.marked === 'function' ? window.marked(content) : content || '';
  };

  const getImageUrl = (fieldName) => {
    const path = getField(fieldName);
    return path ? getAsset(path).toString() : '';
  };

  return window.React.createElement(
    'div',
    { className: 'preview-container' },
    
    // Sección HOME
    window.React.createElement(
      'section',
      { className: 'preview-section' },
      window.React.createElement('h2', {}, getField('mainTitleHome')),
      window.React.createElement('div', { className: 'preview-text', dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleHome') } }),
      getField('buttonHomeText') && window.React.createElement('a', {
        href: getField('buttonHomeUrl'),
        className: 'preview-button preview-button-home'
      }, getField('buttonHomeText')),
      getImageUrl('heroBackgroundImageHome') && window.React.createElement('img', {
        src: getImageUrl('heroBackgroundImageHome'),
        alt: 'Fondo Home',
        className: 'preview-image'
      })
    ),

    // ABOUT
    window.React.createElement(
      'section',
      { className: 'preview-section' },
      window.React.createElement('h2', {}, getField('mainTitleAbout')),
      window.React.createElement('div', { className: 'preview-text', dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleAbout') } }),
      getField('buttonAboutText') && window.React.createElement('a', {
        href: getField('buttonAboutUrl'),
        className: 'preview-button preview-button-about'
      }, getField('buttonAboutText'))
    ),

    // SERVICES
    window.React.createElement(
      'section',
      { className: 'preview-section' },
      window.React.createElement('h2', {}, getField('mainTitleServices')),
      getImageUrl('heroBackgroundImageServices') && window.React.createElement('img', {
        src: getImageUrl('heroBackgroundImageServices'),
        alt: 'Fondo Servicios',
        className: 'preview-image'
      }),
      getField('buttonServicesText') && window.React.createElement('a', {
        href: getField('buttonServicesUrl'),
        className: 'preview-button preview-button-services'
      }, getField('buttonServicesText'))
    ),

    // PORTFOLIO
    window.React.createElement(
      'section',
      { className: 'preview-section' },
      window.React.createElement('h2', {}, getField('mainTitlePortfolio')),
      window.React.createElement(
        'div',
        { className: 'portfolio-container' },

        ...[1, 2, 3, 4].map((i) => (
          window.React.createElement(
            'div',
            { className: 'portfolio-item', key: `portfolio-${i}` },
            getImageUrl(`portfolioImage${i}`) && window.React.createElement('img', {
              src: getImageUrl(`portfolioImage${i}`),
              alt: `Portfolio ${i}`,
              className: 'portfolio-image'
            }),
            window.React.createElement('h3', {}, getField(`textPortfolioImage${i}`)),
            window.React.createElement('div', {
              className: 'portfolio-subtext',
              dangerouslySetInnerHTML: { __html: getMarkdownHtml(`subtextPortfolioImage${i}`) }
            })
          )
        ))
      )
    ),

    // CONTACTO
    window.React.createElement(
      'section',
      { className: 'preview-section' },
      window.React.createElement('h2', {}, getField('mainTitleContact')),
      window.React.createElement(
        'div',
        { className: 'contact-buttons-container' },
        getField('buttonContact1Text') && window.React.createElement('a', {
          href: getField('buttonContact1Url'),
          className: 'preview-button preview-button-contact-1'
        }, getField('buttonContact1Text')),
        getField('buttonContact2Text') && window.React.createElement('a', {
          href: getField('buttonContact2Url'),
          className: 'preview-button preview-button-contact-2'
        }, getField('buttonContact2Text'))
      )
    ),

    // FOOTER
    window.React.createElement(
      'footer',
      { className: 'preview-footer' },
      window.React.createElement('p', {}, getField('subtextFooter'))
    )
  );
}

// Registro
if (window.CMS) {
  window.CMS.registerPreviewTemplate('home', HomePreview);
}
