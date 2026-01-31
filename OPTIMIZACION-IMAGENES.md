# Guía de Optimización de Imágenes - SANA 1937

## 🎯 Objetivo
Reducir el tamaño de las imágenes de **12 MB a menos de 2 MB** para mejorar significativamente el rendimiento web.

## 📊 Imágenes que Necesitan Optimización

### Críticas (Mayor impacto en rendimiento)
| Imagen | Tamaño Actual | Tamaño Objetivo | Prioridad |
|--------|---------------|-----------------|-----------|
| `hero.webp` | 2,578 KB | ~300-400 KB | 🔴 ALTA |
| `smoothie-azul.webp` | 1,670 KB | ~150-200 KB | 🔴 ALTA |
| `smoothie-purple.webp` | 1,661 KB | ~150-200 KB | 🔴 ALTA |
| `smoothie-naranja.webp` | 1,606 KB | ~150-200 KB | 🔴 ALTA |
| `smoothie2.webp` | 1,203 KB | ~100-150 KB | 🟡 MEDIA |
| `smoothie4.webp` | 1,061 KB | ~100-150 KB | 🟡 MEDIA |
| `smoothie3.webp` | 1,006 KB | ~100-150 KB | 🟡 MEDIA |
| `smoothie1.webp` | 983 KB | ~150-200 KB | 🟡 MEDIA |

### Secundarias
| Imagen | Tamaño Actual | Tamaño Objetivo |
|--------|---------------|-----------------|
| `smoothie5.webp` | 124 KB | ~80-100 KB |
| `power-smoothies.webp` | 88 KB | ~60-80 KB |
| `logo_let.png` | 15 KB | ~10 KB |

## 🛠️ Métodos de Optimización

### Opción 1: Herramientas Online (Más Rápido)
1. **Squoosh.app** (Recomendado - Google)
   - URL: https://squoosh.app/
   - Configuración sugerida:
     - Formato: WebP
     - Calidad: 75-80%
     - Resize: Mantener dimensiones originales o reducir a max 1920px de ancho

2. **TinyPNG/TinyJPG**
   - URL: https://tinypng.com/
   - Soporta WebP y PNG
   - Límite: 5MB por archivo, 20 archivos a la vez

### Opción 2: Herramientas de Línea de Comandos (Más Control)

#### Instalar herramientas (macOS)
```bash
# Instalar cwebp para WebP
brew install webp

# Instalar ImageMagick (alternativa)
brew install imagemagick
```

#### Optimizar con cwebp
```bash
cd images/

# Hero (alta calidad por ser principal)
cwebp -q 80 -m 6 hero.webp -o hero-optimized.webp

# Productos (buena calidad)
cwebp -q 75 -m 6 smoothie-azul.webp -o smoothie-azul-optimized.webp
cwebp -q 75 -m 6 smoothie-naranja.webp -o smoothie-naranja-optimized.webp
cwebp -q 75 -m 6 smoothie-purple.webp -o smoothie-purple-optimized.webp

# Galería smoothies (calidad media-alta)
cwebp -q 70 -m 6 smoothie1.webp -o smoothie1-optimized.webp
cwebp -q 70 -m 6 smoothie2.webp -o smoothie2-optimized.webp
cwebp -q 70 -m 6 smoothie3.webp -o smoothie3-optimized.webp
cwebp -q 70 -m 6 smoothie4.webp -o smoothie4-optimized.webp
cwebp -q 70 -m 6 smoothie5.webp -o smoothie5-optimized.webp

# Power smoothies
cwebp -q 75 -m 6 power-smoothies.webp -o power-smoothies-optimized.webp
```

#### Optimizar PNG con ImageMagick
```bash
# Logo
convert logo_let.png -strip -quality 85 logo_let-optimized.png
```

### Opción 3: Optimización por Lotes (Script)
Crea un archivo `optimize-images.sh`:

