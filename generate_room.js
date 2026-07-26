 function generate_room(map,x,y,ambient,array_position){
    //altura = map[x].length
    type = map[x][y]
    id = x + y*map[x].length
    double = false;
    double_v = false;

    if ( type == 1 && map[x][y+1] == 1  ){

        if(chance(75)){
            double = true;
            console.warn("chances ?")
            map[x][y] = 10
            map[x][y+1] = 0
        }

    }

    // room doble vertical (dos rooms apiladas, misma columna)
    // marcador 11 (distinto del 10 de la doble horizontal) para poder
    // distinguir desde una room lejana de qué tipo de doble se trata
    if (!double && type == 1 && map[x+1] && map[x+1][y] == 1){

        if(chance(75)){
            double_v = true;
            map[x][y] = 11
            map[x+1][y] = 0
        }

    }

    if (!double){
    door_right = (map[x] && map[x][y+1] !== undefined && map[x][y+1] === 0 && typeof map[x][y+1] === 'number')
    ? false
    : (map[x] && map[x][y+1] !== undefined
        ? { id: x + (y+1)*map[x].length, type: map[x][y+1] }
        : false);
    }else{
        door_right = (map[x] && map[x][y+2] !== undefined && map[x][y+2] === 0 && typeof map[x][y+2] === 'number')
        ? false
        : (map[x] && map[x][y+2] !== undefined
            ? { id: x + (y+2)*map[x].length, type: map[x][y+2] }
            : false);

    }

    door_left = (map[x] && map[x][y-1] !== undefined && map[x][y-1] === 0 && typeof map[x][y-1] === 'number')
        ? false
        : (map[x] && map[x][y-1] !== undefined
            ? { id: x + (y-1)*map[x].length, type: map[x][y-1] }
            : false);
    if( door_left == false && map[x][y-2] ==10 ){
        door_left = { id: x + (y-2)*map[x].length, type: map[x][y-2] }
    }

    door_up = (map[x-1] && map[x-1][y] !== undefined && map[x-1][y] === 0 && typeof map[x-1][y] === 'number')
        ? false
        : (map[x-1] && map[x-1][y] !== undefined
            ? { id: x-1 + y*map[x].length, type: map[x-1][y] }
            : false);
    // si la room de arriba fue "tragada" por una doble vertical, la doble
    // real está dos filas por encima
    if( door_up == false && map[x-2] && map[x-2][y] == 11 ){
        door_up = { id: (x-2) + y*map[x].length, type: map[x-2][y] }
    }

    if (!double_v){
        door_down = (map[x+1] && map[x+1][y] !== undefined && map[x+1][y] === 0 && typeof map[x+1][y] === 'number')
            ? false
            : (map[x+1] && map[x+1][y] !== undefined
                ? { id: x+1 + y*map[x].length, type: map[x+1][y] }
                : false);
    }else{
        door_down = (map[x+2] && map[x+2][y] !== undefined && map[x+2][y] === 0 && typeof map[x+2][y] === 'number')
            ? false
            : (map[x+2] && map[x+2][y] !== undefined
                ? { id: x+2 + y*map[x].length, type: map[x+2][y] }
                : false);
    }

    door_up2 = false;
    door_down2 = false;
    if (double){
        door_up2 = (map[x-1] && map[x-1][y+1] !== undefined && map[x-1][y+1] === 0 && typeof map[x-1][y+1] === 'number')
        ? false
        : (map[x-1] && map[x-1][y+1] !== undefined
            ? { id: x-1 + (y+1)*map[x].length, type: map[x-1][y+1] }
            : false);

        door_down2 = (map[x+1] && map[x+1][y+1] !== undefined && map[x+1][y+1] === 0 && typeof map[x+1][y+1] === 'number')
            ? false
            : (map[x+1] && map[x+1][y+1] !== undefined
                ? { id: x+1 + (y+1)*map[x].length, type: map[x+1][y+1] }
                : false);

    }

    door_left2 = false;
    door_right2 = false;
    if (double_v){
        door_left2 = (map[x+1] && map[x+1][y-1] !== undefined && map[x+1][y-1] === 0 && typeof map[x+1][y-1] === 'number')
        ? false
        : (map[x+1] && map[x+1][y-1] !== undefined
            ? { id: (x+1) + (y-1)*map[x].length, type: map[x+1][y-1] }
            : false);

        door_right2 = (map[x+1] && map[x+1][y+1] !== undefined && map[x+1][y+1] === 0 && typeof map[x+1][y+1] === 'number')
            ? false
            : (map[x+1] && map[x+1][y+1] !== undefined
                ? { id: (x+1) + (y+1)*map[x].length, type: map[x+1][y+1] }
                : false);
    }


    clear = true;

    generated_room = new Room(type, id,door_up,door_down,door_left,door_right,door_up2,door_down2,clear,x,y,ambient,double,array_position,door_left2,door_right2,double_v);
    return generated_room
}