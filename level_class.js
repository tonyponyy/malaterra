
    class Level {
        constructor(num_level, ambient) {
            this.n_tiles = 2 + num_level * 2;
            this.mapandpath = create_map(this.n_tiles);
            this.map = this.mapandpath.map;
            this.path = this.mapandpath.path;
            this.size = this.map[0].length;
            this.rooms = [];
            this.current_room = 0;
            this.ambient = ambient;
            this.intentos = 1;
            this.initiate();
            this.title = "";
        }
    
        initiate() {
            try {
            // const { map, path } = create_map(this.n_tiles); // Obtener mapa y camino
            //this.map = map;
                const pathSet = new Set(this.path.map(([x, y]) => `${x},${y}`)); // Convertimos path a Set para búsqueda rápida
        
                for (let x = 0; x < this.map[0].length; x++) {
                    for (let y = 0; y < this.map[0].length; y++) {
                        const element = this.map[x][y];
                        if (element != 0) {
                            let array_position = { x: x, y: y };
                            let isOnPath = pathSet.has(`${x},${y}`); // Verificamos si está en el camino obligatorio
        
                            let room_to_add = generate_room(this.map, x, y, this.ambient, array_position);
                            room_to_add.path = isOnPath; // Añadir propiedad path (true/false)
        
                            this.rooms.push(room_to_add);
        
                            if (element == 2) {
                                this.current_room = room_to_add.id;
                            }
                        }
                    }
                }
        
                this.id = 1;
                this.correct_rooms();
                console.warn("conseguido con un total de " + this.intentos + " intentos!");
            } catch (error) {
                this.intentos++;
                console.error("mec error! intento->" + this.intentos, error);
        
                if (this.intentos < 5) { // Limitar intentos para evitar recursión infinita
                    this.initiate();
                } else if (this.intentos < 500) {
                    this.map = create_map(this.n_tiles);
                    console.error("mec error! (cambiando genex) intento->" + this.intentos, error);
                    this.initiate();
                } else if (this.intentos > 15) {
                    console.error("ya prou");
                }
            }
        }
        
    
    

    correct_rooms(){
        for (let i = 0; i < this.rooms.length; i++) {
            const room = this.rooms[i];
            if (room.double){
                if(room.door_down2){
                    let id_dd2 = room.door_down2.id
                    let pos = this.get_room_pos(id_dd2);
                    if (!this.rooms[pos].door_up){
                        this.rooms[pos].door_up ={id: id_dd2-1 }
                        paint_room(this.rooms[pos].context,this.rooms[pos]);
                        this.rooms[pos].enemys = []
                        this.rooms[pos].objects = []
                        this.rooms[pos].wall_objects = []
                        this.rooms[pos].poblate_enemys();
                        this.rooms[pos].poblate_objects();
                        this.rooms[pos].poblate_wall_objects();
                    }
                }
                if(room.door_up2){
                    let id_du2 = room.door_up2.id
                    let pos = this.get_room_pos(id_du2);
                    if (!this.rooms[pos].door_down){
                        this.rooms[pos].door_down ={id:id_du2+1 } 
                        paint_room(this.rooms[pos].context,this.rooms[pos]);
                        this.rooms[pos].enemys = []
                        this.rooms[pos].objects = []
                        this.rooms[pos].wall_objects = []
                        this.rooms[pos].poblate_enemys();
                        this.rooms[pos].poblate_objects();
                        this.rooms[pos].poblate_wall_objects();
                    }
                }


            }
            
        }


    }

    get_room(id){
        for (let i = 0; i < this.rooms.length+1; i++) {
            if (this.rooms[i].id == id){
                return this.rooms[i]
            }
        }
       // console.error("room no encontrada")
        return -1;
    }
    get_current_room(){
       let room = this.get_room(this.current_room)
       return room;
    }
    get_room_pos(id){
        for (let i = 0; i < this.rooms.length+1; i++) {
            if (this.rooms[i].id == id){
                return i
            }
        }
       // console.error("posicion room no encontrada")
        return -1;
    }
    get_current_room_pos(){
        let pos = this.get_room_pos(this.current_room)
        return pos;
     }
    

}