```bash
#!/bin/bash
# Script de optimización de imágenes para SANA 1937

echo "🚀 Iniciando optimización de imágenes..."

cd images/

# Crear carpeta de respaldo
mkdir -p originals
cp *.webp *.png originals/ 2>/dev/null

# Optimizar WebP
for img in *.webp; do
  if [ -f "$img" ]; then
    echo "Optimizando $img..."
    cwebp -q 75 -m 6 "$img" -o "temp-$img"
    mv "temp-$img" "$img"
  fi
done

# Optimizar PNG
for img in *.png; do
  if [ -f "$img" ]; then
    echo "Optimizando $img..."
    convert "$img" -strip -quality 85 "temp-$img"
    mv "temp-$img" "$img"
  fi
done

echo "✅ Optimización completada!"
echo "📦 Archivos originales guardados en: images/originals/"
```

Ejecutar:
```bash
chmod +x optimize-images.sh
./optimize-images.sh
```

## 📐 Dimensiones Recomendadas

### Imágenes Hero
- **Desktop:** 1920x800px (o mantener relación de aspecto)
- **Mobile:** 768x600px
- **Calidad:** 80%

### Productos (Cards)
- **Ancho máximo:** 800px
- **Alto:** Según relación de aspecto original
- **Calidad:** 75%

### Galería
- **Imágenes grandes:** 1200px ancho máximo
- **Imágenes pequeñas:** 600px ancho máximo
- **Calidad:** 70-75%

## 🎨 Crear Versiones Responsivas (Opcional - Mayor Optimización)

Para servir diferentes tamaños según el dispositivo:

```bash
# Hero - versión mobile
cwebp -q 80 -resize 768 0 hero.webp -o hero-mobile.webp

# Hero - versión tablet
cwebp -q 80 -resize 1024 0 hero.webp -o hero-tablet.webp

# Hero - versión desktop
cwebp -q 80 -resize 1920 0 hero.webp -o hero-desktop.webp
```

Luego actualizar HTML con `<picture>`:
```html
<picture>
  <source media="(max-width: 639px)" srcset="images/hero-mobile.webp">
  <source media="(max-width: 1023px)" srcset="images/hero-tablet.webp">
  <img src="images/hero-desktop.webp" alt="Hero">
</picture>
```

## ✅ Checklist de Optimización

- [ ] Optimizar `hero.webp` (2.5MB → ~300KB)
- [ ] Optimizar `smoothie-azul.webp` (1.6MB → ~150KB)
- [ ] Optimizar `smoothie-naranja.webp` (1.6MB → ~150KB)
- [ ] Optimizar `smoothie-purple.webp` (1.6MB → ~150KB)
- [ ] Optimizar `smoothie1.webp` (983KB → ~150KB)
- [ ] Optimizar `smoothie2.webp` (1.2MB → ~100KB)
- [ ] Optimizar `smoothie3.webp` (1MB → ~100KB)
- [ ] Optimizar `smoothie4.webp` (1MB → ~100KB)
- [ ] Optimizar `smoothie5.webp` (124KB → ~80KB)
- [ ] Optimizar `power-smoothies.webp` (88KB → ~60KB)
- [ ] Optimizar `logo_let.png` (15KB → ~10KB)
- [ ] Verificar calidad visual después de optimización
- [ ] Probar rendimiento con PageSpeed Insights
- [ ] Hacer commit de imágenes optimizadas

## 📈 Resultados Esperados

### Antes
- **Mobile:** 62/100
- **Desktop:** 67/100
- **Tamaño total imágenes:** ~12 MB
- **Cache:** Ninguno

### Después (Estimado)
- **Mobile:** 85-95/100
- **Desktop:** 90-98/100
- **Tamaño total imágenes:** ~1.5-2 MB
- **Cache:** 1 año para imágenes
- **Mejora:** ~80-85% reducción de tamaño

## 🔍 Verificar Optimización

Después de optimizar, verifica:

```bash
# Ver tamaño de archivos
ls -lh images/

# Comparar tamaños antes/después
du -sh images/originals/
du -sh images/
```

## 🌐 Testing

1. **Local:** Abre el sitio y verifica que las imágenes se vean bien
2. **PageSpeed Insights:** https://pagespeed.web.dev/
3. **GTmetrix:** https://gtmetrix.com/
4. **WebPageTest:** https://www.webpagetest.org/

## 💡 Notas Adicionales

- **Backup:** Siempre guarda copias de las imágenes originales
- **Calidad:** Si las imágenes se ven mal, incrementa la calidad en +5%
- **Formato:** WebP ofrece ~30% mejor compresión que JPEG
- **CDN:** Considera usar Cloudflare o similar para delivery más rápido
