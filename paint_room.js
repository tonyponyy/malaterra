function paint_room(current_context,room) {
    // Dibujamos el mosaico del suelo
    //room_width =400;
    //room_height = 600;
    var pattern = current_context.createPattern(suelo_images[room.ambient], 'repeat');
    current_context.fillStyle = pattern;
    current_context.fillRect(0, 0, room.canvas.width, room.canvas.height);
    //dibujamos las variaciones del suelo
    variations = random(23);
    for (let i = 0; i < variations; i++) {
        
        x_var = random(parseInt(room.canvas.width/32))*32
        y_var = random(parseInt(room.canvas.height/32))*32
        console.log("dibujamos variaciones x:"+x_var+" y:"+y_var)
        current_context.drawImage(suelo_images_var[room.ambient],x_var,y_var)
        
    }

    // Dibujamos las paredes
    drawWalls(current_context,room);


    // Función auxiliar para dibujar puertas con rotación
    function drawDoor(image, x, y, rotation,current_context) {
        // Guardamos el contexto original
        current_context.save();
        
        // Movemos el canvas a la posición de la puerta
        current_context.translate(x + image.width / 2, y + image.height / 2); // Centro de la puerta
        current_context.rotate(rotation); // Rotamos el canvas

        // Dibujamos la puerta centrada en la nueva posición
        current_context.drawImage(image, -image.width / 2, -image.height / 2);

        // Restauramos el contexto original
        current_context.restore();
    }

    // Función auxiliar para dibujar estatuas con rotación
    function drawStatue(image, x, y, rotation,current_context) {
        // Guardamos el contexto original
        current_context.save();
        
        // Movemos el canvas a la posición de la estatua
        current_context.translate(x + image.width / 2, y + image.height / 2); // Centro de la estatua
        current_context.rotate(rotation); // Rotamos el canvas

        // Dibujamos la estatua centrada en la nueva posición
        current_context.drawImage(image, -image.width / 2, -image.height / 2);

        // Restauramos el contexto original
        current_context.restore();
    }
    puerta_img = puerta_images[room.ambient]
    // Dibujamos las puertas y las estatuas con su rotación correspondiente
    if (room.door_up) {
        x = 189;
        y = -7;
        drawDoor(puerta_img, x, y, 0,current_context); // No rotamos para la puerta hacia arriba
        if (room.door_up.type == 3) {
            // Dibujamos las estatuas para la puerta hacia arriba
            drawStatue(estatua, x + 36, y + 22, 0,current_context); // Sin rotación
            drawStatue(estatua, x - 16, y + 22, 0,current_context); // Sin rotación
        }
    }
    if (room.door_down) {
        x = 189;
        y = 262;
        drawDoor(puerta_img, x, y, Math.PI,current_context); // Rotamos 180 grados para la puerta hacia abajo
        if (room.door_down.type == 3) {
            // Dibujamos las estatuas para la puerta hacia abajo
            drawStatue(estatua, x + 32, y + -3, Math.PI,current_context); // Rotación 180 grados
            drawStatue(estatua, x - 16, y + -3, Math.PI,current_context); // Rotación 180 grados
        }
    }else{
        if (chance(50)){

        x = 189;
        y = 255;

        let ventanales;
         let ambient = room.ambient;
         if (permited_ambients.indexOf(ambient) !=-1){
        if (ambient == 3 /*castillo*/){
            ventanales = ventanales_castillo
          }
          if (ambient == 1 /*mazmorras*/){
            ventanales = ventanales_mazmorra
          }
    
        if (room.ambient ==3){
            ventanales = [2,4]
        }
        if (chance(70)){
            let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
            drawDoor(ventanal, x, y, Math.PI,current_context);
        }else{
            let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
            drawDoor(ventanal, x-50, y, Math.PI,current_context);
            drawDoor(ventanal, x+50, y, Math.PI,current_context);

        }
        
        }
    }
    }
    if (room.door_up2) {
        x = 589;
        y = -7;
        drawDoor(puerta_img, x, y, 0,current_context); // No rotamos para la puerta hacia arriba
        if (room.door_up.type == 3) {
            // Dibujamos las estatuas para la puerta hacia arriba
            drawStatue(estatua, x + 36, y + 22, 0,current_context); // Sin rotación
            drawStatue(estatua, x - 16, y + 22, 0,current_context); // Sin rotación
        }
    }
    if (room.door_down2) {
        x = 589;
        y = 262;
        drawDoor(puerta_img, x, y, Math.PI,current_context); // Rotamos 180 grados para la puerta hacia abajo
        if (room.door_down.type == 3) {
            // Dibujamos las estatuas para la puerta hacia abajo
            drawStatue(estatua, x + 32, y + -3, Math.PI,current_context); // Rotación 180 grados
            drawStatue(estatua, x - 16, y + -3, Math.PI,current_context); // Rotación 180 grados
        }
        }else{
        if (chance(50)){

        x = 589;
        y = 255;

        let ventanales;
        let ambient = room.ambient;
         if (permited_ambients.indexOf(ambient) !=-1){
        if (ambient == 3 /*castillo*/){
            ventanales = ventanales_castillo
          }
          if (ambient == 1 /*mazmorras*/){
            ventanales = ventanales_mazmorra
          }
   
        if (chance(70)){
            let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
            drawDoor(ventanal, x, y, Math.PI,current_context);
        }else{
            let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
            drawDoor(ventanal, x-50, y, Math.PI,current_context);
            drawDoor(ventanal, x+50, y, Math.PI,current_context);

        }
        
        } }
    }
    if (room.door_left) {
        x = -7;
        y = 153;
        drawDoor(puerta_img, x, y, -Math.PI / 2,current_context); // Rotamos 90 grados para la puerta hacia la izquierda
        if (room.door_left.type == 3) {
            // Dibujamos las estatuas para la puerta hacia la izquierda
            drawStatue(estatua, x + 18, y -16, -Math.PI / 2,current_context); // Rotación 90 grados
            drawStatue(estatua, x + 16, y + 29, -Math.PI / 2,current_context); // Rotación 90 grados
        
    }
    }else{
    if (chance(40)){

    x = -7;
    y = 153;

    let ventanales;
    let ambient = room.ambient;
    if (permited_ambients.indexOf(ambient) !=-1){
        if (ambient == 3 /*castillo*/){
            ventanales = ventanales_castillo
          }
          if (ambient == 1 /*mazmorras*/){
            ventanales = ventanales_mazmorra
          }
    
    if (chance(60)){
        let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
        drawDoor(ventanal, x, y, -Math.PI/2,current_context);
    }else{
        let ventanal = IMAGE_OBJECT[ventanales[parseInt(Math.random()*ventanales.length)]]
        drawDoor(ventanal, x, y+10, -Math.PI/2,current_context);
        drawDoor(ventanal, x, y-60, -Math.PI/2,current_context);

    }
    
    }}
}
    if (room.door_right) {
        x = room.double? 400+360:360;
        y = 155;
        drawDoor(puerta_img, x, y, Math.PI / 2,current_context); // Rotamos -90 grados para la puerta hacia la derecha
        if (room.door_right.type == 3) {
            // Dibujamos las estatuas para la puerta hacia la derecha
            drawStatue(estatua, x -4, y - 14, Math.PI / 2,current_context); // Rotación -90 grados
            drawStatue(estatua, x - 4, y + 28, Math.PI / 2,current_context); // Rotación -90 grados
        }
    }

    print_text(room.array_x+" * "+room.array_y+"* tipo:"+room.type+" id:"+room.id, 90, 10,current_context);
}

