// No se usan importaciones de React, ReactDOM o marked aquí.
// Netlify CMS proporciona React y ReactDOM globalmente.
// marked debe cargarse como un script global en admin/index.html si no lo está ya.

// --- Componente de Vista Previa para Imágenes (ImagePreview) ---
// Muestra una miniatura de la imagen subida
class ImagePreview extends window.React.Component { // Usamos window.React
    render() {
      const { entry, getAsset, field } = this.props;
      // Obtiene la URL de la imagen. getAsset es una función proporcionada por Netlify CMS.
      const image = getAsset(entry.getIn(['data', field.get('name')]));
      // Si no hay imagen o la URL no es válida, no muestra nada.
      if (!image) {
        return null;
      }
      // Renderiza la imagen con un estilo básico para la vista previa.
      return (
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>Vista Previa de Imagen:</h4>
          <img
            src={image.toString()} // Convierte el objeto Asset a string URL
            alt="Vista Previa"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '3px' }}
          />
        </div>
      );
    }
  }
  
  // --- Componente de Vista Previa para Markdown (MarkdownPreview) ---
  // Renderiza el contenido Markdown como HTML
  class MarkdownPreview extends window.React.Component { // Usamos window.React
    render() {
      const { entry, field } = this.props;
      // Obtiene el contenido Markdown del campo
      const markdownContent = entry.getIn(['data', field.get('name')]);
      // Si no hay contenido, no muestra nada.
      if (!markdownContent) {
        return null;
      }
      // Renderiza el Markdown a HTML usando 'marked' (asumiendo que está globalmente disponible)
      // y lo inserta de forma segura.
      return (
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>Vista Previa de Texto (Markdown):</h4>
          <div dangerouslySetInnerHTML={{ __html: window.marked(markdownContent) }} /> {/* Usamos window.marked */}
        </div>
      );
    }
  }
  
  // --- Componente de Vista Previa para Cadenas de Texto (StringPreview) ---
  // Simplemente muestra el texto de la cadena
  class StringPreview extends window.React.Component { // Usamos window.React
    render() {
      const { entry, field } = this.props;
      // Obtiene el contenido de la cadena de texto
      const stringContent = entry.getIn(['data', field.get('name')]);
      // Si no hay contenido, no muestra nada.
      if (!stringContent) {
        return null;
      }
      // Renderiza el texto.
      return (
        <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>Vista Previa de Texto:</h4>
          <p style={{ margin: '0' }}>{stringContent}</p>
        </div>
      );
    }
  }
  
  // --- Registro de los Componentes de Vista Previa con Netlify CMS ---
  // Asegúrate de que CMS esté globalmente disponible antes de llamar a registerPreviewTemplate.
  // Esto lo maneja el setTimeout en admin/index.html.
  if (window.CMS) {
    window.CMS.registerPreviewTemplate('home', ImagePreview);
    window.CMS.registerPreviewTemplate('home', MarkdownPreview);
    window.CMS.registerPreviewTemplate('home', StringPreview);
  
    // También puedes registrar los componentes individualmente para usarlos en el config.yml
    // con la propiedad `widget: 'custom-image-preview'` por ejemplo.
    // Pero para la vista previa de la barra lateral, el registro por nombre de archivo es suficiente.
    // Sin embargo, para que el config.yml pueda referenciarlos por nombre, los registramos así:
    window.CMS.registerPreviewStyle('/admin/custom-previews.css'); // Si tuvieras CSS personalizado para las previas
    window.CMS.registerPreviewTemplate('ImagePreview', ImagePreview);
    window.CMS.registerPreviewTemplate('MarkdownPreview', MarkdownPreview);
    window.CMS.registerPreviewTemplate('StringPreview', StringPreview);
  } else {
    console.error("Netlify CMS (CMS) no está disponible globalmente para registrar las vistas previas.");
  }
  