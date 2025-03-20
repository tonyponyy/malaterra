let lastShotFrame = 0; // Frame en el que se realizó el último disparo

function shoot_disparo(angle) {
    if (frame_counter < lastShotFrame) return;
    if(player.triatack){
        single_shot(angle)
        single_shot(angle+20)
        single_shot(angle-20)

    }else{
        single_shot(angle)
    }
     

}

function single_shot(angle){
    
    lastShotFrame = frame_counter+ player.cadencia * 3;
    const factor_precision = player.precision; // Precisión del jugador (1 a 10)
    const max_variation = 20; // Máxima variación en grados para precisión mínima (1)
    const variation = max_variation * (1 - factor_precision / 10); // Reducir variación con mayor precisión
    const random_variation = (Math.random() * 2 - 1) * variation; // Variación aleatoria dentro del rango [-variation, +variation]
    const adjusted_angle = angle + random_variation; // Ajustar el ángulo con la variación
    const disparo_add = new Proyectil(adjusted_angle); // Crear el proyectil con el ángulo ajustado
    pool_disparo.push(disparo_add); // Añadir el proyectil al pool

}