const items =[
    {id:0,name:"Rifle laser",type:"weapon",img:rifle_laser,cadencia:-8,precision:10,bullet_speed:3,bullet_type:'laser',price:500,damage:10},
    {id:1,name:"Rifle viejo",type:"weapon",img:rifle_viejo,cadencia:-2,precision:6,bullet_type:'arrow',price:500,damage:2},
    {id:2,name:"Armadura",type:"suit",img:armadura,defensa:5,price:50,damage:20},
    {id:3,name:"casco romano",type:"helmet",img:casco1,critico:10,price:40,damage:2},
    {id:4,name:"Poncho",type:"suit",img:poncho,cadencia:+5,price:500,speed:2},
    {id:5,name:"Casco hueso",type:"helmet",img:cascohueso,damage:+5,critico:5,price:500},
    {id:6,name:"Lanzallamas",type:"weapon",img:lanzallamas,cadencia:-1,precision:-3,bullet_type:'fire',price:500,damage:-4,rango:-5,triatack:true},
    {id:7,name:"Mascara de guerrero",type:"helmet",img:mascara_guerrero,damage:+10,defensa:2,price:500},
    {id:8,name:"Traje exterminador",type:"suit",img:traje_exterminador,price:500,defensa:3},
    {id:9,name:"Traje de las sombras",type:"suit",img:traje_ninja,price:500,damage:+3,speed:2},
    {id:10,name:"Mascara ninja",type:"helmet",img:mascara_ninja,critico:2,price:400,damage:4,cadencia:4},




]

function equipar_item(item_a_equipar){
    if (item_a_equipar.type == "weapon"){
        player.weapon = item_a_equipar.id
    }
    if (item_a_equipar.type == "suit"){
        player.traje = item_a_equipar.id
    }
    if (item_a_equipar.type == "helmet"){
        player.casco = item_a_equipar.id
    }
    if (item_a_equipar.type == 'consumible'){

    }else{
        set_equipo()
    }
    

}

function set_equipo(){
   // ["speed","bullet_speed","bullet_type","cadencia", "precision","defensa","critico","vida","damage"]

    equipo =[player.weapon,player.traje,player.casco]

    var hp_percentage = parseInt((player.hp/player.hp_initial)*100);

    player.triatack = false;
    player.acceleration = player.aceleration_base;
    player.bullet_speed = player.bullet_speed_base;
    //player.bullet_type = 'arrow';
    player.cadencia = player.cadencia_base;
    player.rango = player.rango_base;
    player.hp_initial = player.hp_base
    player.precision = player.precision_base;
    player.critico = player.critico_base;
    player.damage_distance = player.damage_distance_base;



    for (let i = 0; i < equipo.length; i++) {
        if (equipo[i] != null){
            const equipable = items[equipo[i]];
            if (equipable.speed){
                player.acceleration += equipable.speed/10
            }
            if (equipable.bullet_speed){
                player.bullet_speed += equipable.bullet_speed/10
            }
            if (equipable.bullet_type){
                player.bullet_type = equipable.bullet_type
            }
            if (equipable.cadencia){
                player.cadencia -= equipable.cadencia;
                if(player.cadencia<1){
                    player.cadencia = 1
                }
            }
            if (equipable.rango){
                player.rango += equipable.rango * 50;
            }
            if (equipable.defensa){
                player.hp_initial += equipable.defensa;
                player.hp = parseInt( hp_percentage * (player.hp_initial))
            }
            if (equipable.precision){
                player.precision += equipable.precision;
                if (player.precision >=10){
                    player.precision = 10
                }
            }
            if (equipable.critico){
                player.critico += equipable.critico*5;
            }
            if (equipable.damage){
                player.damage_distance += equipable.damage;
            }
            if (equipable.triatack){
                player.triatack = true;
            }
        }   
    }

}