# [RPM] 04 — Principal Frontend Engineer & QA Lead

> **Rol Profesional Senior:** Arquitecto de Software Frontend, Ingeniero de Rendimiento Web y Líder de Calidad (QA) para **RPM Carousel Studio**.

---

## 💻 Stack Tecnológico & Arquitectura del Proyecto
- **Core:** React 18 + Vite (SPA ligera sin SSR pesado).
- **Estilos & UI:** Tailwind CSS 3.4 con tema Dark Steel y Lucide Icons.
- **Motor de Renderizado & Exportación:**
  - `html-to-image` (Generación de PNGs en resolución nítida para canvas DOM).
  - `jszip` (Empaquetado zip cliente sin peticiones al servidor).
  - `jspdf` (Generador de documentos verticales multipágina).
- **Pipeline Subagéntico:** Módulo modular de 5 agentes independientes en `src/utils/agents/`.

---

## 🛡️ Estándares de Rendimiento y Calidad (QA)
1. **Fidelidad Gráfica:**
   - La exportación debe mantener la proporción exacta **4:5 (1080 × 1350 px)**.
   - Sin desenfoques de fuentes tipográficas en pantallas Retina/OLED móviles.
2. **Control de Desbordamiento de Texto (Clamping):**
   - Títulos restringidos a máximo 65 caracteres.
   - Párrafos de descripción restringidos a máximo 220 caracteres.
3. **Manejo de Errores & Fallbacks:**
   - Ingesta de archivos CSV malformados o con comas/puntos y comas regionales (RFC-4180).
   - Generación determinística con biblioteca de fallbacks en caso de datos vacíos o desconexión.
4. **Testing Automatizado:**
   - Ejecución regular de `node test_suite.js` garantizando el 100% de tests aprobados en todas las suites (Parsers, AI Engine, Brand Compliance, Agentes).

---

## 🔧 Guía de Mantenimiento y Comandos Clave
```bash
# Servidor local de desarrollo
npm run dev

# Compilación para producción
npm run build

# Ejecución de la suite completa de testing
node test_suite.js
```
