function set_boss(level_selected,enemy){
    enemy = ensureArray(enemy)
    level_selected.rooms.find((element) => element.type == 3).enemys = enemy 
}


function set_events_in_path(level_selected, events) {
    events = ensureArray(events)

    //room de preboss ( para eviarla)
    var room_preboss =level_selected.rooms.find((element) => element.path == true && (element.door_down.type ==3 || element.door_down2.type ==3 || element.door_up.type ==3 || element.door_left.type==3 || element.door_right.type == 3))
    var id_preboss = room_preboss.id

    // Seleccionamos las rooms que no sean de boss ni inicial para no interferir con el path ni con el room de preboss
    try{
      const eligibleRooms = level_selected.rooms.filter(
        (room) => room.path === true && /*room.type !== 2 &&*/ room.type !== 3 && room.id !== id_preboss);
      // Obtenemos los ids y los barajamos
      const shuffledIds = eligibleRooms.map((room) => room.id).sort(() => Math.random() - 0.5);
      // Seleccionamos un id aleatorio (por ejemplo, el primero del array barajado)
      const selectedId = shuffledIds[0];
      // Buscamos la room correspondiente a ese id
      const room_to_be_pushed = level_selected.rooms.find((room) => room.id === selectedId);
      // Nos aseguramos de que la propiedad events exista en la room
      if (!room_to_be_pushed.events) {
        room_to_be_pushed.events = [];
      }
      // Añadimos cada evento al room
      for (let i = 0; i < events.length; i++) {
        room_to_be_pushed.events.push(events[i]);
      }
      //alert("conseguido")
    }catch{
      alert("fallo al colocarse")
      set_events_in_initial(level_selected, events)
    }
  }

  function set_events_in_initial(level_selected, events) {
    events = ensureArray(events)
    const room_to_be_pushed =level_selected.rooms.find((element) => element.type == 2);
    // Añadimos cada evento al room
    for (let i = 0; i < events.length; i++) {
      room_to_be_pushed.events.push(events[i]);
    }
  }


  function set_events_in_pre_boss(level_selected, events) {
    events = ensureArray(events)
    const room_to_be_pushed =level_selected.rooms.find((element) => element.path == true && (element.door_down.type ==3 || element.door_down2.type ==3 || element.door_up.type ==3 || element.door_left.type==3 || element.door_right.type == 3))
    // Añadimos cada evento al room
    for (let i = 0; i < events.length; i++) {
      room_to_be_pushed.events.push(events[i]);
    }
  }

  function ensureArray(value) {
    return Array.isArray(value) ? value : [value];
  }