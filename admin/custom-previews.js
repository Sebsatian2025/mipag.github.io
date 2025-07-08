// No se usan importaciones de React, ReactDOM o marked aquí.
// Netlify CMS proporciona React y ReactDOM globalmente.
// marked debe cargarse como un script global en admin/index.html.

// --- Componente de Vista Previa Principal para la Página de Inicio (HomePreview) ---
// Este componente recibirá todos los datos de la entrada 'home.json'
class HomePreview extends window.React.Component {
  render() {
    const { entry, getAsset } = this.props;
    if (!entry || !entry.getIn) {
      console.log('HomePreview: entry o getIn no están definidos.');
      return null;
    }

    const data = entry.get('data');
    console.log('HomePreview: Datos recibidos:', data ? data.toJS() : 'No hay datos');

    const getField = (fieldName) => {
      const value = data.get(fieldName);
      console.log(`HomePreview: Campo '${fieldName}':`, value);
      return value;
    };
    const getMarkdownHtml = (fieldName) => {
      const content = getField(fieldName);
      // Asegurarse de que window.marked es una función antes de llamarla
      return content && typeof window.marked === 'function' ? window.marked(content) : content || '';
    };
    const getImageUrl = (fieldName) => {
      const path = getField(fieldName);
      const url = path ? getAsset(path).toString() : '';
      console.log(`HomePreview: Imagen '${fieldName}' URL:`, url);
      return url;
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

      // Sección ABOUT
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

      // Sección SERVICES
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

      // Sección PORTFOLIO
      window.React.createElement(
        'section',
        { className: 'preview-section' },
        window.React.createElement('h2', {}, getField('mainTitlePortfolio')),
        window.React.createElement(
          'div',
          { className: 'portfolio-container' },

          // Portfolio Item 1
          window.React.createElement(
            'div',
            { className: 'portfolio-item' },
            getImageUrl('portfolioImage1') && window.React.createElement('img', {
              src: getImageUrl('portfolioImage1'),
              alt: 'Portfolio 1',
              className: 'portfolio-image' // Añadido clase para estilos
            }),
            window.React.createElement('h3', {}, getField('textPortfolioImage1')),
            window.React.createElement('div', {
              className: 'portfolio-subtext',
              dangerouslySetInnerHTML: { __html: getMarkdownHtml('subtextPortfolioImage1') }
            })
          ),

          // Portfolio Item 2
          window.React.createElement(
            'div',
            { className: 'portfolio-item' },
            getImageUrl('portfolioImage2') && window.React.createElement('img', {
              src: getImageUrl('portfolioImage2'),
              alt: 'Portfolio 2',
              className: 'portfolio-image' // Añadido clase para estilos
            }),
            window.React.createElement('h3', {}, getField('textPortfolioImage2')),
            window.React.createElement('div', {
              className: 'portfolio-subtext',
              dangerouslySetInnerHTML: { __html: getMarkdownHtml('subtextPortfolioImage2') }
            })
          ),

          // Portfolio Item 3
          window.React.createElement(
            'div',
            { className: 'portfolio-item' },
            getImageUrl('portfolioImage3') && window.React.createElement('img', {
              src: getImageUrl('portfolioImage3'),
              alt: 'Portfolio 3',
              className: 'portfolio-image' // Añadido clase para estilos
            }),
            window.React.createElement('h3', {}, getField('textPortfolioImage3')),
            window.React.createElement('div', {
              className: 'portfolio-subtext',
              dangerouslySetInnerHTML: { __html: getMarkdownHtml('subtextPortfolioImage3') }
            })
          ),

          // Portfolio Item 4
          window.React.createElement(
            'div',
            { className: 'portfolio-item' },
            getImageUrl('portfolioImage4') && window.React.createElement('img', {
              src: getImageUrl('portfolioImage4'),
              alt: 'Portfolio 4',
              className: 'portfolio-image' // Añadido clase para estilos
            }),
            window.React.createElement('h3', {}, getField('textPortfolioImage4')),
            window.React.createElement('div', {
              className: 'portfolio-subtext',
              dangerouslySetInnerHTML: { __html: getMarkdownHtml('subtextPortfolioImage4') }
            })
          )
        )
      ),

      // Sección CONTACTO
      window.React.createElement(
        'section',
        { className: 'preview-section' },
        window.React.createElement('h2', {}, getField('mainTitleContact')),
        window.React.createElement(
          'div',
          { className: 'contact-buttons-container' }, // Añadida clase para el contenedor de botones
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
}

if (window.CMS) {
  window.CMS.registerPreviewTemplate('home', HomePreview);
} else {
  console.error("Netlify CMS (CMS) no está disponible globalmente para registrar las vistas previas.");
}
