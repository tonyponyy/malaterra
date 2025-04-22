let fc_pause = 0;
let menu_pause_selected = 0;
let last_key_pause = 0;
let tiles_pause = 15; 
let inventario_open = false;

const menu_pause = ["Inventario", "Volver al juego","otra opcion","salir del juego","","shakala"];

function set_pause() {
    fc_pause = frame_counter;
    menu_pause_selected = 0;
    scene = 'pause';
}

function return_game() {
    last_key_pause = 0;
    frame_counter = fc_pause;
    scene = 'game';
}

function pauseloop() {
    ctx_screen.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar la escena anterior con filtro
    ctx_screen.save();
    ctx_screen.filter = "brightness(0.2) sepia(60%)";
    ctx_screen.drawImage(canvas, 0, 0);
    ctx_screen.restore();
    
    let x = 260;
    let y = 30;
    print_text("Pausa", x, y, ctx_screen);
    
    for (let i = 0; i < menu_pause.length; i++) {
        print_text(menu_pause[i], x - 20, y + 30 + i * 20, ctx_screen);
        if (!inventario_open && menu_pause_selected === i) {
            if (frame_counter%70 > 35){
                ctx_screen.drawImage(cursor_horizontal, x - 50, y + 25 + i * 20); 
            }
           
        }
    }

    if (!inventario_open && keys["ArrowUp"] && menu_pause_selected > 0 && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
        menu_pause_selected--;
    }
    
    if (!inventario_open && keys["ArrowDown"] && menu_pause_selected < menu_pause.length - 1 && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
        menu_pause_selected++;
    }
    // inventario
    if(!inventario_open&&menu_pause_selected == 0 && frame_counter > last_key_pause && is_fucking_key_pressed()){
        open_inventario()
    }
    if(!inventario_open&&menu_pause_selected == 1 && frame_counter > last_key_pause && is_fucking_key_pressed()){
        return_game()
    }

    if (inventario_open){
        show_inventario()
    }


    
    frame_counter++;
}
inventario_settings = {pagina:0,total_paginas:0,position_actual:0}
function open_inventario(){
    last_key_pause = frame_counter + tiles_pause; 
    inventario_open = true;
    //inventario_settings = {pagina:0,total_paginas:parseInt(player.items.length/10),position_actual:-1}
    inventario_settings = {pagina: 0, total_paginas: Math.ceil(player.items.length / 10) - 1, position_actual: -1}
}


