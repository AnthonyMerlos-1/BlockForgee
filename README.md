# BLOCKFORGE — Railway, móvil y PC

Esta entrega está organizada para ejecutarse desde un servicio Railway con Node.js. No contiene un modo de cuentas locales, lanzadores locales ni carpetas de copias originales.

## Publicar en Railway

1. Sube el contenido de la carpeta `Blockforge` a un repositorio GitHub. `package.json`, `Dockerfile` y `railway.json` deben estar en la raíz del repositorio.
2. Crea un proyecto Railway y despliega ese repositorio. Railway construirá el Dockerfile incluido y ejecutará `npm start`.
3. Añade un volumen al mismo servicio con ruta **`/data`**. El servidor detecta `RAILWAY_VOLUME_MOUNT_PATH`; también puedes definir `DATA_DIR=/data`. El volumen conserva las cuentas, dinero e inventario entre despliegues.
4. Genera el dominio público del servicio en Networking y abre su URL **HTTPS** en móvil o PC.
5. Mantén una sola instancia del servicio. Puedes definir `MAX_PLAYERS=12`. Se admiten 2–12 jugadores por mundo. El selector permite rondas de 5, 10, 16 o 30 minutos.

El servidor utiliza el `PORT` de Railway, escucha en `0.0.0.0`, incluye `/health` y utiliza WebSocket seguro en el mismo dominio. No necesita paquetes npm externos. No abras los HTML con doble clic ni Go Live: el registro y el juego necesitan el servidor desplegado.

La configuración está preparada; el ZIP no contiene un despliegue ya publicado en tu cuenta Railway.

