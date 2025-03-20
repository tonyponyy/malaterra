// Función para calcular la distribución esperada vs real
function analyzeDistribution(generator, iterations = 10000, maxValue = 10) {
    // Inicializar contadores
    const counts = new Array(maxValue).fill(0);
    const expectedCount = iterations / maxValue;
    
    // Generar números y contar ocurrencias
    for (let i = 0; i < iterations; i++) {
        const num = generator();
        if (num >= 0 && num < maxValue) {
            counts[num]++;
        }
    }
    
    // Calcular estadísticas
    const stats = {
        totalNumbers: iterations,
        distribution: {},
        chiSquared: 0,
        standardDeviation: 0
    };
    
    // Calcular chi-cuadrado y desviación
    let sumSquaredDiffs = 0;
    counts.forEach((count, num) => {
        const difference = count - expectedCount;
        stats.distribution[num] = {
            count: count,
            percentage: (count / iterations) * 100,
            expectedCount: expectedCount,
            deviation: difference
        };
        stats.chiSquared += (difference * difference) / expectedCount;
        sumSquaredDiffs += difference * difference;
    });
    
    stats.standardDeviation = Math.sqrt(sumSquaredDiffs / maxValue);
    
    return stats;
}

// Función para evaluar la independencia de los números generados
function testIndependence(generator, iterations = 1000) {
    const pairs = new Map();
    let lastNum = generator();
    
    for (let i = 0; i < iterations; i++) {
        const currentNum = generator();
        const pair = `${lastNum}-${currentNum}`;
        pairs.set(pair, (pairs.get(pair) || 0) + 1);
        lastNum = currentNum;
    }
    
    return {
        pairCounts: Object.fromEntries(pairs),
        uniquePairs: pairs.size
    };
}

// Función para ejecutar todas las pruebas
function runAllTests() {
    // Reiniciar variables globales
    epoch = 0;
    genex(6); // Generar nueva semilla
    
    console.log("=== Prueba de distribución para fal() ===");
    const falStats = analyzeDistribution(() => fal());
    console.log(JSON.stringify(falStats, null, 2));
    
    console.log("\n=== Prueba de distribución para random(10) ===");
    const randomStats = analyzeDistribution(() => random(10));
    console.log(JSON.stringify(randomStats, null, 2));
    
    console.log("\n=== Prueba de independencia para fal() ===");
    const falIndependence = testIndependence(() => fal());
    console.log(JSON.stringify(falIndependence, null, 2));
    
    // Análisis de resultados
    return {
        falDistribution: falStats,
        randomDistribution: randomStats,
        independence: falIndependence
    };
}

// Función para evaluar la calidad de la distribución
function evaluateQuality(stats) {
    const idealDeviation = Math.sqrt(stats.totalNumbers / 10) * 0.5; // Aproximación de la desviación esperada
    const quality = {
        isBalanced: stats.standardDeviation < idealDeviation,
        chiSquaredQuality: stats.chiSquared < 16.919, // Valor crítico para p=0.05 con 9 grados de libertad
        worstDeviation: 0,
        recommendations: []
    };
    
    let maxDeviation = 0;
    Object.values(stats.distribution).forEach(dist => {
        const absDeviation = Math.abs(dist.deviation);
        if (absDeviation > maxDeviation) {
            maxDeviation = absDeviation;
        }
    });
    
    quality.worstDeviation = maxDeviation;
    
    if (!quality.isBalanced) {
        quality.recommendations.push("La distribución muestra desviaciones significativas del ideal.");
    }
    if (!quality.chiSquaredQuality) {
        quality.recommendations.push("El test chi-cuadrado sugiere que la distribución no es uniforme.");
    }
    if (quality.worstDeviation > stats.totalNumbers * 0.02) {
        quality.recommendations.push("Hay números que aparecen con frecuencia muy diferente a la esperada.");
    }
    
    return quality;
}