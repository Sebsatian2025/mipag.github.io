// No se usan importaciones de React, ReactDOM o marked aquí.
// Netlify CMS proporciona React y ReactDOM globalmente.
// marked debe cargarse como un script global en admin/index.html.

// --- Componente de Vista Previa para Imágenes (ImagePreview) ---
// Muestra una miniatura de la imagen subida
class ImagePreview extends window.React.Component {
    render() {
      const { entry, getAsset, field } = this.props;
      const image = getAsset(entry.getIn(['data', field.get('name')]));
  
      if (!image) {
        return null;
      }
  
      // Usando React.createElement en lugar de JSX
      return window.React.createElement(
        'div',
        { style: { padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' } },
        window.React.createElement(
          'h4',
          { style: { fontSize: '14px', marginBottom: '5px' } },
          'Vista Previa de Imagen:'
        ),
        window.React.createElement('img', {
          src: image.toString(),
          alt: 'Vista Previa',
          style: { maxWidth: '100%', height: 'auto', borderRadius: '3px' }
        })
      );
    }
  }
  
  // --- Componente de Vista Previa para Markdown (MarkdownPreview) ---
  // Renderiza el contenido Markdown como HTML
  class MarkdownPreview extends window.React.Component {
    render() {
      const { entry, field } = this.props;
      const markdownContent = entry.getIn(['data', field.get('name')]);
  
      if (!markdownContent) {
        return null;
      }
  
      // Usando React.createElement en lugar de JSX
      return window.React.createElement(
        'div',
        { style: { padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' } },
        window.React.createElement(
          'h4',
          { style: { fontSize: '14px', marginBottom: '5px' } },
          'Vista Previa de Texto (Markdown):'
        ),
        window.React.createElement('div', {
          dangerouslySetInnerHTML: { __html: window.marked(markdownContent) }
        })
      );
    }
  }
  
  // --- Componente de Vista Previa para Cadenas de Texto (StringPreview) ---
  // Simplemente muestra el texto de la cadena
  class StringPreview extends window.React.Component {
    render() {
      const { entry, field } = this.props;
      const stringContent = entry.getIn(['data', field.get('name')]);
  
      if (!stringContent) {
        return null;
      }
  
      // Usando React.createElement en lugar de JSX
      return window.React.createElement(
        'div',
        { style: { padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' } },
        window.React.createElement(
          'h4',
          { style: { fontSize: '14px', marginBottom: '5px' } },
          'Vista Previa de Texto:'
        ),
        window.React.createElement(
          'p',
          { style: { margin: '0' } },
          stringContent
        )
      );
    }
  }
  
  // --- Registro de los Componentes de Vista Previa con Netlify CMS ---
  if (window.CMS) {
    // Registramos las vistas previas por el nombre del archivo (colección 'pages', archivo 'home').
    // Esto hace que el CMS intente usar estos componentes como vista previa general para el documento 'home'.
    // Nota: Para un control más granular por campo, se usa la propiedad 'preview' en el config.yml,
    // refiriéndose al nombre del componente registrado.
    window.CMS.registerPreviewTemplate('home', ImagePreview); // Esto es un ejemplo, no se usará directamente para cada campo
    window.CMS.registerPreviewTemplate('home', MarkdownPreview); // Esto es un ejemplo
    window.CMS.registerPreviewTemplate('home', StringPreview); // Esto es un ejemplo
  
    // Para que el config.yml pueda referenciarlos por nombre en la propiedad 'preview',
    // los registramos con sus nombres de clase.
    window.CMS.registerPreviewTemplate('ImagePreview', ImagePreview);
    window.CMS.registerPreviewTemplate('MarkdownPreview', MarkdownPreview);
    window.CMS.registerPreviewTemplate('StringPreview', StringPreview);
  
  } else {
    console.error("Netlify CMS (CMS) no está disponible globalmente para registrar las vistas previas.");
  }
  