Referencias oficiales: [host y puerto](https://docs.railway.com/networking/troubleshooting/application-failed-to-respond) y [volúmenes](https://docs.railway.com/volumes).

## Recorrido del usuario

1. En `index.html`, pulsa **Registrarse** y crea tu nombre único; luego podrás usar **Iniciar sesión** con esa misma cuenta.
2. Pulsa **Multijugador**. Se abre `modos.html`.
3. Elige modo y mapa. Se muestra el nombre de tu cuenta; la selección se guarda en tu perfil.
4. Pulsa **Elegir mapa y jugar**. Se abre `juego.html` y muestra la preparación: elige tu equipo y pulsa Confirmar equipo y entrar.
5. Los jugadores que elijan el mismo mapa, modo y duración comparten mundo. No se generan bots ni necesitas crear salas.

La cuenta, dinero, equipo, compras, bajas, caídas y preferencias de mapa, modo, equipo y rendimiento se guardan en el servidor. El reloj, posiciones en combate y sesiones de conexión viven en la instancia activa; reiniciar el servicio conserva los perfiles y exige iniciar sesión otra vez.

Los nombres son únicos sin distinguir mayúsculas. El registro comprueba duplicados y confirmación de contraseña. La contraseña es opcional; si la utilizas, debe tener al menos ocho caracteres y se exige después para entrar. Una cuenta sin contraseña se puede abrir conociendo su nombre. Las contraseñas se almacenan mediante scrypt con sal individual y la sesión utiliza cookie HttpOnly.

## Jugadores y clasificación

Sobre los rivales y compañeros dentro de la pantalla aparecen su nombre, vida numérica y barra de vida con el color de su equipo. La clasificación incluye a todos los jugadores conectados, con nombre, vida, bajas, caídas y puntos, actualizados desde el servidor. En PC se abre con Tab; en móvil, con el botón Tabla.

Cuando estás solo, se indica que se esperan jugadores reales y puedes explorar el mapa. Para comprobar el multijugador usa cuentas diferentes en dos dispositivos. En Choque de escuadras deben elegir colores distintos para ser rivales; en Todos contra todos todos compiten individualmente.

Se incluyen siete mapas: Puerto Cobalto, Ruinas de Brasa, Bastión Dunas, Bosque Esmeralda, Estación Boreal, Distrito Neon y Campo Frontera. Los modos activos son Choque de escuadras y Todos contra todos.

## Dinero, tienda y equipamiento

- Cada eliminación confirmada de otro jugador concede **exactamente 10 monedas**. No se concede dinero por morir ni hay multiplicador de racha.
- Empiezas con 1,000 monedas, Steve, M4 y dos granadas F-1.
- El mismo saldo y perfil se utiliza en `tienda.html` y en la tienda del HUD de `juego.html`.
- Las compras y el equipamiento se guardan en el servidor. Al entrar al juego se carga tu personaje, ropa, skin, armas, granadas, habilidades y pociones equipadas.
- Armas y equipo son permanentes. Las granadas se compran por unidad, con precio mínimo de 100 monedas y máximo de 10 por tipo. Se descuenta una al lanzarla.
- Cambia el personaje antes de entrar. Puedes cambiar el resto del equipo en el HUD mientras juegas. Las pociones compatibles se activan una vez por ronda.
- La tienda utiliza los precios y el saldo del servidor y rechaza compras sin fondos, equipamiento no adquirido y recompensas duplicadas.

El mundo continúa mientras abres la tienda o el menú; el personaje puede recibir daño.

## Muerte, ragdoll y reaparición

Al morir, el personaje activa un ragdoll articulado con gravedad, impulso y colisiones con suelo y obstáculos. Aparecen salpicaduras rojas estilizadas y una pequeña mancha en el suelo, acordes con el estilo de bloques. El cuerpo y la mancha desaparecen a los **5 segundos** y el servidor hace reaparecer al jugador con vida y munición restauradas. El ciclo del servidor introduce una tolerancia aproximada de 0.1 segundos, además de la latencia de red.

## Controles y rendimiento

| Acción | PC | Móvil |
| --- | --- | --- |
| Mover / mirar | WASD y ratón | Joystick y arrastrar sobre el escenario |
| Disparar / apuntar | Clic izquierdo / derecho | FUEGO / Mira |
| Recargar / saltar | R / Espacio | R / Salto |
| Correr | Shift | Mantener Correr / joystick al máximo |
| Granada / habilidad / poción | G / Q / E | G / Q / E |
| Cambiar arma | 1–9 o rueda | Arma |
| Tienda / clasificación | B / Tab | Tienda / Tabla |
| Menú | Esc | Menú |

El preset móvil limita la resolución, desactiva sombras, reduce partículas y tiene un objetivo de 30 FPS. Equilibrado y Alto tienen un objetivo de 60 FPS; Alto activa sombras. La geometría estática se agrupa por material. Los FPS dependen del dispositivo y no están garantizados ni medidos en teléfonos físicos en esta entrega.

El audio se activa tras interactuar con la pantalla. Hay efectos sintetizados de disparo, recarga, explosión, interfaz y ambiente distinto por mapa. Puede desactivarse desde el menú.

## Archivos incluidos

| Ruta | Uso |
| --- | --- |
| `public/index.html` | Menú y acceso a las demás páginas |
| `public/cuenta.html`, `public/js/account.js` | Registro e inicio de sesión |
| `public/modos.html` | Selección de mapa y modo, con vista 3D |
| `public/tienda.html` | Tienda 3D con compras y equipamiento del servidor |
| `public/juego.html`, `public/js/game.js` | Juego, HUD, nombres, vida, clasificación, ragdoll y audio |
| `public/js/api.js` | Solicitudes y errores de conexión legibles |
| `public/js/three.min.js` | Motor 3D incluido; conserva licencia y créditos |
| `public/style.css`, `public/favicon.svg` | Estilos e icono |
| `server/index.js`, `server/websocket.js` | Servidor, transporte y lógica de cuentas/combate |
| `server/*.json` | Catálogo, estadísticas y colisiones de mapas |
| `tests/` | Pruebas automáticas del servidor y de la interfaz |
| `Dockerfile`, `railway.json`, `package.json` | Construcción y despliegue |

`npm test` verifica registro separado, contraseña, nombres duplicados, preferencias, compras, dos jugadores, clasificación, nombres/vida, 10 monedas por eliminación, recompensas sin duplicación, ragdoll de cinco segundos, reaparición y persistencia tras reiniciar. Las pruebas de interfaz utilizan simulaciones de DOM y renderizador; no sustituyen inspección visual con GPU ni pruebas de carga o latencia sobre Railway.

El servidor valida vida, daño, alcance, dirección, línea de visión, cadencia, munición y límites básicos de movimiento. La trayectoria visual de granadas se calcula en el cliente y el servidor valida su consumo, tiempo y alcance. Es una implementación de una instancia; no constituye un sistema antitrampas completo.

## Sonidos y final de partida

Menús, navegación, ajustes, selección de mapas, compras, disparos, recargas, granadas, explosiones, bajas, reaparición, salto, habilidades y resultados incluyen efectos. El ambiente del juego cambia según el mapa. Los sonidos se sintetizan sin descargar archivos externos: se activan después de la primera interacción por las restricciones del navegador. El control flotante permite silenciar y ajustar el volumen.

Las muertes no terminan la partida: se reaparece a los cinco segundos durante todo el tiempo seleccionado. Al finalizar, el servidor detiene el combate y envía los resultados: victoria, derrota o empate; líderes por bajas; bajas y muertes de cada jugador; monedas ganadas y saldo. Las monedas ya fueron guardadas al confirmar cada baja, sin bonos duplicados al finalizar.

«Volver al inicio» regresa al menú. «Revancha» cuenta cinco segundos y vuelve al mismo mapa y modo. Cada jugador confirma su revancha; quienes todavía revisan resultados permanecen fuera del combate. El primero que vuelve abre la siguiente ronda y los demás se incorporan a su reloj compartido.

## Corrección táctil

Menús desplazables en móvil, fondos decorativos sin captura de toques, activación táctil de botones sin doble clic y detección de pantallas táctiles en dispositivos híbridos. Joystick, mirada y disparo usan dedos independientes; la cancelación o pérdida de captura libera los controles. Los botones de acciones responden al pulsarlos. Se verificó con pruebas automatizadas de eventos; falta comprobarlo en un teléfono físico.

El menú principal incluye botones ▲, ▼ y OK: las flechas resaltan la opción y OK la abre. También se puede tocar directamente cada opción. Este control no depende de que cargue el fondo 3D y admite teclado (arriba/abajo).

## Unirse a un amigo

En Mapas aparece «Juega con tus amigos», con los mundos y nombres de jugadores conectados al mismo servicio Railway. Busca su nombre y pulsa «Unirse con…». Se prepara el mismo mapa, modo y duración; puedes elegir tu equipo, sin crear salas. La lista se actualiza cada cinco segundos. Ambos deben usar cuentas distintas y el mismo dominio Railway. Si la partida está llena o tu amigo está en resultados, espera una plaza o su revancha. Las verificaciones se repiten al abrir la conexión para evitar entrar a otro mundo si se desconecta.

## Acceso desde celular

Al abrir el dominio o index.html desde Android, iPhone y otros navegadores móviles, se redirige a cuenta.html sin mostrar el menú principal. Después de registrarse o iniciar sesión se abre modos.html automáticamente. Si ya hay una sesión activa, cuenta.html continúa directamente a los mapas. En PC se conserva el menú. El navegador se identifica mediante sus señales de dispositivo; si usa un agente de usuario que oculta completamente el móvil, puede identificarse como PC.

La interfaz táctil del juego sigue el área visible del navegador (VisualViewport), las barras del navegador, la rotación y los márgenes seguros. Joystick abajo a la izquierda y acciones abajo a la derecha; en horizontal se compactan. Mantén FUEGO y arrastra ese dedo para mirar mientras disparas, usando el otro dedo para moverte. Los límites de altura se adaptan por pantalla, sin depender de la marca del teléfono. No se verificó físicamente en Redmi o Samsung.

Ajustes en el HUD: sensibilidad al mirar y sensibilidad al arrastrar FUEGO, guardadas en el perfil. El minimapa permanece visible en PC y móvil, incluyendo calidad baja, con escenario, posiciones y flecha del jugador. El servidor resuelve impactos desde cada disparo contra la caja corporal y cobertura, sin depender de que el cliente notifique daño. Los compañeros del mismo equipo no reciben daño y hay dos segundos de protección al reaparecer.

Siempre se muestra la elección de equipo antes del combate, incluso si un enlace antiguo contiene enter=1. Unirse a un amigo conserva su partida pero no impone su equipo. Se entra solo al pulsar «Confirmar equipo y entrar».
