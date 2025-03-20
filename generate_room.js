 function generate_room(map,x,y,ambient,array_position){
    //altura = map[x].length
    type = map[x][y]
    id = x + y*map[x].length
    double = false;

    if ( type == 1 && map[x][y+1] == 1  ){

        if(chance(75)){
            double = true;
            console.warn("chances ?")
            map[x][y] = 10
            map[x][y+1] = 0
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

    door_down = (map[x+1] && map[x+1][y] !== undefined && map[x+1][y] === 0 && typeof map[x+1][y] === 'number') 
        ? false 
        : (map[x+1] && map[x+1][y] !== undefined 
            ? { id: x+1 + y*map[x].length, type: map[x+1][y] } 
            : false);

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

    
    clear = true;
  
    generated_room = new Room(type, id,door_up,door_down,door_left,door_right,door_up2,door_down2,clear,x,y,ambient,double,array_position);
    return generated_room
}