function show_inventario(){
    ventana_items_y = 20
    rec_x_i =41;
    x_inventario= 200
    rec_x_barra_item = 5
    rect_x_mark_item = 193;
    text_rect_items = 20;
    x_stats = 360
    y_stats = 180
    line_height = 16;
    x_pag = x_inventario
    y_pag = 240
    
    ctx_screen.drawImage(atras_items,180,ventana_items_y)
    ctx_screen.drawImage(ventana_items,x_inventario,ventana_items_y)
    let equiped_obj = [player.weapon,player.casco,player.traje].filter(el => el != null)
    let inicio = inventario_settings.pagina * 10;
    let fin = Math.min(inicio + 10, player.items.length);
    let max_positions = fin-inicio;
    let e = 0;
    for (let i = inicio ; i < fin; i++) {
        position_item_player = i;
        item = player.items[position_item_player];
        rect_y_line = line_height*e
        ctx_screen.drawImage(barra_items,x_inventario+rec_x_barra_item,ventana_items_y+rec_x_i+rect_y_line)
        if(equiped_obj.indexOf(item.id) !==-1 && inventario_settings.pagina ==0){
            ctx_screen.drawImage(equipado,x_inventario+rec_x_barra_item,ventana_items_y+rec_x_i+rect_y_line)
            equiped_obj[equiped_obj.indexOf(item.id)] = null;
        }
        if (item.type == "weapon"){
            ctx_screen.drawImage(ico_arma,x_inventario+rec_x_barra_item+rect_x_mark_item,ventana_items_y+rec_x_i+rect_y_line)
        }
        if (item.type == "suit"){
            ctx_screen.drawImage(ico_traje,x_inventario+rec_x_barra_item+rect_x_mark_item,ventana_items_y+rec_x_i+rect_y_line)
        }
        if (item.type == "helmet"){
            ctx_screen.drawImage(ico_casco,x_inventario+rec_x_barra_item+rect_x_mark_item,ventana_items_y+rec_x_i+rect_y_line)
        }
        print_text(item.name, x_inventario+rec_x_barra_item+ text_rect_items, ventana_items_y+rec_x_i+rect_y_line, ctx_screen);
        e++;
    }

    
    if (inventario_settings.total_paginas > 0){
        print_text((inventario_settings.pagina+1)+"/"+(inventario_settings.total_paginas+1),x_pag,y_pag,ctx_screen)
    }

    //posiciones del cursor
    if (inventario_settings.position_actual > max_positions){
        inventario_settings.position_actual = max_positions;
    }
    position_cursor = inventario_settings.position_actual

    if (position_cursor == -1){
        ctx_screen.drawImage(cursor_horizontal,180-20,ventana_items_y); 
    }
    for (let a = 0; a < max_positions; a++) {
       if(position_cursor == a){
        rect_y_line = line_height*a
        ctx_screen.drawImage(cursor_horizontal,x_inventario+rec_x_barra_item-20,ventana_items_y+rec_x_i+rect_y_line)
       }
        
    }
    if (position_cursor != -1){
        item_to_draw = player.items[inventario_settings.pagina*10+inventario_settings.position_actual]
        draw_stats(x_stats,y_stats,item_to_draw)
        console.log("item-->"+item_to_draw.name);
    }

    //hacia abajo
    if (inventario_open && keys["ArrowDown"] && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
        if (position_cursor < max_positions-1){
            inventario_settings.position_actual++;
        }else{
            if (inventario_settings.pagina < inventario_settings.total_paginas){
                inventario_settings.pagina++
                inventario_settings.position_actual = 0
            }
        }
        
    }
    //hacia arriba
    if (inventario_open && keys["ArrowUp"] && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
       if(position_cursor > -1){
            inventario_settings.position_actual--;
       }
    }

    //derecha
    
    if (inventario_open && keys["ArrowLeft"] && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
       if(inventario_settings.pagina > 0){
        inventario_settings.pagina--;
       }
    }

    //izquierda

    if (inventario_open && keys["ArrowRight"] && frame_counter > last_key_pause) {
        last_key_pause = frame_counter + tiles_pause; 
       if(inventario_settings.pagina < inventario_settings.total_paginas){
        inventario_settings.pagina++;
        inventario_settings.position_actual = 0;
       }
    }

    //presionar flecha
    if (inventario_open && is_fucking_key_pressed() && frame_counter > last_key_pause){
        last_key_pause = frame_counter + tiles_pause; 
        if(position_cursor ==-1){
            inventario_open = false;
        }else{
            let index = inventario_settings.pagina * 10 + inventario_settings.position_actual;
            let item_a_equipar = player.items[index];
            player.items.splice(index, 1);
            player.items.unshift(item_a_equipar);
            inventario_settings.pagina = 0;
            inventario_settings.position_actual = 0;
            equipar_item(item_a_equipar)
        }
    }


}

function draw_stats(x,y,obj_to_draw){
    if (obj_to_draw){
        ctx_screen.drawImage(ventana_stats,x,y)
        let offsetY = obj_to_draw.type === "helmet" ? 10 : 0;
        let sourceX = (obj_to_draw.type === "suit" || obj_to_draw.type === "helmet") ? 96 : 0;
        let destX = obj_to_draw.type === "suit" || obj_to_draw.type === "helmet" ? x + 95 : x + 90;
        ctx_screen.drawImage(obj_to_draw.img, sourceX, 0, 32, 32, destX, y + offsetY, 32, 32);
        array_stats = get_array_stats(obj_to_draw)
       for (let e = 0; e < array_stats.length; e++) {
        const element = array_stats[e];
         print_text(element[0]+":"+element[1],x+2,y+39+(e*12),ctx_screen)
       }

    }
   
}

function get_array_stats(objeto) {
    let array_a_devolver = [];
    let atributos =  ["speed","bullet_speed","bullet_type","cadencia", "precision","defensa","critico","vida","damage"];
    
    for (let i = 0; i < atributos.length; i++) {
        if (objeto[atributos[i]] !== undefined) { 
            array_a_devolver.push([atributos[i], objeto[atributos[i]]]);
        }
    }

    return array_a_devolver;
}


