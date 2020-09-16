// Число организаций, выполнявших  научные исследования и разработки, по типам организаций по Российской Федерации												
											
const sources = [4099,	3566,	3492,	3682,	3566,	3605,	3604,	4175,	4032,	3944,	3950,	4053];

function average(source) {
  return source.reduce((acc, el) => acc + el) / source.length;
}

function dispersion(source) {
  const av = average(source);

  return source.reduce((acc, el) => (el - av) ** 2) / (source.length - 1); 
}

function standardDeviation(source) {
  return Math.sqrt(dispersion(source));
}

function variationCoefficient(source) {
  return standardDeviation(source) / average(source) * 100;
}

console.log('Среднее', average(sources));
console.log('Дисперсия', dispersion(sources));
console.log('Среднее квадратичное отклонение', standardDeviation(sources));
console.log('Коэффициент вариации', variationCoefficient(sources), '%');