class Room{
    //tipos de habitación
    // 1--> room normal
    // 2--> room inicio
    // 3--> room boss
    // 4--> room item
    // 5--> room tienda
    // 6--> room bruja
    // 7--> room masacre
    // 8--> room biblioteca (mapa)
    // 9--> room mazmorra
    // 10--> room doble

    // ejemplo de door
    // no hay habitación --> false;
    // hay habitación ---> {id,type} -->{3,}


    constructor(type, id, door_up,door_down,door_left,door_right,door_up2,door_down2,clear,array_x,array_y,ambient,double,array_pos) {
        this.type = type; 
        this.id = id;  
        this.door_up = door_up;
        this.door_down = door_down;
        this.door_left = door_left;
        this.door_right = door_right;
        this.door_up2 = door_up2;
        this.door_down2 = door_down2
        this.clear = false;
        this.array_pos = array_pos;
        this.array_x = array_x;
        this.array_y = array_y;
        this.ambient = ambient;
        this.double = double;
        // creación canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = double ? 800:400; 
        this.canvas.height = 300; 
        this.context = this.canvas.getContext("2d");
        // pools
        this.events = [];
        this.particles = [];
        this.enemys = [];
        this.objects = [];
        this.wall_objects =[];
        //this.open_gates = true;
        //dibujamos el fondo
        paint_room(this.context,this);
        this.poblate_enemys();
        this.poblate_objects();
        this.poblate_wall_objects()
    }

    poblate_objects(){

        //tipos de habitación
    // 1--> room normal
    // 2--> room inicio
    // 3--> room boss
    // 4--> room item
    // 5--> room tienda
    // 6--> room bruja
    // 7--> room masacre
    // 8--> room biblioteca (mapa)
    // 9--> room mazmorra
       

        switch (this.type) {
            case 1:
              this.poblate_normal();
              break;
            case 2:
              this.poblate_initial();
              break;
            case 3:
              this.poblate_boss();
              break;
            case 4:
              this.poblate_item();
              break;
            case 5:
              this.poblate_shop();
              break;
            case 6:
              this.poblate_witch();
              break;
            case 8:
              this.poblate_library();
              break;
            case 9:
               this.poblate_massacre();
               break;
            default:
              break;
          }
          
        //array 10 de ancho.
        //array 7 de alto
       
    }

    poblate_normal(){
        console.info("poblate normal")
        //piedra -->8
        let exterior = MAPA_VACIO;
        let interior = MAPA_VACIO;

        if (chance(50)){
          exterior = MAPS_BORDES[random(MAPS_BORDES.length-1)]
        }
        if (chance(30)){
          interior = MAPS_INTERIOR[random(MAPS_INTERIOR.length-1)]
        }

        //let mapa_proc = randomizer_terrain([...map_chosen]);
        let map_chosen = mergeArrays(exterior,interior)


        let mapa_proc = change_object_ambientation(map_chosen,this.ambient)
        let x_init = 40;
        let y_init = 35;
        let width_poblate = 10
        let height_poblate = 7
        let size = 32
        //hacemos los huecos de las puertas
        if (this.door_down  ){
            //mapa_proc[66] = 0;
            mapa_proc[65] = 0;
           // mapa_proc[64] = 0;
        }
        if(this.door_left ){
            //mapa_proc[30] = 0;
            mapa_proc[40] = 0;
            //mapa_proc[50] = 0;
        }
        if(this.door_right ){
            //mapa_proc[39] = 0;
            mapa_proc[49] = 0;
            //mapa_proc[59] = 0;
        }
        if (this.door_up ){
            //mapa_proc[4] = 0;
            mapa_proc[5] = 0;
            //mapa_proc[6] = 0;
        }
        if (this.double){
          mapa_proc[18] = 0;
          mapa_proc[27] = 0;
          mapa_proc[36] = 0;
          mapa_proc[45] = 0;
          mapa_proc[54] = 0;
        }
        
        for (let i = 0; i < mapa_proc.length; i++) {
            let tile = mapa_proc[i];
            if (tile != 0) {
                let object = new ObjectRoom(
                    tile,
                    x_init + parseInt(i % width_poblate) * size, // Cálculo correcto de x
                    y_init + parseInt(i / width_poblate) * size, // Cálculo correcto de y
                    true,
                    true,
                    40
                );
                  /*test para añadir dropeo
                  if (object.type ==1){
                    let palmera = new ObjectRoom(11,object.x,object.y,null,null,40)
                    object.drop.push(palmera)
                  }*/
                this.objects.push(object);
            }
        }
        if (this.double){
           map_chosen = MAPS_BORDES[random(MAPS_BORDES.length-1)]
           //mapa_proc = randomizer_terrain([...map_chosen]);
           mapa_proc = change_object_ambientation(map_chosen,this.ambient)
           if (this.door_down2  ){
            //mapa_proc[66] = 0;
            mapa_proc[65] = 0;
           // mapa_proc[64] = 0;
          }
          if (this.door_up2 ){
            //mapa_proc[4] = 0;
            mapa_proc[5] = 0;
            //mapa_proc[6] = 0;
        }
        if(this.door_right ){
          //mapa_proc[39] = 0;
          mapa_proc[49] = 0;
          //mapa_proc[59] = 0;
      }
        mapa_proc[10]=0;
        mapa_proc[20]=0;
        mapa_proc[30]=0;
        mapa_proc[40]=0;
        mapa_proc[50]=0;


          for (let i = 0; i < mapa_proc.length; i++) {
            let tile = mapa_proc[i];
            if (tile != 0) {
              
                let object = new ObjectRoom(
                    tile,
                    x_init + parseInt(i % width_poblate) * size+400, // Cálculo correcto de x
                    y_init + parseInt(i / width_poblate) * size, // Cálculo correcto de y
                    null,
                    null,
                    40
                );
                //test para añadir dropeo
                /*
                if (object.type ==1){
                  let palmera = new ObjectRoom(11,object.x,object.y,null,null,40)
                  object.drop.push(palmera)
                }*/
                this.objects.push(object);
            }
        }

        }

    }

