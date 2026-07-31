# La Mar de Salaos · V10 — Fase 1 (PWA instalable)

## Qué hay en esta entrega

- `LaMarDeSalaos_v10.html` — la app (V9 + 3 añadidos, nada de cálculo tocado)
- `manifest.json` — configuración de instalación
- `sw.js` — Service Worker (carga instantánea)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png`, `favicon-32.png` — iconos

**Los 5 archivos deben ir juntos, en la misma carpeta.** Si separas el HTML de los demás, la app sigue funcionando pero sin icono ni instalación.

## Qué ha cambiado respecto a la V9

Exactamente 3 cosas, verificadas con diff línea a línea contra la V9:

1. Etiquetas `<meta>`/`<link>` en la cabecera para que el navegador sepa que es instalable (manifest, iconos, color de marca).
2. Al abrir la app por primera vez en un dispositivo nuevo, detecta si es un móvil y arranca directamente en **Vista Móvil** (antes arrancaba siempre en Vista Escritorio y había que cambiarlo a mano en Configuración). Si ya usaste la app en ese aparato, tu elección anterior se respeta siempre.
3. Registro del Service Worker (solo cachea el "cascarón" de la app para que cargue al instante; **no toca tus datos**, que siguen guardándose igual que en la V9).

Ni un carácter de la lógica de negocio (ingresos, hermanos, cálculos) ha cambiado.

## Por qué necesita estar en un servidor (no vale con abrir el archivo directamente)

Los navegadores solo permiten instalar apps (Service Worker) cuando se sirven por `https://` — es una norma de seguridad de todos los navegadores, no algo de esta app. Abrir el `.html` con doble clic (`file://`) seguirá funcionando exactamente igual que la V9, pero sin el icono ni el modo offline.

Como pagas Office 365, la opción más simple es **OneDrive**:

### Instalación vía OneDrive (ruta más simple)

1. Sube los 5 archivos a la misma carpeta donde ya tienes tu app (`OneDrive/LaMar/app/`).
2. En el iPhone, abre **Safari** (no la app de OneDrive).
3. Ve a **onedrive.live.com** → entra con tu cuenta.
4. Navega a la carpeta donde subiste los archivos.
5. Toca el archivo `LaMarDeSalaos_v10.html` — se abrirá en Safari.
6. Botón compartir (el cuadrado con la flecha hacia arriba) → **"Añadir a pantalla de inicio"**.
7. Dale un nombre (o déjalo como "La Mar") y toca "Añadir".
8. Verás el icono en tu pantalla de inicio. Tócalo: se abre a pantalla completa, sin barra de Safari, directamente en modo móvil.

> Nota: OneDrive personal a veces sirve los archivos con cabeceras que no dejan instalar el Service Worker correctamente. Si al probar ves que el icono se instala pero la carga no es instantánea la segunda vez, no pasa nada — la app sigue funcionando igual, solo no aprovecha la caché. Si quieres la instalación 100% robusta, la alternativa gratuita es GitHub Pages (te lo preparo si quieres, es otro paso más de configuración inicial pero después es automático).

### Cómo comprobar que se instaló bien

- El icono en tu pantalla de inicio debe verse con el logo de La Mar de Salaos, no un icono genérico de Safari.
- Al abrirlo, no debe aparecer la barra de direcciones de Safari arriba.
- Debe abrir directamente en **Vista Móvil** (nav inferior con iconos), sin que tengas que tocar nada.

## Qué NO ha cambiado (para que compruebes que sigue igual)

- Todos tus datos, cálculos, sumatorios de la V9 (ya validados contra tu BBDD y tu Excel).
- La app de escritorio sigue funcionando exactamente igual si la abres en el Mac.
- Vincular JSON, autoguardado, backup — todo intacto.
