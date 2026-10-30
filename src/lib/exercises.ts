export const EXERCISE_DB = {
  "Peitoral": [
    { "id": "p1", "name": "Supino reto", "desc": "Deitado no banco reto com os pés firmes. Segure a barra um pouco mais aberta que os ombros, desça controlando até o peito e empurre para cima estendendo os braços." },
    { "id": "p2", "name": "Supino inclinado", "desc": "Mesmo movimento do supino reto em banco inclinado (30° a 45°), com foco na parte superior do peito." },
    { "id": "p3", "name": "Pecdeck", "desc": "Sentado com as costas apoiadas e cotovelos nos suportes. Feche os braços à frente do peito apertando a musculatura e retorne controlando." }
  ],
  "Ombros": [
    { "id": "o1", "name": "Elevação lateral", "desc": "Em pé com halteres ao lado do corpo. Levante os braços lateralmente até a altura dos ombros e desça devagar." },
    { "id": "o2", "name": "Desenvolvimento", "desc": "Sentado ou em pé, segure pesos na altura dos ombros. Empurre para cima até estender os braços e retorne controlando." },
    { "id": "o3", "name": "Elevação unilateral", "desc": "Executado com um braço de cada vez (geralmente com polia ou halter) para isolamento do músculo do ombro." }
  ],
  "Costas": [
    { "id": "c1", "name": "Remada", "desc": "Com o tronco levemente inclinado para frente, puxe o peso em direção ao abdômen/quadril, fechando as escápulas, e estique os braços controlando." },
    { "id": "c2", "name": "Remada cavalinho", "desc": "Com o tronco inclinado sobre o aparelho/barra, puxe o peso em direção ao peito mantendo os cotovelos próximos ao corpo." },
    { "id": "c3", "name": "Puxada alta", "desc": "Sentado na polia alta com pegada aberta. Puxe a barra em direção ao peito estufando o tórax e retorne controlando a subida." }
  ],
  "Bíceps": [
    { "id": "b1", "name": "Rosca Scott", "desc": "Sentado no banco Scott com os braços apoiados. Flexione os braços trazendo o peso em direção ao queixo e desça controlando." },
    { "id": "b2", "name": "Rosca alternada", "desc": "Em pé ou sentado com halteres. Flexione um braço de cada vez, girando o punho para cima conforme sobe o peso." }
  ],
  "Tríceps": [
    { "id": "t1", "name": "Tríceps francês", "desc": "Em pé ou sentado, segure um halter com as duas mãos acima da cabeça. Flexione os cotovelos para descer o peso atrás da cabeça e estique os braços." }
  ],
  "Pernas e Glúteos": [
    { "id": "pe1", "name": "Agachamento com barra", "desc": "Com a barra apoiada nos trapézios, afaste os pés na largura dos ombros. Agache jogando o quadril para trás, mantendo calcanhares no chão e coluna reta." },
    { "id": "pe2", "name": "Agachamento sumo", "desc": "Com os pés bem abertos e pontas para fora, segure um peso entre as pernas. Agache com o tronco reto focando na parte interna das coxas e glúteos." },
    { "id": "pe3", "name": "Leg press 45", "desc": "Sentado no aparelho com os pés na plataforma. Destrave o peso, flexione os joelhos trazendo a plataforma em sua direção sem tirar a lombar e empurre de volta." },
    { "id": "pe4", "name": "Afundo", "desc": "Dê um passo largo para frente e flexione ambos os joelhos para descer o corpo verticalmente, depois retorne." },
    { "id": "pe5", "name": "Elevação pélvica", "desc": "Deitado de costas com joelhos flexionados. Apoie um peso sobre o quadril e empurre-o para cima, contraindo os glúteos no topo." },
    { "id": "pe6", "name": "Abdutora", "desc": "Sentada no aparelho com a parte externa dos joelhos nos suportes. Afaste as pernas para fora fazendo força com o glúteo lateral e retorne." },
    { "id": "pe7", "name": "Extensora", "desc": "Sentada no aparelho com o rolo na altura das canelas. Estique as pernas para cima contraindo o quadríceps e retorne controlando." },
    { "id": "pe8", "name": "Panturrilha", "desc": "Apoie a ponta dos pés em uma plataforma elevada, suba o calcanhar o máximo que conseguir e desça alongando bem embaixo." }
  ]
}

export const ALL_EXERCISES = Object.values(EXERCISE_DB).flat();
