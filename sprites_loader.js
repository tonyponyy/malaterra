// funcion crearImagen
let totalImagenes = 0;
let imagenesCargadas = 0;
let can_start_game = false;

function crearImagen(src) {
  totalImagenes++;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    imagenesCargadas++;
    if (imagenesCargadas === totalImagenes) {
        can_start_game = true
    }
  };
  img.onerror = () => {
    console.error('❌ Error al cargar imagen: ' + src);
  };
  return img;
}
//

const estatua = crearImagen('img/decoracion/estatua.png');
//mazmorra
const suelo = crearImagen('img/ambientes/mazmorra/suelo.png');
const suelo_var = crearImagen('img/ambientes/mazmorra/suelo_var.png');
const pared_unidad = crearImagen('img/ambientes/mazmorra/pared_unidad.png');
const esquina = crearImagen('img/ambientes/mazmorra/esquina.png');
//selva
const suelo2 = crearImagen('img/ambientes/selva/suelo2.png');
const suelo_var2 = crearImagen('img/ambientes/selva/suelo_var2.png');
const pared_unidad2 = crearImagen('img/ambientes/selva/pared_unidad2.png');
const esquina2 = crearImagen('img/ambientes/selva/esquina2.png');
//castillo
const suelo3 = crearImagen('img/ambientes/castillo/suelo3.png');
const suelo_var3 = crearImagen('img/ambientes/castillo/suelo_var3.png');
const pared_unidad3 = crearImagen('img/ambientes/castillo/pared_unidad3.png');
const esquina3 = crearImagen('img/ambientes/castillo/esquina3.png');
//alien
const suelo4 = crearImagen('img/ambientes/alien/sueloalien.png');
const suelo_var4 = crearImagen('img/ambientes/alien/sueloalien_var.png');
const pared_unidad4 = crearImagen('img/ambientes/alien/pared_unidad_alien.png');
const esquina4 = crearImagen('img/ambientes/alien/esquina_alien.png');
const puerta_alien = crearImagen('img/ambientes/alien/puerta_alien.png');
//desierto
const suelo5 = crearImagen('img/ambientes/desierto/suelodesierto.png');
const suelo_var5 = crearImagen('img/ambientes/desierto/suelodesierto_var.png');
const pared_unidad5 = crearImagen('img/ambientes/desierto/pared_unidad_desierto.png');
const esquina5 = crearImagen('img/ambientes/desierto/esquina_desierto.png');
//hielo
const suelo6 = crearImagen('img/ambientes/hielo/suelohielo.png');
const suelo_var6 = crearImagen('img/ambientes/hielo/suelohielo_var.png');
const pared_unidad6 = crearImagen('img/ambientes/hielo/pared_unidad_hielo.png');
const esquina6 = crearImagen('img/ambientes/hielo/esquina_hielo.png');
const puerta_hielo = crearImagen('img/ambientes/hielo/puerta_hielo.png');
//ruinas
const suelo7 = crearImagen('img/ambientes/ruinas/sueloruinas.png');
const suelo_var7 = crearImagen('img/ambientes/ruinas/sueloruinas_var.png');
const pared_unidad7 = crearImagen('img/ambientes/ruinas/pared_unidad_ruinas.png');
const esquina7 = crearImagen('img/ambientes/ruinas/esquina_ruinas.png');
//tienda
const suelo8 = crearImagen('img/ambientes/tienda/suelotienda.png');
const suelo_var8 = crearImagen('img/ambientes/tienda/suelotienda_var.png');
const pared_unidad8 = crearImagen('img/ambientes/tienda/pared_unidad_tienda.png');
const esquina8 = crearImagen('img/ambientes/tienda/esquina_tienda.png');
//mas_del_angel
const suelo9 = crearImagen('img/ambientes/mas_del_angel/suelo3.png');
const suelo_var9 = crearImagen('img/ambientes/mas_del_angel/suelo_var3.png');
const pared_unidad9 = crearImagen('img/ambientes/mas_del_angel/pared_unidad3.png');
const esquina9 = crearImagen('img/ambientes/mas_del_angel/esquina3.png');
const puerta_angel = crearImagen('img/ambientes/mas_del_angel/puerta_castillo.png');

const puerta = crearImagen('img/decoracion/puerta.png');
const puerta_castillo = crearImagen('img/ambientes/castillo/puerta_castillo.png');
const puerta_pinchos = crearImagen('img/decoracion/puerta_pinchos.png');

const player_img = crearImagen('img/jugador/player.png');

const skull_img = crearImagen('img/fx/skull_hp.png');
const font_img = crearImagen('img/gui/font.png');

const transition_img = crearImagen('img/gui/trans.png');

// proyectiles
const flecha = crearImagen('img/armas/flecha.png');
const fire_bullet = crearImagen('img/armas/fire.png');
const laser_bullet = crearImagen('img/armas/laser.png');

// armas
const rifle_viejo = crearImagen('img/armas/rifle_viejo.png');
const rifle_laser = crearImagen('img/armas/rifle_laser.png');
const lanzallamas = crearImagen('img/armas/lanzallamas.png');
const triaura = crearImagen('img/armas/triaura.png');

// enemigos
const slime_img = crearImagen('img/enemigos/slime.png');
const esqueleto_img = crearImagen('img/enemigos/esqueleto.png');
const sapo64_img = crearImagen('img/enemigos/sapo64.png');
const goliat_img = crearImagen('img/enemigos/goliat.png');

// part
const esqueleto_part = crearImagen('img/enemigos/esqueleto_part.png');
const slime_part = crearImagen('img/enemigos/slime_part.png');
const octo_part = crearImagen('img/enemigos/octo_part.png');