function draw_gates(room){
    frame = gates.frame;
    if (room.door_up) {
        x = 189;
        y = -7;
        drawGate(puerta_pinchos, x-camera.x, y, 0,ctx,frame); // No rotamos para la puerta_pinchos hacia arriba
    }
    if (room.door_up2) {
        x = 589;
        y = -7;
        drawGate(puerta_pinchos, x-camera.x, y, 0,ctx,frame); // No rotamos para la puerta_pinchos hacia arriba
    }
    if (room.door_down) {
        x = 189;
        y = 262;
        drawGate(puerta_pinchos, x-camera.x, y, Math.PI,ctx,frame); // Rotamos 180 grados para la puerta_pinchos hacia abajo
    }
    if (room.door_down2) {
        x = 589;
        y = 262;
        drawGate(puerta_pinchos, x-camera.x, y, Math.PI,ctx,frame); // Rotamos 180 grados para la puerta_pinchos hacia abajo
    }
    if (room.door_left) {
        x = -7;
        y = 153;
        drawGate(puerta_pinchos, x-camera.x, y, -Math.PI / 2,ctx,frame); // Rotamos 90 grados para la puerta_pinchos hacia la izquierda
    }
    if (room.door_right) {
        x = room.double? 760:360;
        y = 155;
        drawGate(puerta_pinchos, x-camera.x, y, Math.PI / 2,ctx,frame); // Rotamos -90 grados para la puerta_pinchos hacia la derecha
    }

}

