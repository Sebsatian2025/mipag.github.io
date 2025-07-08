function initPreviewWhenReactIsReady() {
  if (typeof window.React === "undefined" || typeof window.CMS === "undefined") {
    setTimeout(initPreviewWhenReactIsReady, 100); // Espera 100ms y vuelve a intentar
    return;
  }

  // --- Tu clase HomePreview ---
  class HomePreview extends window.React.Component {
    render() {
      const { entry, getAsset } = this.props;
      if (!entry || !entry.getIn) return null;

      const data = entry.get('data');
      const getField = (fieldName) => data.get(fieldName);
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
        // HOME
        window.React.createElement(
          'section',
          { className: 'preview-section' },
          window.React.createElement('h2', {}, getField('mainTitleHome')),
          window.React.createElement('div', { dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleHome') } }),
          getField('buttonHomeText') && window.React.createElement('a', {
            href: getField('buttonHomeUrl'),
            className: 'preview-button'
          }, getField('buttonHomeText')),
          getImageUrl('heroBackgroundImageHome') && window.React.createElement('img', {
            src: getImageUrl('heroBackgroundImageHome'),
            alt: 'Fondo Home'
          })
        ),

        // ABOUT
        window.React.createElement(
          'section',
          { className: 'preview-section' },
          window.React.createElement('h2', {}, getField('mainTitleAbout')),
          window.React.createElement('div', { dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleAbout') } }),
          getField('buttonAboutText') && window.React.createElement('a', {
            href: getField('buttonAboutUrl'),
            className: 'preview-button'
          }, getField('buttonAboutText'))
        ),

        // SERVICES
        window.React.createElement(
          'section',
          { className: 'preview-section' },
          window.React.createElement('h2', {}, getField('mainTitleServices')),
          getImageUrl('heroBackgroundImageServices') && window.React.createElement('img', {
            src: getImageUrl('heroBackgroundImageServices'),
            alt: 'Fondo Servicios'
          }),
          getField('buttonServicesText') && window.React.createElement('a', {
            href: getField('buttonServicesUrl'),
            className: 'preview-button'
          }, getField('buttonServicesText'))
        ),

        // PORTFOLIO
        window.React.createElement(
          'section',
          { className: 'preview-section' },
          window.React.createElement('h2', {}, getField('mainTitlePortfolio')),
          [1, 2, 3, 4].map(i => (
            window.React.createElement(
              'div',
              { className: 'portfolio-item', key: i },
              getImageUrl(`portfolioImage${i}`) && window.React.createElement('img', {
                src: getImageUrl(`portfolioImage${i}`),
                alt: `Portfolio ${i}`
              }),
              window.React.createElement('h3', {}, getField(`textPortfolioImage${i}`)),
              window.React.createElement('div', {
                dangerouslySetInnerHTML: { __html: getMarkdownHtml(`subtextPortfolioImage${i}`) }
              })
            )
          ))
        ),

        // CONTACT
        window.React.createElement(
          'section',
          { className: 'preview-section' },
          window.React.createElement('h2', {}, getField('mainTitleContact')),
          window.React.createElement(
            'div',
            { className: 'contact-buttons-container' },
            getField('buttonContact1Text') && window.React.createElement('a', {
              href: getField('buttonContact1Url'),
              className: 'preview-button'
            }, getField('buttonContact1Text')),
            getField('buttonContact2Text') && window.React.createElement('a', {
              href: getField('buttonContact2Url'),
              className: 'preview-button'
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
  }

  // Registramos el preview
  window.CMS.registerPreviewTemplate('home', HomePreview);
}

// Iniciamos
initPreviewWhenReactIsReady();
