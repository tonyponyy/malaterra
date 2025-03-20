boss_animation_in_progress = false;
index_text =0;
text_to_show =[];
next_text = 0;
duration =150;
saved_enemy =null;
animation_duration = 30;
y_img_boss= -100;


function boss_warning_animation(){
    if (boss_animation_in_progress){
        if(next_text <= 0){
            index_text++
            next_text = duration
            if(index_text > text_to_show.length-1){
                boss_warning_animation_deactivate();
                return
            }
        }
        text = text_to_show[index_text]
        sprite_boss_animation()
        print_text(text,parseInt(canvas.width/2)-text.length*10/2, parseInt(canvas.height/2))
        next_text--

    }
    
}

function sprite_boss_animation(){
    size_changer=0;
    if (index_text ==text_to_show.length-1 && next_text <= animation_duration){
        distance = +100 +(canvas.height/2)
        y_img_boss += distance/animation_duration
        size_changer =  next_text
    }
    
    x= parseInt(canvas.width/2)
    tile_size = saved_enemy.size
    brillo = Math.min(100, Math.max(0, (canvas.height/2)-y_img_boss)); 
    console.log("brillo--> "+brillo) 
    ctx.save()
    ctx.filter = "brightness("+parseInt(100-brillo)+"%)"
    ctx.drawImage(saved_enemy.img, tile_size*4, 0,tile_size , tile_size, x, y_img_boss, parseInt(tile_size+size_changer), parseInt(tile_size+size_changer));
    ctx.restore()
}


function boss_warning_animation_activate(){
   
    boss_animation_in_progress = true;
    next_text = duration;
    text1 = "Se aproxima un enemigo"
    text2 = "PS:"+level.rooms[room_actual].enemys[0].hp
    text3 = "dificultad ****"
    saved_enemy = level.rooms[room_actual].enemys[0]
    level.rooms[room_actual].enemys[0] = { draw(){},update(){}}
    text_to_show = [text1,text2,text3]

}

function boss_warning_animation_deactivate(){
    load_enemy()
    boss_animation_in_progress = false;
    index_text =0;
    text_to_show =[];
    y_img_boss = -100
    saved_enemy = null;
}

function load_enemy(){
    saved_enemy.x = canvas.width/2
    saved_enemy.y = canvas.height/2
    saved_enemy.show_hp = true;
    level.rooms[room_actual].enemys[0] =saved_enemy;

}