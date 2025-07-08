// Importa React para crear componentes
import React from 'react';
// Importa ReactDOM para renderizar los componentes en el DOM (aunque Netlify CMS lo maneja internamente)
import ReactDOM from 'react-dom';
// Importa el módulo marked para renderizar Markdown a HTML
import { marked } from 'marked';

// --- Componente de Vista Previa para Imágenes (ImagePreview) ---
// Muestra una miniatura de la imagen subida
class ImagePreview extends React.Component {
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
class MarkdownPreview extends React.Component {
  render() {
    const { entry, field } = this.props;
    // Obtiene el contenido Markdown del campo
    const markdownContent = entry.getIn(['data', field.get('name')]);
    // Si no hay contenido, no muestra nada.
    if (!markdownContent) {
      return null;
    }
    // Renderiza el Markdown a HTML usando 'marked' y lo inserta de forma segura.
    return (
      <div style={{ padding: '10px', border: '1px solid #eee', borderRadius: '5px', marginBottom: '10px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>Vista Previa de Texto (Markdown):</h4>
        <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
      </div>
    );
  }
}

// --- Componente de Vista Previa para Cadenas de Texto (StringPreview) ---
// Simplemente muestra el texto de la cadena
class StringPreview extends React.Component {
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
// Esto le dice a Netlify CMS que use estos componentes para las vistas previas
CMS.registerPreviewTemplate('home', ImagePreview); // 'home' es el nombre del archivo en config.yml
CMS.registerPreviewTemplate('home', MarkdownPreview); // Puedes registrar múltiples vistas previas para el mismo archivo
CMS.registerPreviewTemplate('home', StringPreview); // Pero es mejor usar el nombre del campo para especificidad

// Para usar estas vistas previas de forma más granular por tipo de widget,
// se registran los componentes como widgets personalizados y luego se usan en config.yml
// de la forma `widget: 'image-preview'` o `widget: 'markdown-preview'`.
// Sin embargo, para la funcionalidad de preview en la barra lateral, se usa `preview: [ComponentName]`
// en la definición del campo en config.yml.

// Para que las vistas previas funcionen en la barra lateral, necesitamos registrarlas
// por el nombre del archivo (colección 'pages', archivo 'home').
// Netlify CMS buscará un componente registrado con el nombre de la colección/archivo.
// Sin embargo, para un control más fino, usaremos la propiedad `preview` en los campos del config.yml.

// Para que el CMS sepa qué componente usar como vista previa para un campo específico,
// lo haremos directamente en el config.yml usando la propiedad `preview`.
// Este archivo JS solo define los componentes.
