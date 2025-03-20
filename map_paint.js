function drawMap(context, blockSize, mapWidth, mapHeight, startX, startY) {
    // Draw background for map area
    context.fillStyle = 'rgb(69,40,60)';
    context.fillRect(startX, startY, mapWidth, mapHeight);
   
    // Draw black border
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.strokeRect(startX, startY, mapWidth, mapHeight);
   
    // Find current room's position
    const currentRoomX = level.rooms[room_actual].array_y;
    const currentRoomY = level.rooms[room_actual].array_x;
    const current_double = level.rooms[room_actual].double;
   
    // Calculate the number of visible tiles that fit in the viewport
    const visibleTilesX = Math.floor(mapWidth / blockSize);
    const visibleTilesY = Math.floor(mapHeight / blockSize);
   
    // Calculate offset to center the current room
    const offsetX = Math.floor(visibleTilesX / 2) - currentRoomX;
    const offsetY = Math.floor(visibleTilesY / 2) - currentRoomY;
   
    // Define colors map
    const colors = {
        0: "black",
        1: "lightpink",
        2: "yellow",
        3: "blue",
        4: "orange",
        5: "purple",
        6: "pink",
        7: "cyan",
        8: "lightgreen",
        9: "magenta",
        10: "grey"
    };
   
    for (let y = 0; y < level.map.length; y++) {
        for (let x = 0; x < level.map[y].length; x++) {
            // Calculate screen position with startX and startY offset
            const screenX = startX + (x + offsetX) * blockSize;
            const screenY = startY + (y + offsetY) * blockSize;
           
            const tileValue = level.map[y][x];
            const multiplier = tileValue === 10 ? 2 : 1;
           
            const color = colors[tileValue] || "white";
           
            // Draw only if it's not an empty tile
            if (tileValue !== 0) {
                context.save();
               
                // Find the corresponding room for this position
                const currentRoom = level.rooms.find(room => 
                    room.array_y === x && room.array_x === y
                );
                
                // Check if room is completed
                const isCompleted = currentRoom ? currentRoom.clear : false;
                
                // Choose the appropriate image based on room type and completion status
                let tile_img;
                if (tileValue === 10) { // Double room
                    tile_img = isCompleted ? casilla_completada_doble : casilla_no_completada_doble;
                } else {
                    tile_img = isCompleted ? casilla_completada : casilla_no_completada;
                }

                // Calculate the visible portion of the tile
                let drawX = screenX;
                let drawY = screenY;
                let drawWidth = blockSize * multiplier;
                let drawHeight = blockSize;
                
                // Calculate source rectangle (portion of the image to draw)
                let sourceX = 0;
                let sourceY = 0;
                let sourceWidth = tile_img.width;
                let sourceHeight = tile_img.height;

                // Adjust if tile extends beyond left edge
                if (drawX < startX) {
                    const diff = startX - drawX;
                    sourceX = (diff / drawWidth) * sourceWidth;
                    sourceWidth = sourceWidth * (1 - diff / drawWidth);
                    drawWidth -= diff;
                    drawX = startX;
                }

                // Adjust if tile extends beyond right edge
                if (drawX + drawWidth > startX + mapWidth) {
                    const diff = (drawX + drawWidth) - (startX + mapWidth);
                    sourceWidth = sourceWidth * (1 - diff / drawWidth);
                    drawWidth -= diff;
                }

                // Adjust if tile extends beyond top edge
                if (drawY < startY) {
                    const diff = startY - drawY;
                    sourceY = (diff / drawHeight) * sourceHeight;
                    sourceHeight = sourceHeight * (1 - diff / drawHeight);
                    drawHeight -= diff;
                    drawY = startY;
                }

                // Adjust if tile extends beyond bottom edge
                if (drawY + drawHeight > startY + mapHeight) {
                    const diff = (drawY + drawHeight) - (startY + mapHeight);
                    sourceHeight = sourceHeight * (1 - diff / drawHeight);
                    drawHeight -= diff;
                }

                // Only draw if there's something visible
                if (drawWidth > 0 && drawHeight > 0) {
                    // Draw background
                    //context.fillStyle = color;
                    
                    
                    // Draw the visible portion of the image
                    context.drawImage(
                        tile_img,
                        sourceX, sourceY, sourceWidth, sourceHeight,
                        drawX, drawY, drawWidth, drawHeight
                    );
                    //context.fillRect(drawX, drawY, drawWidth, drawHeight);
                    
                    // Draw current room indicator if this is the current room
                    if (x === currentRoomX && y === currentRoomY) {
                        const rect_x = current_double ? 10 : 0;
                        // Adjust marker position based on visible portion
                        if (drawX + rect_x >= startX && drawX + rect_x < startX + mapWidth) {
                            context.drawImage(marca_player, drawX + rect_x, drawY);
                        }
                    }
                }
               
                context.restore();
            }
        }
    }
}