document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Cargar el archivo JSON que Netlify CMS generará
        // La ruta es relativa a la raíz del sitio, por eso '/content/home.json'
        const response = await fetch('/content/home.json');
        if (!response.ok) {
            // Si el archivo no existe (ej. primera carga antes de guardar en CMS),
            // o hay un error de red, registra una advertencia.
            console.warn('No se encontró content/home.json o hubo un error de red. Usando valores por defecto o placeholders.');
            // Puedes añadir lógica para cargar un JSON de fallback aquí si lo tuvieras.
            return; // Salir si no hay contenido JSON
        }
        const contentData = await response.json();

        // Función auxiliar para actualizar texto
        function updateTextContent(id, content) {
            const element = document.getElementById(id);
            if (element && content !== undefined) {
                element.textContent = content;
            }
        }

        // Función auxiliar para actualizar HTML (para Markdown)
        function updateInnerHtml(id, content) {
            const element = document.getElementById(id);
            if (element && content !== undefined) {
                element.innerHTML = content;
            }
        }

        // Función auxiliar para actualizar imágenes (src)
        function updateImageSrc(id, src) {
            const element = document.getElementById(id);
            if (element && src !== undefined) {
                element.src = src;
                // Opcional: Actualizar alt text si lo tienes en el CMS
                // element.alt = contentData[`${id}AltText`] || element.alt;
            }
        }

        // Función auxiliar para actualizar botones (texto y href)
        function updateButton(id, text, url) {
            const button = document.getElementById(id);
            if (button) {
                if (text !== undefined) {
                    button.textContent = text;
                }
                if (url !== undefined) {
                    button.href = url;
                }
            }
        }

        // --- Aplicar Contenido a los Elementos HTML ---

        // SECCIÓN HOME
        updateTextContent('main-title-home', contentData.mainTitleHome);
        updateInnerHtml('main-subtitle-home', contentData.mainSubtitleHome); // Usar innerHTML para markdown
        updateButton('button-home', contentData.buttonHomeText, contentData.buttonHomeUrl);
        updateImageSrc('hero-background-image-home', contentData.heroBackgroundImageHome);

        // SECCIÓN ABOUT
        updateTextContent('main-title-about', contentData.mainTitleAbout);
        updateInnerHtml('main-subtitle-about', contentData.mainSubtitleAbout); // Usar innerHTML para markdown
        updateButton('button-about', contentData.buttonAboutText, contentData.buttonAboutUrl);

        // SECCIÓN SERVICES
        updateTextContent('main-title-services', contentData.mainTitleServices);
        updateImageSrc('hero-background-image-services', contentData.heroBackgroundImageServices);
        updateButton('button-services', contentData.buttonServicesText, contentData.buttonServicesUrl);

        // SECCIÓN PORTFOLIO
        updateTextContent('main-title-portfolio', contentData.mainTitlePortfolio);
        updateTextContent('text-portfolio-image-1', contentData.textPortfolioImage1);
        updateInnerHtml('subtext-portfolio-image-1', contentData.subtextPortfolioImage1);
        updateImageSrc('portfolio-image-1', contentData.portfolioImage1);

        updateTextContent('text-portfolio-image-2', contentData.textPortfolioImage2);
        updateInnerHtml('subtext-portfolio-image-2', contentData.subtextPortfolioImage2);
        updateImageSrc('portfolio-image-2', contentData.portfolioImage2);

        updateTextContent('text-portfolio-image-3', contentData.textPortfolioImage3);
        updateInnerHtml('subtext-portfolio-image-3', contentData.subtextPortfolioImage3);
        updateImageSrc('portfolio-image-3', contentData.portfolioImage3);

        updateTextContent('text-portfolio-image-4', contentData.textPortfolioImage4);
        updateInnerHtml('subtext-portfolio-image-4', contentData.subtextPortfolioImage4);
        updateImageSrc('portfolio-image-4', contentData.portfolioImage4);

        // SECCIÓN CONTACTO
        updateTextContent('main-title-contact', contentData.mainTitleContact);
        updateButton('button-contact-1', contentData.buttonContact1Text, contentData.buttonContact1Url);
        updateButton('button-contact-2', contentData.buttonContact2Text, contentData.buttonContact2Url);

        // FOOTER
        updateTextContent('subtext-footer', contentData.subtextFooter);

        console.log('Contenido cargado desde JSON y aplicado al HTML.');

    } catch (error) {
        console.error('Error al cargar o aplicar el contenido JSON:', error);
    }
});
