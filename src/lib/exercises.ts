export const EXERCISE_DB = {
  "Peitoral": [
    { id: 'p1', name: 'Flexão de Braço', desc: 'Apoie as mãos no chão e empurre o corpo.' },
    { id: 'p2', name: 'Flexão Inclinada', desc: 'Mãos em superfície elevada.' }
  ],
  "Costas": [
    { id: 'c1', name: 'Barra Fixa', desc: 'Puxe o corpo até o queixo passar da barra.' },
    { id: 'c2', name: 'Superman', desc: 'Levante braços e pernas deitado de bruços.' }
  ],
  "Pernas": [
    { id: 'pe1', name: 'Agachamento', desc: 'Desça o quadril mantendo as costas retas.' }
  ],
  "Cardio": [
    { id: 'ca1', name: 'Bicicleta', desc: 'Pedale em ritmo intenso.' }
  ]
};

export const ALL_EXERCISES = Object.values(EXERCISE_DB).flat();