// splat
const splat_slime = crearImagen('img/enemigos/splat_slime.png');
const splat_sangre = crearImagen('img/fx/splat_sangre.png');
const splat_esqueleto = crearImagen('img/enemigos/esqueleto_splat.png');

// jarron part
const jarron_part = crearImagen('img/objetos/jarron_part.png');
const jarron_part2 = crearImagen('img/objetos/jarron_part2.png');
const jarron_splat = crearImagen('img/objetos/jarron_splat.png');
const jarron_splat2 = crearImagen('img/objetos/jarron_splat2.png');
jarron_parts = [jarron_part, jarron_part2];
jarron_splats = [jarron_splat, jarron_splat2];

//bidon parts
const bidon_part = crearImagen('img/objetos/bidon_part.png');
const bidon_part2 = crearImagen('img/objetos/bidon_part2.png');
const bidon_splat = crearImagen('img/objetos/bidon_splat.png');
const bidon_splat2 = crearImagen('img/objetos/bidon_splat2.png');
bidon_parts = [bidon_part, bidon_part2];
bidon_splats = [bidon_splat, bidon_splat2];

// trajes
const armadura = crearImagen('img/jugador/armadura.png');
const poncho = crearImagen('img/jugador/poncho.png');
const traje_exterminador = crearImagen('img/jugador/traje_exterminador.png');
const traje_ninja = crearImagen('img/jugador/traje_ninja.png');

// corazones (vida del jugador)
const corazon_img = crearImagen('img/jugador/corazon.png');
const corazon_medio_img = crearImagen('img/jugador/corazon_medio.png');
const corazon_vacio_img = crearImagen('img/jugador/corazon_vacio.png');

// moneda (dinero del jugador)
const moneda_img = crearImagen('img/gui/moneda.png');

// cascos
const casco1 = crearImagen('img/jugador/casco1.png');
const cascohueso = crearImagen('img/jugador/cascohueso.png');
const mascara_guerrero = crearImagen('img/jugador/mascara_guerrero.png');
const mascara_ninja = crearImagen('img/jugador/mascara_ninja.png');

// casillas
const casilla_completada = crearImagen('img/gui/casilla_completada.png');
const casilla_completada_doble = crearImagen('img/gui/casilla_completada_doble.png');
const casilla_no_completada = crearImagen('img/gui/casilla_no_completada.png');
casilla_no_completada_doble = crearImagen('img/gui/casilla_no_completada_doble.png');
marca_player = crearImagen('img/gui/marca_player.png');

// ventanales
const ventanal1 = crearImagen('img/decoracion/ventanal1.png');
const ventanal2 = crearImagen('img/decoracion/ventanal2.png');
const ventana_mazmorra = crearImagen('img/ambientes/mazmorra/ventana_mazmorra.png');
const luz_mazmorra_img = crearImagen('img/ambientes/mazmorra/luz_mazmorra.png');
const ventanal_luz = crearImagen('img/decoracion/ventanal_luz.png');

// tienda
const tienda = crearImagen('img/ambientes/tienda/tienda.png');
const menu_tienda = crearImagen('img/ambientes/tienda/menu_tienda.png');
const cursor = crearImagen('img/ambientes/tienda/cursor.png');
const cursor_horizontal = crearImagen('img/ambientes/tienda/cursor_horizontal.png');
const vending = crearImagen('img/ambientes/tienda/vending.png');
const alfombra = crearImagen('img/ambientes/tienda/alfombra.png');
const alfombra_tienda = crearImagen('img/ambientes/tienda/alfombra_tienda.png');
const alfombra_tienda2 = crearImagen('img/ambientes/tienda/alfombra_tienda2.png');
const sold_img = crearImagen('img/ambientes/tienda/sold.png');

// objetos
const bidon = crearImagen('img/objetos/bidon.png');
const jarron = crearImagen('img/objetos/jarron.png');
const pinchos = crearImagen('img/objetos/pinchos.png');
const bolsa_dinero_img = crearImagen('img/objetos/bolsa_dinero.png');
const piedra = crearImagen('img/objetos/piedra.png');
const piedra2 = crearImagen('img/objetos/piedra2.png');
const piedra3 = crearImagen('img/objetos/piedra3.png');
const piedra4 = crearImagen('img/objetos/piedra4.png');
const piedra5 = crearImagen('img/objetos/piedra5.png');
const piedra6 = crearImagen('img/objetos/piedra6.png');
const palmera1 = crearImagen('img/ambientes/selva/palmera1.png');
const palmera2 = crearImagen('img/ambientes/selva/palmera2.png');
const palmera3 = crearImagen('img/ambientes/selva/palmera3.png');
const palmerita = crearImagen('img/ambientes/selva/palmerita.png');
const tocon = crearImagen('img/objetos/tocon.png');

// gui
const panel_iz = crearImagen('img/gui/panel_iz.png');
const dialogo = crearImagen('img/gui/dialogo.png');

// inventario pausa
const atras_items = crearImagen('img/gui/inventario/atras_items.png');
const barra_items = crearImagen('img/gui/inventario/barra_items.png');
const equipado = crearImagen('img/gui/inventario/equipado.png');
const ventana_items = crearImagen('img/gui/inventario/ventanaitems.png');
const ventana_stats = crearImagen('img/gui/inventario/ventanastats.png');
const ico_traje = crearImagen('img/gui/inventario/ico_traje.png');
const ico_arma = crearImagen('img/gui/inventario/ico_arma.png');
const ico_casco = crearImagen('img/gui/inventario/ico_casco.png');

// fx
const explosion = crearImagen('img/fx/explosion.png');
const splat_explosion = crearImagen('img/fx/splat_explosion.png');
const critical_img = crearImagen('img/fx/crt.png');

// spikers
const spikeImg = crearImagen('img/enemigos/spiker.png');