function drawGate(image, x, y, rotation,current_context,frame) {
    // Guardamos el contexto original
    current_context.save();
    
    // Movemos el canvas a la posición de la puerta
    current_context.translate(x + 48 / 2, y + 48 / 2); // Centro de la puerta
    current_context.rotate(rotation); // Rotamos el canvas

    // Dibujamos la puerta centrada en la nueva posición
    current_context.drawImage(
        image,      // imagen fuente
        frame * 48,    
        0,          // sourceY (asumiendo que es una fila única)
        48,         // sourceWidth (ancho de cada frame)
        48,         // sourceHeight (alto de cada frame)
        -24,        // destinationX (centrado: -width/2)
        -24,        // destinationY (centrado: -height/2)
        48,         // destinationWidth
        48          // destinationHeight
    );

    // Restauramos el contexto original
    current_context.restore();
}



function drawWalls(current_context,room) {
    // Pared arriba
    let img_pared_unidad = pared_unidad_img[room.ambient]
    let img_esquina = esquina_img[room.ambient]
    let pattern = current_context.createPattern(img_pared_unidad, 'repeat');
    current_context.fillStyle = pattern;
    current_context.fillRect(0, 0, room.canvas.width, img_pared_unidad.height);

    // Pared abajo
    current_context.save(); // Guardamos el contexto actual
    current_context.translate(room.canvas.width, room.canvas.height); // Movemos al borde inferior derecho
    current_context.rotate(Math.PI); // Rotamos 180 grados
    current_context.fillRect(0, 0, room.canvas.width, img_pared_unidad.height);
    current_context.restore(); // Restauramos el contexto original

    // Pared derecha
    current_context.save();
    current_context.translate(room.canvas.width, 0); // Movemos al borde derecho
    current_context.rotate(Math.PI / 2); // Rotamos 90 grados
    current_context.fillRect(0, 0, room.canvas.height, img_pared_unidad.height);
    current_context.restore();

    // Pared izquierda
    current_context.save();
    current_context.rotate(-Math.PI / 2); // Rotamos -90 grados
    current_context.translate(-room.canvas.height, 0); // Movemos al borde izquierdo
    current_context.fillRect(0, 0, room.canvas.height, img_pared_unidad.height);
    current_context.restore();

    //las esquinas
    current_context.drawImage(img_esquina, 0,0);
    // Esquina arriba-derecha (rotada 90 grados)
    current_context.drawImage(img_esquina, 0, 0);

    // Esquina arriba-derecha (rotada 90 grados)
    current_context.save();
    current_context.translate(room.canvas.width, 0); // Movemos al borde superior derecho
    current_context.rotate(Math.PI / 2); // Rotamos 90 grados
    current_context.drawImage(img_esquina, 0, 0); // Ajustamos la posición
    current_context.restore();

    // Esquina abajo-derecha (rotada 180 grados)
    current_context.save();
    current_context.translate(room.canvas.width, room.canvas.height); // Movemos al borde inferior derecho
    current_context.rotate(Math.PI); // Rotamos 180 grados
    current_context.drawImage(img_esquina, 0, 0); // Ajustamos la posición
    current_context.restore();

    // Esquina abajo-izquierda (rotada -90 grados)
    current_context.save();
    current_context.translate(0, room.canvas.height); // Movemos al borde inferior izquierdo
    current_context.rotate(-Math.PI / 2); // Rotamos -90 grados
    current_context.drawImage(img_esquina, 0, 0); // Ajustamos la posición
    current_context.restore();


}