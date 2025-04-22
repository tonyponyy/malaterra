let shop_active = false;
let cursor_pos = 0;
let POSITIONS_CURSOR = [{x:150,y:140},{x:190,y:140},{x:230,y:140},{x:120,y:170},{x:160,y:170}]
let last_key_shop = 0;
let tiles_pause_shop = 15;
let items_shop_array = [];
let rect_xs = 70
let rect_ys = 70;

let item_selected = null;
let price_item = 0;

function open_shop(items){
    if (frame_counter > last_key_shop){
        price_item = 0;
        item_selected = null
        last_key_shop = frame_counter+ tiles_pause_shop
        player.can_move = false;
        shop_active	= true;
        items_shop_array = items
    }
    
}

function close_shop(){
    shop_active = false;
    cursor_pos = 0;
    items_shop_array = [];
    player.can_move = true;
    last_key_shop = frame_counter+ tiles_pause_shop

}

function update_shop(){
    if (last_key_shop ==0){
        last_key_shop = frame_counter+ tiles_pause_shop*3
    }
    if (shop_active ){

        if (keys["ArrowLeft"] &&cursor_pos > 0 && frame_counter > last_key_shop){
            last_key_shop = frame_counter+ tiles_pause_shop
            cursor_pos--
        }
        if (keys["ArrowRight"] &&cursor_pos <= POSITIONS_CURSOR.length-3 && frame_counter > last_key_shop){
            last_key_shop = frame_counter+ tiles_pause_shop
            cursor_pos++
        }
        if (keys["ArrowDown"] && frame_counter > last_key_shop){
            last_key_shop = frame_counter+ tiles_pause_shop
            cursor_pos = 3
        }
        if (keys["ArrowUp"] && frame_counter > last_key_shop &&cursor_pos >= 3){
            last_key_shop = frame_counter+ tiles_pause_shop
            cursor_pos = 0
        }
        //SELECCIONAR OBJETO
        for (let e = 0; e < 3; e++) {
            if (cursor_pos == e){
                if (items_shop_array[e] !=null){
                    price_item = items[items_shop_array[e]].price
                }else{
                    price_item = 0;
                }
            }
            if (cursor_pos == e &&(keys["d"] ||keys["w"] ||keys["a"]||keys["s"] ) && frame_counter > last_key_shop ){
                if (items_shop_array[e] !=null){
                    last_key_shop = frame_counter+ tiles_pause_shop
                    price_item = items[items_shop_array[e]].price
                    item_selected = e;
                    cursor_pos = 4
                }
            }
        }
        //COMPRAR OBJETO
        if(cursor_pos == 4  &&(keys["d"] ||keys["w"] ||keys["a"]||keys["s"] ) && frame_counter > last_key_shop ){
            if(price_item<= player.money){
                player.money -=price_item;
                player.items.push(items[items_shop_array[item_selected]])
                items_shop_array[item_selected] = null
                last_key_shop = frame_counter+ tiles_pause_shop
                price_item = 0;
                //sonido de caja
            }else{
                last_key_shop = frame_counter+ tiles_pause_shop
                //no tiene dinero
            }
            cursor_pos = 0;
        }

        

        if (cursor_pos ==3 &&(keys["d"] ||keys["w"] ||keys["a"]||keys["s"] ) && frame_counter > last_key_shop){
            close_shop();
            //añadir texto para que el tendero se despida
        }

        /*
        if (keys["ArrowUp"]) prov_vy -= player.acceleration;
        if (keys["ArrowDown"]) prov_vy += player.acceleration;
        if (keys["ArrowLeft"]) prov_vx -= player.acceleration;
        if (keys["ArrowRight"]) prov_vx += player.acceleration;
        */
        rect_shop_x = 70
        ctx.drawImage(menu_tienda,170,100)
        print_text("$"+price_item,212+rect_shop_x,157,ctx)
        ctx.drawImage(cursor,POSITIONS_CURSOR[cursor_pos].x+70,POSITIONS_CURSOR[cursor_pos].y)
        for (let i = 0; i < items_shop_array.length; i++) {
            const element = items_shop_array[i];
            if(element != null){
            //ctx.drawImage(items[element].img,POSITIONS_CURSOR[i].x+60,POSITIONS_CURSOR[i].y-30)
            if (items[element].type == "helmet" || items[element].type == "suit"){
                rect_x_y=0
                if (items[element].type == "helmet"){
                //rectificacon y casco
                rect_x_y=7
                }else{
                //rectificacon y traje
                rect_x_y=-5
                }


                ctx.drawImage(items[element].img,96,0,32,32,POSITIONS_CURSOR[i].x+60,POSITIONS_CURSOR[i].y-30+rect_x_y,32,32)
            }else{
                ctx.drawImage(items[element].img,0,0,32,32,POSITIONS_CURSOR[i].x+60,POSITIONS_CURSOR[i].y-30,32,32)
            }
            
            //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
            }else{
            ctx.drawImage(sold_img,0,0,32,32,POSITIONS_CURSOR[i].x+64,POSITIONS_CURSOR[i].y-30,32,32)
            }
        }
       // ctx.drawImage(items)
     }
}
