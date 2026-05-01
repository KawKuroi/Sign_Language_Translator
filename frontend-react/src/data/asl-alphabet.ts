export interface AslLetter {
  letter: string;
  description: string;
  tip?: string;
}

export const ASL_ALPHABET: AslLetter[] = [
  {
    letter: 'A',
    description: 'Puño cerrado con todos los dedos doblados. El pulgar descansa al lado del índice, no encima.',
    tip: 'El pulgar no cruza por encima de los dedos.',
  },
  {
    letter: 'B',
    description: 'Mano abierta vertical con los cuatro dedos juntos y extendidos hacia arriba. El pulgar cruza la palma.',
    tip: 'Mantén los dedos completamente rectos y juntos.',
  },
  {
    letter: 'C',
    description: 'Dedos curvados formando una C abierta, como si sostuvieras una lata. Pulgar e índice enfrentados.',
    tip: 'La apertura de la C queda hacia un lado.',
  },
  {
    letter: 'D',
    description: 'Índice apuntando hacia arriba. Los otros tres dedos doblan tocando el pulgar, formando un círculo.',
    tip: 'El círculo entre pulgar y los tres dedos debe ser visible.',
  },
  {
    letter: 'E',
    description: 'Los cuatro dedos doblados hacia abajo con las puntas rozando la base de la palma. El pulgar dobla por debajo.',
    tip: 'La posición se parece a una garra suave.',
  },
  {
    letter: 'F',
    description: 'Índice y pulgar tocan sus puntas formando un círculo. Los otros tres dedos están extendidos y separados.',
    tip: 'Los tres dedos extendidos apuntan hacia arriba y hacia afuera.',
  },
  {
    letter: 'G',
    description: 'Índice y pulgar apuntan hacia un lado en paralelo, como señalando horizontalmente. Otros dedos cerrados.',
    tip: 'El índice y el pulgar deben quedar paralelos, no tocarse.',
  },
  {
    letter: 'H',
    description: 'Índice y corazón extendidos y juntos apuntando hacia un lado. Pulgar y otros dedos cerrados.',
    tip: 'Los dos dedos deben estar completamente juntos y horizontales.',
  },
  {
    letter: 'I',
    description: 'Meñique extendido hacia arriba. Los otros cuatro dedos y el pulgar forman un puño.',
    tip: 'Solo el meñique queda completamente extendido.',
  },
  {
    letter: 'K',
    description: 'Índice hacia arriba, corazón apuntando en diagonal. El pulgar descansa entre ambos. Anular y meñique cerrados.',
    tip: 'El corazón apunta ligeramente hacia afuera, no paralelo al índice.',
  },
  {
    letter: 'L',
    description: 'Índice extendido hacia arriba y pulgar extendido hacia un lado, formando una L. Otros dedos cerrados.',
    tip: 'El ángulo entre índice y pulgar debe ser aproximadamente 90°.',
  },
  {
    letter: 'M',
    description: 'Tres dedos (índice, corazón, anular) doblados sobre el pulgar que está extendido por debajo. Meñique cerrado.',
    tip: 'Los tres dedos cubren el pulgar completamente.',
  },
  {
    letter: 'N',
    description: 'Dos dedos (índice y corazón) doblados sobre el pulgar. Anular y meñique cerrados.',
    tip: 'Similar a M pero solo dos dedos cubren el pulgar.',
  },
  {
    letter: 'O',
    description: 'Todos los dedos curvados hacia el pulgar formando un círculo o "O" con la mano entera.',
    tip: 'El círculo debe estar bien definido, ni muy abierto ni muy cerrado.',
  },
  {
    letter: 'P',
    description: 'Como K pero orientada hacia abajo: índice apuntando abajo, corazón diagonal, pulgar entre ambos.',
    tip: 'Es la misma forma que K rotada hacia el suelo.',
  },
  {
    letter: 'Q',
    description: 'Como G pero orientada hacia abajo: índice y pulgar paralelos apuntando hacia el suelo.',
    tip: 'Es la misma forma que G rotada hacia el suelo.',
  },
  {
    letter: 'R',
    description: 'Índice y corazón extendidos con el corazón cruzado sobre el índice. Pulgar y otros dedos cerrados.',
    tip: 'Los dedos cruzados representan los dedos entrelazados.',
  },
  {
    letter: 'S',
    description: 'Puño cerrado con el pulgar sobre los dedos doblados, cruzando por delante del índice y corazón.',
    tip: 'El pulgar queda en frente del puño, no al costado.',
  },
  {
    letter: 'T',
    description: 'Puño cerrado con el pulgar entre el índice y el corazón, asomando levemente.',
    tip: 'El pulgar sale entre el índice y el corazón.',
  },
  {
    letter: 'U',
    description: 'Índice y corazón extendidos juntos apuntando hacia arriba. Pulgar, anular y meñique cerrados.',
    tip: 'Los dos dedos deben estar completamente juntos y rectos.',
  },
  {
    letter: 'V',
    description: 'Índice y corazón extendidos en forma de V (separados). Pulgar, anular y meñique cerrados.',
    tip: 'Los dos dedos deben estar claramente separados formando una V.',
  },
  {
    letter: 'W',
    description: 'Índice, corazón y anular extendidos y separados formando una W. Pulgar toca el meñique.',
    tip: 'Los tres dedos forman tres picos de la W.',
  },
  {
    letter: 'X',
    description: 'Índice doblado en forma de gancho. Otros dedos y pulgar cerrados en puño.',
    tip: 'El índice queda curvado como un gancho o anzuelo.',
  },
  {
    letter: 'Y',
    description: 'Pulgar y meñique extendidos hacia lados opuestos. Los tres dedos del medio doblados hacia la palma.',
    tip: 'Es el símbolo universal de "aloha" o "shaka".',
  },
];
