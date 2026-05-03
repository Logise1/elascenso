const storyNodes = {
    // ---------------------------------------------------------
    // CAPÍTULO I: LA HABITACIÓN DEL ECO
    // ---------------------------------------------------------
    ch1_start: {
        text: "El reloj de pared marca las 3:00 AM, pero jurarías que las manecillas no se han movido en horas. La casa está sumida en un silencio tan espeso que zumba en tus oídos. Estás de pie en el pasillo central. Alguien falta. La lógica dice una cosa, pero tu mente te grita que solo se han retrasado.",
        chapter: "Capítulo I: La Habitación del Eco",
        choices: [
            { text: "Ir a la sala de estar", action: "ir_sala", next: "ch1_sala" },
            { text: "Ir a la cocina", action: "ir_cocina", next: "ch1_cocina" },
            { text: "Ir al dormitorio", action: "ir_dormitorio", next: "ch1_dormitorio" },
            { text: "Bajar al sótano", action: "bajar_sotano", next: "ch1_sotano_start" },
            { text: "Revisar la puerta principal", action: "revisar_puerta", next: "ch1_puerta" }
        ]
    },
    
    // --- Pasillo ---
    ch1_pasillo: {
        text: "Estás de vuelta en el pasillo oscuro. El zumbido del silencio continúa.",
        choices: [
            { text: "Ir a la sala", action: "ir_sala", next: "ch1_sala" },
            { text: "Ir a la cocina", action: "ir_cocina", next: "ch1_cocina" },
            { text: "Ir al dormitorio", action: "ir_dormitorio", next: "ch1_dormitorio" },
            { text: "Bajar al sótano", action: "bajar_sotano", next: "ch1_sotano_start" },
            { text: "Mirar el cuadro torcido", action: "mirar_cuadro", reqFlag: "cuadro_visto_not", next: "ch1_cuadro" },
            { text: "Salir al porche", action: "abrir_puerta", reqFlag: "door_unlocked", next: "ch2_start" }
        ]
    },

    ch1_cuadro: {
        text: "Es una fotografía de las últimas vacaciones. La arena, el mar, una sonrisa perfectamente capturada. La enderezas. Estaba torcida desde ayer. 'Seguro que mañana la vuelven a torcer al pasar', piensas con firmeza.",
        setFlag: "cuadro_visto",
        choices: [{ text: "Volver", action: "volver", next: "ch1_pasillo" }]
    },

    // --- Sótano ---
    ch1_sotano_start: {
        text: "Bajas los escalones de madera que crujen bajo tu peso. El sótano está húmedo y lleno de cajas apiladas. Aquí abajo guardaron la ropa de invierno y viejos recuerdos.",
        sfx: "door",
        choices: [
            { text: "Revisar la caja de abrigos", action: "revisar_abrigos", next: "ch1_abrigos" },
            { text: "Buscar en el viejo baúl", action: "revisar_baul", next: "ch1_baul" },
            { text: "Volver arriba", action: "subir", next: "ch1_pasillo" }
        ]
    },
    ch1_abrigos: {
        text: "Sacas su abrigo de invierno. Lo abrazas y entierras el rostro en la tela. Aún conserva un levísimo olor a tabaco dulce y lluvia. El tiempo se detiene aquí abajo.",
        choices: [{ text: "Dejarlo con cuidado y apartarse", action: "dejar", next: "ch1_sotano_start" }]
    },
    ch1_baul: {
        text: "Abres el baúl oxidado. Dentro hay álbumes de fotos de hace décadas. Miras las páginas pasadas. Eran tan jóvenes. Todo parecía infinito. Cierras el baúl rápidamente antes de romperte.",
        achievement: { id: "pasado", title: "Polvo y Memoria", desc: "Escapaste hacia los recuerdos en el sótano." },
        choices: [{ text: "Volver arriba", action: "subir", next: "ch1_pasillo" }]
    },

    // --- Puerta Principal ---
    ch1_puerta: {
        text: "La puerta principal está cerrada con llave por dentro. Un frío helado se filtra por debajo de la madera. Te niegas a abrirla todavía. 'Si la abro, es real', piensas. Tienes que buscar por la casa primero. Asegurarte.",
        sfx: "door",
        choices: [
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" },
            { text: "Mirar por la mirilla", action: "mirar_mirilla", nextRng: ["ch1_mirilla_vacio", "ch1_mirilla_sombra", "ch1_mirilla_lluvia"] }
        ]
    },
    ch1_mirilla_vacio: {
        text: "Miras a través del pequeño cristal. La calle está desierta bajo la luz ámbar de la farola. Nadie viene.",
        choices: [{ text: "Apartarse", action: "apartarse", next: "ch1_puerta" }]
    },
    ch1_mirilla_sombra: {
        text: "Por un milisegundo, te pareció ver una silueta familiar doblando la esquina, pero parpadeas y solo queda la noche. El corazón te late a mil por hora.",
        choices: [{ text: "Dejar de mirar", action: "apartarse", next: "ch1_puerta" }]
    },
    ch1_mirilla_lluvia: {
        text: "Ha empezado a llover. Las gotas distorsionan la visión. Esperas ver los faros del coche acercándose, pero solo ves el reflejo del asfalto mojado.",
        choices: [{ text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }]
    },

    // --- Sala de Estar ---
    ch1_sala: {
        text: "La sala de estar huele a cerrado. Los cojines del sofá tienen la marca de alguien que estuvo sentado allí hace... ¿días? ¿Semanas? Te acercas lentamente a la mesa de centro.",
        choices: [
            { text: "Revisar el contestador automático", action: "revisar_telefono", next: "ch1_contestador" },
            { text: "Mirar la estantería de libros", action: "mirar_libros", next: "ch1_libros" },
            { text: "Encender el televisor", action: "encender_tv", next: "ch1_tv" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_contestador: {
        text: "Hay una luz roja parpadeando. Un mensaje nuevo. Tu dedo tiembla sobre el botón de 'Reproducir'.",
        choices: [
            { text: "Reproducir mensaje", action: "reproducir", nextRng: ["ch1_mensaje_estatica", "ch1_mensaje_voz"] },
            { text: "Ignorarlo", action: "ignorar", next: "ch1_sala" }
        ]
    },
    ch1_mensaje_estatica: {
        text: "[Bip]... Solo hay estática durante treinta segundos. Luego, el pitido de desconexión. Te convences de que la cobertura falló. Sí, solo fue eso.",
        sfx: "static",
        choices: [{ text: "Dejar el teléfono", action: "soltar", next: "ch1_sala" }]
    },
    ch1_mensaje_voz: {
        text: "[Bip]... 'Oye, soy Ana. Por favor, devuélveme la llamada en cuanto puedas... estamos todos muy preocupados...' Su voz se rompe al final. La rabia burbujea en tu pecho. ¿De qué se preocupa? Todo está bien.",
        sfx: "beep",
        choices: [{ text: "Borrar el mensaje", action: "borrar", next: "ch1_sala" }]
    },
    ch1_libros: {
        text: "Pasas los dedos por los lomos de los libros. Aquí hay un hueco. Faltan sus libros favoritos. O tal vez siempre estuvieron en la mesita de noche. Tienes que comprobarlo.",
        setFlag: "busqueda_iniciada",
        choices: [{ text: "Dejar la estantería", action: "apartarse", next: "ch1_sala" }]
    },
    ch1_tv: {
        text: "Pulsas el botón. Un documental sobre naturaleza a volumen muy bajo ilumina la habitación de azul. Te sientas en el sofá y miras la pantalla sin registrar absolutamente nada. Pasan 3 horas. Apagas la TV.",
        achievement: { id: "tv_zombie", title: "Ruido Blanco", desc: "Te perdiste en la televisión para no pensar." },
        choices: [{ text: "Levantarse del sofá", action: "levantarse", next: "ch1_sala" }]
    },

    // --- Cocina ---
    ch1_cocina: {
        text: "La luz fluorescente de la cocina parpadea. Hay dos tazas de café en el fregadero. Una tiene el fondo seco. La otra todavía conserva una mancha húmeda. La cotidianidad duele físicamente.",
        choices: [
            { text: "Abrir la nevera", action: "abrir_nevera", next: "ch1_nevera" },
            { text: "Mirar el calendario", action: "mirar_calendario", next: "ch1_calendario" },
            { text: "Coger las llaves de la casa", action: "coger_llaves", notReqItem: "Llaves de la Casa", next: "ch1_llaves" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_nevera: {
        text: "Casi vacía. Solo leche caducada y sobras en tuppers que nadie se va a comer. La luz interior ilumina tu rostro pálido reflejado en el cristal del horno opuesto.",
        choices: [{ text: "Cerrar", action: "cerrar", next: "ch1_cocina" }]
    },
    ch1_calendario: {
        text: "El calendario de pared está atascado en un mes que ya pasó. Hay una fecha marcada en rojo con la palabra 'Viaje'. Se suponía que...",
        choices: [{ text: "Apartar la vista rápido", action: "ignorar", next: "ch1_cocina" }]
    },
    ch1_llaves: {
        text: "Agarras el manojo de llaves que siempre colgaba junto a la puerta de la cocina. Sientes el metal frío. Quizás sí deberías mirar fuera.",
        item: "Llaves de la Casa",
        setFlag: "door_unlocked",
        choices: [{ text: "Guardarlas", action: "guardar", next: "ch1_cocina" }]
    },

    // --- Dormitorio ---
    ch1_dormitorio: {
        text: "El santuario. La cama está perfectamente hecha en un lado, y completamente desordenada en el otro. El olor a su perfume aún perdura, flotando como un fantasma en el aire estancado.",
        choices: [
            { text: "Revisar la mesita de noche", action: "revisar_mesita", reqFlag: "busqueda_iniciada", next: "ch1_mesita" },
            { text: "Mirar el armario", action: "abrir_armario", next: "ch1_armario" },
            { text: "Tumbarse en la cama", action: "tumbarse", next: "ch1_cama" },
            { text: "Revisar debajo de la cama", action: "mirar_abajo", next: "ch1_debajo" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_armario: {
        text: "Abres la puerta de madera chirriante. Su ropa sigue ahí. Suspendida en perchas como cascarones vacíos. El nudo en tu garganta amenaza con asfixiarte.",
        choices: [{ text: "Cerrar de golpe", action: "cerrar_fuerte", next: "ch1_dormitorio" }]
    },
    ch1_cama: {
        text: "Te hundes en el colchón del lado vacío. Hueles la almohada. Sí, todavía está aquí. Cierras los ojos y por un segundo, el mundo vuelve a ser normal.",
        choices: [{ text: "Levantarse forzosamente", action: "levantarse", next: "ch1_dormitorio" }]
    },
    ch1_debajo: {
        text: "Encuentras una zapatilla perdida. Solo una. La abrazas contra tu pecho y dejas escapar un sollozo ahogado que reprimes inmediatamente. 'No llores, no ha pasado nada', te engañas.",
        achievement: { id: "zapatilla", title: "Cenicienta Rota", desc: "Encontraste un fragmento de lo que fue." },
        choices: [{ text: "Dejar la zapatilla y levantarse", action: "levantarse", next: "ch1_dormitorio" }]
    },
    ch1_mesita: {
        text: "Abres el cajón de su mesita de noche. Allí están. Los libros que faltaban en la sala. Y debajo de ellos, encuentras un reloj de bolsillo, con el cristal astillado pero las manecillas intactas.",
        item: "Reloj Astillado",
        choices: [{ text: "Tomarlo", action: "coger_reloj", next: "ch1_dormitorio" }]
    },

    // ---------------------------------------------------------
    // CAPÍTULO II: CRISTALES Y CENIZAS
    // ---------------------------------------------------------
    ch2_start: {
        text: "Giras la llave y abres la puerta. El exterior no es el vecindario de siempre. Es un paisaje gris, cubierto de niebla y ceniza que cae lentamente. De repente, el muro de tu negación se rompe violentamente. Sabes que no volverá. Una furia volcánica se enciende en tus entrañas. ¡Te abandonó! ¡El universo te lo arrebató!",
        chapter: "Capítulo II: Cristales y Cenizas",
        isSavePoint: true,
        sfx: "door",
        choices: [
            { text: "Gritar al cielo", action: "gritar", next: "ch2_gritar" },
            { text: "Apretar el Reloj Astillado", action: "apretar_reloj", reqItem: "Reloj Astillado", next: "ch2_romper_reloj" },
            { text: "Caminar por la niebla", action: "caminar", next: "ch2_niebla" }
        ]
    },
    ch2_gritar: {
        text: "Tus pulmones queman mientras lanzas un aullido de rabia pura contra el horizonte mudo. La niebla parece tragar el sonido. No hay eco. No hay respuesta. Estás absolutamente solo/a, y eso te enfurece aún más.",
        choices: [{ text: "Adentrarse en la niebla", action: "caminar", next: "ch2_niebla" }]
    },
    ch2_romper_reloj: {
        text: "Aprietas el reloj astillado en tu bolsillo hasta que el cristal cede y te corta la palma. El dolor físico te ancla a la realidad. Extrañamente, disfrutas del escozor. Te hace sentir vivo en este mundo muerto.",
        item: "Mano Ensangrentada",
        choices: [{ text: "Caminar dejando un rastro", action: "caminar", next: "ch2_niebla" }]
    },
    ch2_niebla: {
        text: "Caminas ciegamente. Tropezando con rocas afiladas. El aire huele a humo. A lo lejos, ves la silueta de un coche abandonado y oxidado.",
        choices: [
            { text: "Acercarse al coche", action: "ir_coche", next: "ch2_coche" },
            { text: "Ignorarlo y seguir buscando", action: "ignorar", next: "ch2_paramo" }
        ]
    },
    ch2_coche: {
        text: "El coche está destrozado. Un recuerdo de un viaje se cruza por tu mente, pero es opacado por la rabia. Agarras una piedra pesada del suelo.",
        choices: [
            { text: "Reventar la ventanilla con la piedra", action: "romper_cristal", next: "ch2_coche_roto" },
            { text: "Dejar caer la piedra", action: "soltar", next: "ch2_paramo" }
        ]
    },
    ch2_coche_roto: {
        text: "¡CRASH! Golpeas el cristal hasta que cede. Sigues golpeando el capó y la puerta, abollándolos. Gritas con cada impacto hasta que te quedas sin aire. La ira destructiva se apodera de ti.",
        sfx: "shatter",
        achievement: { id: "destruccion", title: "Cólera Metálica", desc: "Desataste tu ira en el coche." },
        choices: [{ text: "Caminar lejos de los restos", action: "caminar", next: "ch2_paramo" }]
    },
    ch2_paramo: {
        text: "Sigues vagando por el gris. A lo lejos, ves figuras que parecen tus conocidos o vecinos, pero no tienen rostro. Simplemente te señalan o murmuran.",
        choices: [
            { text: "Gritarles que se alejen", action: "gritar_vecinos", next: "ch2_vecinos" },
            { text: "Correr hacia el bosque oscuro", action: "correr", next: "ch2_bosque" }
        ]
    },
    ch2_vecinos: {
        text: "'¡DEJADME EN PAZ! ¡NO NECESITO VUESTRA LÁSTIMA!', ruges. Las figuras se deshacen en ceniza y viento. Odiar a los demás es más fácil que aceptar tu propia impotencia.",
        achievement: { id: "aislamiento", title: "Muros de Fuego", desc: "Alejaste a quienes intentaban acercarse." },
        choices: [{ text: "Avanzar", action: "avanzar", next: "ch2_espejo" }]
    },
    ch2_bosque: {
        text: "Corres hacia los árboles retorcidos para esconderte de todos. Las ramas arañan tu rostro, pero no sientes nada. Quieres que el mundo entero desaparezca.",
        choices: [{ text: "Avanzar a trompicones", action: "avanzar", next: "ch2_espejo" }]
    },
    ch2_espejo: {
        text: "De repente, un claro en la niebla. Encuentras un inmenso espejo de pie en medio de la nada. Tu reflejo está demacrado, furioso, patético. Representa todo lo que odias de ti mismo ahora.",
        choices: [
            { text: "Golpear tu propio reflejo", action: "golpear", next: "ch2_espejo_roto" },
            { text: "Mirarte a los ojos fijamente", action: "mirar", next: "ch2_espejo_intacto" }
        ]
    },
    ch2_espejo_roto: {
        text: "Tiras un puñetazo con todas tus fuerzas. El espejo estalla en mil pedazos reflectantes. Tu imagen se fractura. Entre los cristales caídos en el barro, ves algo brillando.",
        setFlag: "ira_desatada",
        sfx: "shatter",
        achievement: { id: "espejo", title: "Siete Años de Mala Suerte", desc: "La ira te llevó a romper el cristal." },
        choices: [{ text: "Recoger el trozo de cristal más afilado", action: "coger_cristal", next: "ch3_start" }]
    },
    ch2_espejo_intacto: {
        text: "Te quedas mirando. Lloras de rabia. Tiemblas, pero no golpeas el cristal. La ira se consume lentamente como una hoguera bajo la lluvia, dejándote exhausto y desesperado.",
        choices: [{ text: "Tocar el espejo suavemente y dejarlo", action: "tocar", next: "ch3_start" }]
    },

    // ---------------------------------------------------------
    // CAPÍTULO III: EL RELOJ DE ARENA INVERTIDO
    // ---------------------------------------------------------
    ch3_start: {
        text: "El espejo se desvanece y la niebla se disipa revelando un inmenso páramo de barro reseco. Caes de rodillas. El fuego de la ira te ha abandonado. Ahora, la mente busca una salida frenética, una laguna legal en las reglas de la realidad. 'Si hago esto de manera perfecta, quizá...'",
        chapter: "Capítulo III: El Reloj de Arena Invertido",
        isSavePoint: true,
        choices: [
            { text: "Empezar a rezar a cualquier dios", action: "rezar", next: "ch3_rezar" },
            { text: "Hacer un altar con los cristales", action: "altar", reqFlag: "ira_desatada", next: "ch3_altar" },
            { text: "Dibujar un espiral en la tierra", action: "dibujar", next: "ch3_simbolos" },
            { text: "Buscar ofrendas en el suelo", action: "buscar", nextRng: ["ch3_encuentro1", "ch3_encuentro2", "ch3_encuentro3"] }
        ]
    },
    ch3_rezar: {
        text: "'Lo daré todo', susurras frenéticamente al cielo vacío. 'Quítame mis piernas, mis recuerdos, lo que quieras. Solo devuélveme al día antes de que ocurriera. Prometo ser la mejor persona del mundo. Nunca discutiré de nuevo.'",
        choices: [{ text: "Esperar un milagro", action: "esperar", next: "ch3_delirio" }]
    },
    ch3_altar: {
        text: "Empiezas a amontonar los trozos de espejo, intentando reconstruir compulsivamente la imagen rota como si fuera un rompecabezas mágico. 'Si logro arreglarlo, si encaja perfectamente, el tiempo volverá a fluir hacia atrás'.",
        achievement: { id: "alquimia", title: "Alquimia Inútil", desc: "Intentaste revertir lo irreversible." },
        choices: [{ text: "Unir las piezas ensangrentadas", action: "unir", next: "ch3_delirio" }]
    },
    ch3_simbolos: {
        text: "Trazas círculos y líneas complejas en el barro con tus dedos hasta que las uñas se rompen. Piensas que si dibujas la casa tal como era con suficiente detalle, el universo entenderá su error y te devolverá al pasado.",
        choices: [{ text: "Seguir dibujando compulsivamente", action: "dibujar", next: "ch3_delirio" }]
    },
    ch3_encuentro1: {
        text: "Escarbando en el barro gris, encuentras un billete de tren. El billete del viaje que nunca hicieron. Una punzada de '¿Y si hubiéramos ido antes?' te atraviesa el corazón como un clavo ardiente.",
        item: "Billete de Tren",
        choices: [{ text: "Cerrar el puño sobre el billete", action: "apretar", next: "ch3_delirio" }]
    },
    ch3_encuentro2: {
        text: "Encuentras un anillo oxidado en el barro. No es el suyo, pero representa todas las promesas que no se podrán cumplir. La mente juega contigo: 'Si me pongo esto en el dedo correcto, romperé el hechizo'.",
        item: "Anillo Oxidado",
        choices: [{ text: "Ponerte el anillo oxidado", action: "poner", next: "ch3_delirio" }]
    },
    ch3_encuentro3: {
        text: "Desentierras un viejo peluche o juguete rasgado. Te agarras a él como un salvavidas náufrago. 'Te cambio esto por ellos', ofreces al cielo infinito en un llanto infantil.",
        item: "Juguete Roto",
        choices: [{ text: "Ofrecerlo al cielo", action: "ofrecer", next: "ch3_delirio" }]
    },
    ch3_delirio: {
        text: "Por un instante, crees escuchar una voz detrás de ti. Giras la cabeza violentamente. Te parece ver una puerta abriéndose en medio de la nada.",
        choices: [
            { text: "Correr hacia la puerta ilusoria", action: "correr", next: "ch3_silencio" },
            { text: "Quedarse quieto y no dejarse engañar", action: "esperar", next: "ch3_silencio" }
        ]
    },
    ch3_silencio: {
        text: "La puerta no existe. No pasa nada. El tiempo no retrocede. El universo es monumentalmente indiferente a tus promesas, a tu sangre y a tus tratos mágicos. La aplastante verdad matemática de que no volverán se cierne sobre ti.",
        choices: [
            { text: "Dejar caer los brazos (Aceptar la derrota)", action: "rendirse", next: "ch4_start" }
        ]
    },

    // ---------------------------------------------------------
    // CAPÍTULO IV: LA GRAVEDAD DEL VACÍO
    // ---------------------------------------------------------
    ch4_start: {
        text: "El páramo se oscurece rápidamente hasta volverse negro puro. Ya no hay rabia. Ya no hay negociaciones frenéticas. Solo hay un agujero inmenso, pesado y frío en tu pecho. Las piernas te fallan. La gravedad aquí parece estar multiplicada por diez.",
        chapter: "Capítulo IV: La Gravedad del Vacío",
        itemRemoveAll: true,
        isSavePoint: true,
        choices: [
            { text: "Dejarse caer al suelo frío", action: "caer", next: "ch4_suelo" }
        ]
    },
    ch4_suelo: {
        text: "Te recuestas. La oscuridad es total. No hay diferencia entre tener los ojos abiertos o cerrados. Sientes que ya no existes como individuo. Todo carece de sentido. El simple acto de respirar es un esfuerzo inútil.",
        choices: [
            { text: "Dormir", action: "dormir", nextRng: ["ch4_sueno_feliz", "ch4_sueno_caida", "ch4_sueno_laberinto", "ch4_sueno_estacion", "ch4_sueno_silencio"] },
            { text: "Dejar que el tiempo pase", action: "esperar", next: "ch4_tiempo" }
        ]
    },
    ch4_tiempo: {
        text: "Pasan horas. O tal vez meses. Sientes que el polvo se acumula sobre tu piel. Te estás fusionando con el suelo oscuro. Eres una mancha más en el vacío interminable.",
        choices: [
            { text: "Intentar mover un dedo", action: "mover", next: "ch4_esfuerzo" },
            { text: "Seguir hundiéndote", action: "hundir", next: "ch4_suelo" }
        ]
    },
    ch4_sueno_feliz: {
        text: "Sueñas que están juntos de nuevo, riendo en el sofá como antes. De repente despiertas, y el contraste con la fría realidad te arranca el aire de los pulmones. Lloras hasta secarte por completo.",
        setFlag: "sueno_1",
        choices: [{ text: "Volver al vacío oscuro", action: "despertar", next: "ch4_suelo_2" }]
    },
    ch4_sueno_caida: {
        text: "Sueñas que caes por un abismo interminable a cámara lenta. No gritas, simplemente aceptas la caída sin fin. Despiertas en el mismo abismo oscuro del que no puedes escapar.",
        setFlag: "sueno_2",
        choices: [{ text: "Volver al vacío oscuro", action: "despertar", next: "ch4_suelo_2" }]
    },
    ch4_sueno_laberinto: {
        text: "Sueñas que corres por los pasillos de un hospital de azulejos blancos buscando su habitación, pero todas las puertas están bloqueadas y no tienen manija. Despiertas sudando frío.",
        setFlag: "sueno_3",
        choices: [{ text: "Volver al vacío oscuro", action: "despertar", next: "ch4_suelo_2" }]
    },
    ch4_sueno_estacion: {
        text: "Sueñas que estás en una estación de tren envuelta en bruma. Ellos suben a un vagón y tú te quedas en el andén de piedra. El tren se marcha sin hacer ruido. Despiertas con una extraña paz melancólica.",
        setFlag: "sueno_4",
        choices: [{ text: "Volver al vacío oscuro", action: "despertar", next: "ch4_suelo_2" }]
    },
    ch4_sueno_silencio: {
        text: "No sueñas nada. Solo hay estática y vacío durante siglos. Despiertas y ni siquiera sabes qué día es.",
        setFlag: "sueno_5",
        choices: [{ text: "Volver al vacío oscuro", action: "despertar", next: "ch4_suelo_2" }]
    },
    ch4_suelo_2: {
        text: "El letargo continúa. Estás exhausto/a. Estás vacío/a. Has tocado el fondo más absoluto del abismo humano. Y en ese fondo frío, tu mano toca algo increíblemente sólido.",
        item: "Piedra Pesada",
        achievement: { id: "fondo", title: "El Fondo", desc: "Te dejaste caer por completo en la depresión y sobreviviste." },
        choices: [
            { text: "Palpar la piedra", action: "tocar", next: "ch5_start" },
            { text: "Ignorarla y seguir durmiendo", action: "dormir", next: "ch4_suelo" }
        ]
    },
    ch4_esfuerzo: {
        text: "Mueves un dedo. Duele horrores. La gravedad intenta aplastarte, pero una minúscula chispa de terquedad animal se niega a apagarse del todo. Al arrastrar la mano por el suelo, tocas una piedra redonda y extraordinariamente densa.",
        item: "Piedra Pesada",
        choices: [
            { text: "Agarrar la piedra con fuerza", action: "agarrar", next: "ch5_start" }
        ]
    },

    // ---------------------------------------------------------
    // CAPÍTULO V: EL PESO DE LA PIEDRA
    // ---------------------------------------------------------
    ch5_start: {
        text: "Agarras la Piedra Pesada. Es helada. Es inmensa. Entiendes en el fondo de tu alma lo que es: es el dolor mismo condensado. Es la ausencia. Y te das cuenta de una verdad aterradora y liberadora al mismo tiempo: esta piedra no va a desaparecer jamás.",
        chapter: "Capítulo V: El Peso de la Piedra",
        isSavePoint: true,
        choices: [
            { text: "Intentar lanzar la piedra lejos", action: "lanzar", next: "ch5_rechazo" },
            { text: "Abrazar la piedra contra tu pecho", action: "abrazar", next: "ch5_abrazo" }
        ]
    },
    ch5_rechazo: {
        text: "Con todas tus escasas fuerzas, intentas tirarla, pero es demasiado pesada y vuelve a caer a tus pies, sacudiendo el suelo con un estruendo.",
        sfx: "door",
        choices: [{ text: "Aceptar que debes cargarla", action: "levantar", next: "ch5_abrazo" }]
    },
    ch5_abrazo: {
        text: "Aceptas el peso. Es tuyo. Te pertenece. La levantas con ambas manos, sosteniéndola contra tu pecho. Tus piernas tiemblan violentamente, pero te apoyas en la dura superficie del suelo. Empujas.",
        choices: [
            { text: "Levantarte sobre tus rodillas", action: "rodillas", next: "ch5_levantando" }
        ]
    },
    ch5_levantando: {
        text: "Estás de rodillas. El peso de la piedra amenaza con devolverte al suelo negro. Te falta el aire. Cierras los ojos por el esfuerzo. Pero, extrañamente, ahora que has aceptado llevarla, la oscuridad alrededor empieza a resquebrajarse, mostrando rayos de luz pálida y azul.",
        choices: [
            { text: "Hacer un esfuerzo final y ponerte de pie", action: "de_pie", next: "ch5_escalon" }
        ]
    },
    ch5_escalon: {
        text: "Estás de pie. Tu columna soporta el peso atroz. Aparece ante ti una inmensa escalera de piedra labrada en la roca, que asciende hacia una niebla dorada iluminada por el sol. Sabes que subir con esta carga será el mayor suplicio de tu vida.",
        choices: [
            { text: "Dar el primer paso hacia arriba", action: "subir", next: "ch5_subiendo_1" }
        ]
    },
    ch5_subiendo_1: {
        text: "Primeros diez escalones. El dolor quema como ácido en tus brazos y pantorrillas. Cada paso hacia arriba trae un recuerdo punzante. Una lágrima resbala por tu mejilla, pero no te detienes.",
        choices: [{ text: "Continuar ascendiendo paso a paso", action: "subir", next: "ch5_resbalo" }]
    },
    ch5_resbalo: {
        text: "Tus botas resbalan en un escalón húmedo. La piedra pesada se tambalea y tira de ti hacia atrás. El abismo negro de la depresión bosteza bajo tus pies de nuevo.",
        choices: [
            { text: "Aferrarse a la piedra con la vida", action: "agarrar", next: "ch5_subiendo_2" },
            { text: "Cerrar los ojos y equilibrarse", action: "equilibrar", next: "ch5_subiendo_2" }
        ]
    },
    ch5_subiendo_2: {
        text: "Logras recuperar el equilibrio. A mitad de camino. La niebla empieza a despejarse revelando el cielo. Curiosamente, notas algo fascinante: la piedra no se ha vuelto más ligera... pero tus músculos se han vuelto más fuertes. Ya no te arrastra, te acompaña.",
        achievement: { id: "fuerza", title: "Carga Compartida", desc: "Aprendiste a cargar con el dolor. Te hiciste más fuerte." },
        choices: [{ text: "Avanzar los últimos metros hacia la luz", action: "subir_cima", next: "ch6_start" }]
    },

    // ---------------------------------------------------------
    // EPÍLOGO: EL HORIZONTE
    // ---------------------------------------------------------
    ch6_start: {
        text: "Llegas a la meseta en la cima de la montaña. Dejas la piedra pesada suavemente a tu lado. Ya no la abrazas, pero sabes que siempre estará ahí. Tus pulmones se llenan de aire frío.",
        chapter: "Epílogo: El Horizonte",
        theme: "transcendence",
        isSavePoint: true,
        sfx: "door",
        choices: [
            { text: "Levantar la cabeza y mirar", action: "mirar_horizonte", next: "ch6_mirar" }
        ]
    },
    ch6_mirar: {
        text: "El paisaje frente a ti es de una belleza aplastante y humilde. Un amanecer vasto de colores dorados, violetas y azules pinta el mundo entero. Las nubes se rompen debajo de ti. El viento de la mañana seca el sudor y tus últimas lágrimas.",
        choices: [
            { text: "Tomar aire profundamente", action: "respirar", next: "ending" }
        ]
    },
    ending: {
        text: "Exhalas lentamente. Ves el mundo girar, enorme, hermoso, caótico y terrible a la vez. No has olvidado. Nunca olvidarás. Esa piedra siempre será tuya. Pero el paisaje... el paisaje sigue siendo precioso y tú, a pesar de todo, estás vivo para verlo.\n\nSigues aquí. Sigues respirando.\n\nFIN.",
        achievement: { id: "respirar", title: "Respirar", desc: "Completaste la ascensión." },
        choices: [
            { text: "Ver créditos", action: "creditos", next: "credits" }
        ]
    },
    credits: {
        text: "Gracias por jugar a 'El Ascenso'.\n\nDesarrollado para quienes han perdido algo o a alguien.\nEl duelo es como llevar una piedra pesada en el bolsillo: al principio pesa tanto que no puedes caminar, con el tiempo te acostumbras a su peso, y aunque nunca desaparece, tus piernas se vuelven lo suficientemente fuertes para subir montañas.\n\n(Puedes volver al menú principal para iniciar un nuevo viaje).",
        choices: []
    }
};
