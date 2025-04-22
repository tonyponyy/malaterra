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

const estatua = crearImagen('img/estatua.png');
//mazmorra
const suelo = crearImagen('img/suelo.png');
const suelo_var = crearImagen('img/suelo_var.png');
const pared_unidad = crearImagen('img/pared_unidad.png');
const esquina = crearImagen('img/esquina.png');
//selva
const suelo2 = crearImagen('img/suelo2.png');
const suelo_var2 = crearImagen('img/suelo_var2.png');
const pared_unidad2 = crearImagen('img/pared_unidad2.png');
const esquina2 = crearImagen('img/esquina2.png');
//castillo
const suelo3 = crearImagen('img/suelo3.png');
const suelo_var3 = crearImagen('img/suelo_var3.png');
const pared_unidad3 = crearImagen('img/pared_unidad3.png');
const esquina3 = crearImagen('img/esquina3.png');
//alien
const suelo4 = crearImagen('img/sueloalien.png');
const suelo_var4 = crearImagen('img/sueloalien_var.png');
const pared_unidad4 = crearImagen('img/pared_unidad_alien.png');
const esquina4 = crearImagen('img/esquina_alien.png');
const puerta_alien = crearImagen('img/puerta_alien.png');
//desierto
const suelo5 = crearImagen('img/suelodesierto.png');
const suelo_var5 = crearImagen('img/suelodesierto_var.png');
const pared_unidad5 = crearImagen('img/pared_unidad_desierto.png');
const esquina5 = crearImagen('img/esquina_desierto.png');
//hielo
const suelo6 = crearImagen('img/suelohielo.png');
const suelo_var6 = crearImagen('img/suelohielo_var.png');
const pared_unidad6 = crearImagen('img/pared_unidad_hielo.png');
const esquina6 = crearImagen('img/esquina_hielo.png');
const puerta_hielo = crearImagen('img/puerta_hielo.png');
//ruinas
const suelo7 = crearImagen('img/sueloruinas.png');
const suelo_var7 = crearImagen('img/sueloruinas_var.png');
const pared_unidad7 = crearImagen('img/pared_unidad_ruinas.png');
const esquina7 = crearImagen('img/esquina_ruinas.png');
//tienda
const suelo8 = crearImagen('img/suelotienda.png');
const suelo_var8 = crearImagen('img/suelotienda_var.png');
const pared_unidad8 = crearImagen('img/pared_unidad_tienda.png');
const esquina8 = crearImagen('img/esquina_tienda.png');

const puerta = crearImagen('img/puerta.png');
const puerta_castillo = crearImagen('img/puerta_castillo.png');
const puerta_pinchos = crearImagen('img/puerta_pinchos.png');

const textura_test = crearImagen('img/textura_test.png');
const player_img = crearImagen('img/player.png');

const skull_img = crearImagen('img/skull_hp.png');
const font_img = crearImagen('img/font.png');

const transition_img = crearImagen('img/trans.png');

// proyectiles
const flecha = crearImagen('img/flecha.png');
const fire_bullet = crearImagen('img/fire.png');
const laser_bullet = crearImagen('img/laser.png');

// armas
const rifle_viejo = crearImagen('img/rifle_viejo.png');
const rifle_laser = crearImagen('img/rifle_laser.png');
const lanzallamas = crearImagen('img/lanzallamas.png');
const triaura = crearImagen('img/triaura.png');

// enemigos
const slime_img = crearImagen('img/slime.png');
const esqueleto_img = crearImagen('img/esqueleto.png');
const sapo64_img = crearImagen('img/sapo64.png');
const goliat_img = crearImagen('img/goliat.png');

// part
const esqueleto_part = crearImagen('img/esqueleto_part.png');
const slime_part = crearImagen('img/slime_part.png');
const octo_part = crearImagen('img/octo_part.png');

// splat
const splat_slime = crearImagen('img/splat_slime.png');
const splat_sangre = crearImagen('img/splat_sangre.png');
const splat_esqueleto = crearImagen('img/esqueleto_splat.png');