    poblate_initial(){ 
     // this.poblate_normal();
     // let type_event = {type:"dialog",text:"bbllbalba blbal lblbla"}
      //let ee = new Event( 200,200,200,type_event)
     // this.events.push(ee)
    };

    poblate_boss(){};

    poblate_item(){};

    poblate_shop(){
      x=170
      y=100
      let tienda_room = new ObjectRoom(14,x,y,true,false,10,32)
      this.objects.push(tienda_room)

    };

    poblate_witch(){};

    poblate_library(){};

     poblate_massacre(){};

     poblate_wall_objects(){
    //localizamos el tipo de level :
    let ambient = this.ambient;

    let probability =60
    let ventanales;
    let light;
    if (ambient == 3 /*castillo*/){
      ventanales = ventanales_castillo
      light = luz_castillo
    }
    if (ambient == 1 /*mazmorras*/){
      ventanales = ventanales_mazmorra
      light = luz_mazmorra
    }
      
     if (!this.door_up && this.type !=3&&  (permited_ambients.indexOf(ambient) !=-1|| ambient ==1) && chance(probability)){
      //(type,x,y,colision,destructible,hp,size=20)
      let ventanal = ventanales[parseInt(Math.random()*ventanales.length)]
      let object = new ObjectRoom(ventanal,188,8,false,false,10,10)
      let object2 = new ObjectRoom(light,188,0,false,false,10,10,true)
    this.wall_objects.push(object);
    if (this.type !=5){
      this.wall_objects.push(object2);
    }
    
     }
     if (!this.door_up2 && this.double && this.type !=3 && (permited_ambients.indexOf(ambient) !=-1|| ambient ==1) && chance(probability)){
      let ventanal = ventanales[parseInt(Math.random()*ventanales.length)]
      let object = new ObjectRoom(ventanal,188+400,8,false,false,10,10)
      let object2 = new ObjectRoom(light,188+400,0,false,false,10,10,true)
    this.wall_objects.push(object);
    if (this.type !=5){
      this.wall_objects.push(object2);
    }
     }
 
     }



    poblate_enemys(){
      // room normal
      if (this.type ==1){
        let pos_x = random(this.canvas.width/2 +100, this.canvas.width/2 -100)
        let pos_x2 = random(this.canvas.width/2 +100, this.canvas.width/2 -100)
        let pos_x3 = random(this.canvas.width/2 +100, this.canvas.width/2 -100)
        let pos_x4 = random(this.canvas.width/2 +100, this.canvas.width/2 -100)
        let pos_x5 = random(this.canvas.width/2 +100, this.canvas.width/2 -100)
        let  pos_y = random(this.canvas.height/2 +100, this.canvas.height/2 -100)
         let enemy = new Enemy(1,pos_x5,pos_y);
         let enemy5 = new Enemy(1,pos_x,pos_y);
         let enemy4 = new Enemy(1,pos_x2,pos_y);
         let enemy3 = new Enemy(1,pos_x3,pos_y);
         let enemy2 = new Enemy(0,pos_x4,pos_y);
         this.enemys.push(enemy,enemy2,enemy3,enemy4,enemy5)
      }
      // room boss
      if(this.type ==3){
        let boss = new Enemy(1,0,0);
        boss.hp_initial =500
        boss.hp = 500
        this.enemys.push(boss)
      }
      
    }

}