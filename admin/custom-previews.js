// No se usan importaciones de React, ReactDOM o marked aquí.
// Netlify CMS proporciona React y ReactDOM globalmente.
// marked debe cargarse como un script global en admin/index.html.

// --- Componente de Vista Previa Principal para la Página de Inicio (HomePreview) ---
// Este componente recibirá todos los datos de la entrada 'home.json'
class HomePreview extends window.React.Component {
    render() {
      const { entry, getAsset } = this.props;
      // Asegurarse de que 'entry' tenga datos antes de intentar acceder a ellos
      if (!entry || !entry.getIn) {
        console.log('HomePreview: entry o getIn no están definidos.');
        return null;
      }
  
      const data = entry.get('data'); // Obtiene todos los datos del documento home.json
      console.log('HomePreview: Datos recibidos:', data ? data.toJS() : 'No hay datos'); // Convierte a JS para fácil lectura
  
      // Funciones auxiliares para obtener contenido de forma segura
      const getField = (fieldName) => {
        const value = data.get(fieldName);
        console.log(`HomePreview: Campo '${fieldName}':`, value);
        return value;
      };
      const getMarkdownHtml = (fieldName) => {
        const content = getField(fieldName);
        return content ? window.marked(content) : '';
      };
      const getImageUrl = (fieldName) => {
        const path = getField(fieldName);
        const url = path ? getAsset(path).toString() : '';
        console.log(`HomePreview: Imagen '${fieldName}' URL:`, url);
        return url;
      };
  
      // --- Renderizado de la Vista Previa ---
      // Añadimos un borde para asegurar que el contenedor de la vista previa es visible
      return window.React.createElement(
        'div',
        { style: { padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh', border: '2px solid red' } }, // Borde rojo para depuración
  
        // Sección HOME
        window.React.createElement(
          'section',
          { style: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
          window.React.createElement('h2', { style: { fontSize: '24px', marginBottom: '10px' } }, getField('mainTitleHome')),
          window.React.createElement('div', { style: { fontSize: '16px', color: '#555' }, dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleHome') } }),
          getField('buttonHomeText') && window.React.createElement('a', { href: getField('buttonHomeUrl'), style: { display: 'inline-block', marginTop: '15px', padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, getField('buttonHomeText')),
          getImageUrl('heroBackgroundImageHome') && window.React.createElement('img', { src: getImageUrl('heroBackgroundImageHome'), alt: 'Fondo Home', style: { maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '5px' } })
        ),
  
        // Sección ABOUT
        window.React.createElement(
          'section',
          { style: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
          window.React.createElement('h2', { style: { fontSize: '24px', marginBottom: '10px' } }, getField('mainTitleAbout')),
          window.React.createElement('div', { style: { fontSize: '16px', color: '#555' }, dangerouslySetInnerHTML: { __html: getMarkdownHtml('mainSubtitleAbout') } }),
          getField('buttonAboutText') && window.React.createElement('a', { href: getField('buttonAboutUrl'), style: { display: 'inline-block', marginTop: '15px', padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, getField('buttonAboutText'))
        ),
  
        // Sección SERVICES
        window.React.createElement(
          'section',
          { style: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
          window.React.createElement('h2', { style: { fontSize: '24px', marginBottom: '10px' } }, getField('mainTitleServices')),
          getImageUrl('heroBackgroundImageServices') && window.React.createElement('img', { src: getImageUrl('heroBackgroundImageServices'), alt: 'Fondo Servicios', style: { maxWidth: '100%', height: 'auto', marginTop: '20px', borderRadius: '5px' } }),
          getField('buttonServicesText') && window.React.createElement('a', { href: getField('buttonServicesUrl'), style: { display: 'inline-block', marginTop: '15px', padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, getField('buttonServicesText'))
        ),
  
        // Sección PORTFOLIO (ejemplo de un solo ítem, puedes expandir)
        window.React.createElement(
          'section',
          { style: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
          window.React.createElement('h2', { style: { fontSize: '24px', marginBottom: '10px' } }, getField('mainTitlePortfolio')),
          window.React.createElement(
            'div',
            { style: { display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' } },
            // Item 1
            window.React.createElement(
              'div',
              { style: { flex: '1 1 calc(50% - 20px)', minWidth: '250px', border: '1px solid #eee', borderRadius: '5px', padding: '15px' } },
              getImageUrl('portfolioImage1') && window.React.createElement('img', { src: getImageUrl('portfolioImage1'), alt: 'Portfolio 1', style: { maxWidth: '100%', height: 'auto', borderRadius: '3px', marginBottom: '10px' } }),
              window.React.createElement('h3', { style: { fontSize: '18px', marginBottom: '5px' } }, getField('textPortfolioImage1')),
              window.React.createElement('div', { style: { fontSize: '14px', color: '#666' }, dangerouslySetInnerHTML: { __html: getMarkdownHtml('subtextPortfolioImage1') } })
            )
            // Repite para portfolioImage2, 3, 4
          )
        ),
  
        // Sección CONTACTO
        window.React.createElement(
          'section',
          { style: { marginBottom: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } },
          window.React.createElement('h2', { style: { fontSize: '24px', marginBottom: '10px' } }, getField('mainTitleContact')),
          window.React.createElement(
            'div',
            { style: { marginTop: '15px' } },
            getField('buttonContact1Text') && window.React.createElement('a', { href: getField('buttonContact1Url'), style: { display: 'inline-block', padding: '8px 15px', backgroundColor: '#17a2b8', color: '#fff', textDecoration: 'none', borderRadius: '5px', marginRight: '10px' } }, getField('buttonContact1Text')),
            getField('buttonContact2Text') && window.React.createElement('a', { href: getField('buttonContact2Url'), style: { display: 'inline-block', padding: '8px 15px', backgroundColor: '#343a40', color: '#fff', textDecoration: 'none', borderRadius: '5px' } }, getField('buttonContact2Text'))
          )
        ),
  
        // FOOTER
        window.React.createElement(
          'footer',
          { style: { padding: '20px', backgroundColor: '#343a40', color: '#fff', textAlign: 'center', borderRadius: '8px' } },
          window.React.createElement('p', { style: { margin: '0', fontSize: '14px' } }, getField('subtextFooter'))
        )
      );
    }
  }
  
  // --- Registro del Componente de Vista Previa Principal con Netlify CMS ---
  if (window.CMS) {
    window.CMS.registerPreviewTemplate('home', HomePreview);
  } else {
    console.error("Netlify CMS (CMS) no está disponible globalmente para registrar las vistas previas.");
  }
  