// jarron part
const jarron_part = crearImagen('img/jarron_part.png');
const jarron_part2 = crearImagen('img/jarron_part2.png');
const jarron_splat = crearImagen('img/jarron_splat.png');
const jarron_splat2 = crearImagen('img/jarron_splat2.png');
jarron_parts = [jarron_part, jarron_part2];
jarron_splats = [jarron_splat, jarron_splat2];

//bidon parts
const bidon_part = crearImagen('img/bidon_part.png');
const bidon_part2 = crearImagen('img/bidon_part2.png');
const bidon_splat = crearImagen('img/bidon_splat.png');
const bidon_splat2 = crearImagen('img/bidon_splat2.png');
bidon_parts = [bidon_part, bidon_part2];
bidon_splats = [bidon_splat, bidon_splat2];

// trajes
const armadura = crearImagen('img/armadura.png');
const poncho = crearImagen('img/poncho.png');
const traje_exterminador = crearImagen('img/traje_exterminador.png');
const traje_ninja = crearImagen('img/traje_ninja.png');

// cascos
const casco1 = crearImagen('img/casco1.png');
const cascohueso = crearImagen('img/cascohueso.png');
const mascara_guerrero = crearImagen('img/mascara_guerrero.png');
const mascara_ninja = crearImagen('img/mascara_ninja.png');

// casillas
const casilla_completada = crearImagen('img/casilla_completada.png');
const casilla_completada_doble = crearImagen('img/casilla_completada_doble.png');
const casilla_no_completada = crearImagen('img/casilla_no_completada.png');
casilla_no_completada_doble = crearImagen('img/casilla_no_completada_doble.png');
marca_player = crearImagen('img/marca_player.png');

// ventanales
const ventanal1 = crearImagen('img/ventanal1.png');
const ventanal2 = crearImagen('img/ventanal2.png');
const ventana_mazmorra = crearImagen('img/ventana_mazmorra.png');
const luz_mazmorra_img = crearImagen('img/luz_mazmorra.png');
const ventanal_luz = crearImagen('img/ventanal_luz.png');

// tienda
const tienda = crearImagen('img/tienda.png');
const menu_tienda = crearImagen('img/menu_tienda.png');
const cursor = crearImagen('img/cursor.png');
const cursor_horizontal = crearImagen('img/cursor_horizontal.png');
const vending = crearImagen('img/vending.png');
const alfombra = crearImagen('img/alfombra.png');
const alfombra_tienda = crearImagen('img/alfombra_tienda.png');
const alfombra_tienda2 = crearImagen('img/alfombra_tienda2.png');
const sold_img = crearImagen('img/sold.png');

// objetos
const bidon = crearImagen('img/bidon.png');
const jarron = crearImagen('img/jarron.png');
const pinchos = crearImagen('img/pinchos.png');
const piedra = crearImagen('img/piedra.png');
const piedra2 = crearImagen('img/piedra2.png');
const piedra3 = crearImagen('img/piedra3.png');
const piedra4 = crearImagen('img/piedra4.png');
const piedra5 = crearImagen('img/piedra5.png');
const piedra6 = crearImagen('img/piedra6.png');
const palmera1 = crearImagen('img/palmera1.png');
const palmera2 = crearImagen('img/palmera2.png');
const palmera3 = crearImagen('img/palmera3.png');
const palmerita = crearImagen('img/palmerita.png');
const tocon = crearImagen('img/tocon.png');

// gui
const panel_iz = crearImagen('img/panel_iz.png');
const dialogo = crearImagen('img/dialogo.png');

// inventario pausa
const atras_items = crearImagen('img/inventario/atras_items.png');
const barra_items = crearImagen('img/inventario/barra_items.png');
const equipado = crearImagen('img/inventario/equipado.png');
const ventana_items = crearImagen('img/inventario/ventanaitems.png');
const ventana_stats = crearImagen('img/inventario/ventanastats.png');
const ico_traje = crearImagen('img/inventario/ico_traje.png');
const ico_arma = crearImagen('img/inventario/ico_arma.png');
const ico_casco = crearImagen('img/inventario/ico_casco.png');

// fx
const explosion = crearImagen('img/explosion.png');
const splat_explosion = crearImagen('img/splat_explosion.png');
const critical_img = crearImagen('img/crt.png');

// spikers
const spikeImg = crearImagen('img/spiker.png');
