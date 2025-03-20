var epoch = 0;
var seed;
var length_hex = 6;const fal = () => {
    // Usamos múltiples índices para mejor distribución
    let s1 = epoch % seed.length;
    let s2 = (epoch * 3 + 2) % seed.length;
    let s3 = (epoch * 7 + 4) % seed.length;
    
    // Obtenemos valores hexadecimales de diferentes posiciones
    let num1 = parseInt(seed[s1], 16);
    let num2 = parseInt(seed[s2], 16);
    let num3 = parseInt(seed[s3], 16);
    
    // Aplicamos operaciones matemáticas más balanceadas
    let sum = num1 + num2 + num3;
    let product = ((num1 * num2) % 16 + num3) % 16;
    
    // Combinamos los resultados de manera más uniforme
    let combined = (sum + product + epoch) % 10;
    
    // Aplicamos una transformación final para mejorar la distribución
    let result = (combined + Math.floor(epoch / seed.length)) % 10;
    
    epoch++;
    return result;
};

const false_random = (max) => {
    let num = 0;
    let iterations = Math.max(3, Math.ceil(Math.log2(max))); // Uso de logaritmo para mejor escala
    
    for (let i = 0; i < iterations; i++) {
        num = (num * 16 + fal()) % max;
    }
    
    // Aplicamos una transformación adicional para mejorar la uniformidad
    num = (num + Math.floor(epoch / 13)) % max;
    return num + 1; // Aseguramos que el rango sea 1 a max
};

const random = (max, min = 0) => {
    // Usamos múltiples llamadas para mejor distribución
    if (max == 1){
        return false_random(2) -1
    }
    return false_random(max - min) + min
};

// Las funciones chance y genex se mantienen igual ya que dependen de las otras funciones
const chance = (num, perc = 100) => {
    num_evaluate = random(perc);
    return num_evaluate < num ? true : false;
};

const genex = (length_hex) => {
    var resultado = '';
    let caracteresHexadecimales = '0123456789ABCDEF';
    for (let i = 0; i < length_hex; i++) {
        resultado += caracteresHexadecimales.charAt(Math.floor(Math.random() * caracteresHexadecimales.length));
    }
    seed = resultado;
};

const pseudo_genex = (length_hex) => {
    let resultado = '';
    let caracteresHexadecimales = '0123456789ABCDEF';
    for (let i = 0; i < length_hex; i++) {
        resultado += caracteresHexadecimales.charAt(Math.floor(random(caracteresHexadecimales.length)));
    }
    seed = resultado;
    return seed;
};

function test_random() {
    let res = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
    for (let i = 0; i < 10000; i++) {
        let num = fal();
        res[num]++;
    }
    console.log(res);
}