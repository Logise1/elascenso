const storyNodes = {
    // ---------------------------------------------------------
    // CAPÍTULO I: LA HABITACIÓN DEL ECO
    // ---------------------------------------------------------
    ch1_start: {
        text: "El reloj de pared marca las 3:00 AM, pero jurarías que las manecillas no se han movido en horas. La casa está sumida en un silencio tan espeso que zumba en tus oídos. Estás de pie en el pasillo central. Alguien falta.",
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
        text: "Es una fotografía de las últimas vacaciones. La arena, el mar, una sonrisa perfectamente capturada. La enderezas. Estaba torcida desde ayer.",
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
        text: "Sacas su abrigo de invierno. Lo abrazas y entierras el rostro en la tela. Aún conserva un levísimo olor a tabaco dulce y lluvia.",
        choices: [{ text: "Dejarlo con cuidado", action: "dejar", next: "ch1_sotano_start" }]
    },
    ch1_baul: {
        text: "Abres el baúl oxidado. Dentro hay álbumes de fotos de hace décadas. Miras las páginas pasadas. Eran tan jóvenes. Cierras el baúl rápidamente antes de romperte.",
        achievement: { id: "pasado", title: "Polvo y Memoria", desc: "Escapaste hacia los recuerdos en el sótano." },
        choices: [{ text: "Volver arriba", action: "subir", next: "ch1_pasillo" }]
    },

    // --- Puerta Principal ---
    ch1_puerta: {
        text: "La puerta principal está cerrada con llave por dentro. Un frío helado se filtra por debajo de la madera.",
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
        text: "Por un milisegundo, te pareció ver una silueta familiar doblando la esquina, pero parpadeas y solo queda la noche.",
        choices: [{ text: "Dejar de mirar", action: "apartarse", next: "ch1_puerta" }]
    },
    ch1_mirilla_lluvia: {
        text: "Ha empezado a llover. Las gotas distorsionan la visión. Esperas ver faros acercándose, pero solo ves el reflejo del asfalto.",
        choices: [{ text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }]
    },

    // --- Sala de Estar ---
    ch1_sala: {
        text: "La sala de estar huele a cerrado. Te acercas lentamente a la mesa de centro.",
        choices: [
            { text: "Revisar el contestador", action: "revisar_telefono", next: "ch1_contestador" },
            { text: "Mirar la estantería", action: "mirar_libros", next: "ch1_libros" },
            { text: "Encender el televisor", action: "encender_tv", next: "ch1_tv" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_contestador: {
        text: "Hay una luz roja parpadeando. Un mensaje nuevo.",
        choices: [
            { text: "Reproducir mensaje", action: "reproducir", nextRng: ["ch1_mensaje_estatica", "ch1_mensaje_voz"] },
            { text: "Ignorarlo", action: "ignorar", next: "ch1_sala" }
        ]
    },
    ch1_mensaje_estatica: {
        text: "[Bip]... Solo hay estática durante treinta segundos. Luego, el pitido de desconexión.",
        sfx: "static",
        choices: [{ text: "Dejar el teléfono", action: "soltar", next: "ch1_sala" }]
    },
    ch1_mensaje_voz: {
        text: "[Bip]... 'Oye, soy Ana. Por favor, devuélveme la llamada en cuanto puedas...' Su voz se rompe.",
        sfx: "beep",
        choices: [{ text: "Borrar el mensaje", action: "borrar", next: "ch1_sala" }]
    },
    ch1_libros: {
        text: "Pasas los dedos por los lomos de los libros. Aquí hay un hueco. Faltan sus libros favoritos.",
        setFlag: "busqueda_iniciada",
        choices: [{ text: "Apartarse", action: "apartarse", next: "ch1_sala" }]
    },
    ch1_tv: {
        text: "Pulsas el botón. Un documental sobre naturaleza a volumen muy bajo. Pasan 3 horas en estado de shock. Apagas la TV.",
        achievement: { id: "tv_zombie", title: "Ruido Blanco", desc: "Te perdiste en la televisión para no pensar." },
        choices: [{ text: "Levantarse", action: "levantarse", next: "ch1_sala" }]
    },

    // --- Cocina ---
    ch1_cocina: {
        text: "La luz fluorescente parpadea. Hay dos tazas de café en el fregadero.",
        choices: [
            { text: "Abrir la nevera", action: "abrir_nevera", next: "ch1_nevera" },
            { text: "Mirar el calendario", action: "mirar_calendario", next: "ch1_calendario" },
            { text: "Coger las llaves", action: "coger_llaves", notReqItem: "Llaves de la Casa", next: "ch1_llaves" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_nevera: {
        text: "Casi vacía. Solo leche caducada.",
        choices: [{ text: "Cerrar", action: "cerrar", next: "ch1_cocina" }]
    },
    ch1_calendario: {
        text: "El calendario marca un mes pasado. Hay una fecha rodeada con un círculo rojo: el día {{safeCode}}. Te lo anotas mentalmente.",
        setFlag: "conoce_fecha",
        choices: [{ text: "Apartar la vista", action: "ignorar", next: "ch1_cocina" }]
    },
    ch1_llaves: {
        text: "Agarras el manojo de llaves que siempre colgaba junto a la puerta.",
        item: "Llaves de la Casa",
        setFlag: "door_unlocked",
        choices: [{ text: "Guardarlas", action: "guardar", next: "ch1_cocina" }]
    },

    // --- Dormitorio & Minijuego Caja Fuerte ---
    ch1_dormitorio: {
        text: "El santuario. La cama está perfectamente hecha en un lado, y completamente desordenada en el otro.",
        choices: [
            { text: "Revisar la mesita de noche", action: "revisar_mesita", reqFlag: "busqueda_iniciada", next: "ch1_mesita" },
            { text: "Revisar la caja fuerte del armario", action: "mirar_caja", next: "ch1_caja_fuerte" },
            { text: "Tumbarse en la cama", action: "tumbarse", next: "ch1_cama" },
            { text: "Revisar debajo de la cama", action: "mirar_abajo", next: "ch1_debajo" },
            { text: "Volver al pasillo", action: "volver", next: "ch1_pasillo" }
        ]
    },
    ch1_cama: {
        text: "Te hundes en el colchón del lado vacío. Hueles la almohada. Cierras los ojos.",
        choices: [{ text: "Levantarse forzosamente", action: "levantarse", next: "ch1_dormitorio" }]
    },
    ch1_debajo: {
        text: "Encuentras una zapatilla perdida. Solo una. La abrazas contra tu pecho.",
        achievement: { id: "zapatilla", title: "Cenicienta Rota", desc: "Encontraste un fragmento de lo que fue." },
        choices: [{ text: "Levantarse", action: "levantarse", next: "ch1_dormitorio" }]
    },
    ch1_mesita: {
        text: "Abres el cajón de su mesita de noche. Encuentras un reloj de bolsillo, con el cristal astillado.",
        item: "Reloj Astillado",
        choices: [{ text: "Tomarlo", action: "coger_reloj", next: "ch1_dormitorio" }]
    },
    ch1_caja_fuerte: {
        text: "Te arrodillas frente al armario. La caja fuerte digital pide un código de 2 dígitos. ¿Cuál era el día importante marcado en el calendario? (Escribe el número y dale a Enviar)",
        inputType: "text",
        expectedInputVar: "safeCode",
        inputSuccessNext: "ch1_caja_win",
        inputFailNext: "ch1_caja_fail",
        choices: [
            { text: "Dejarla", action: "dejar", next: "ch1_dormitorio" }
        ]
    },
    ch1_caja_fail: {
        text: "[BIP BIP] Código incorrecto. La memoria te falla.",
        sfx: "beep",
        choices: [{ text: "Volver a intentar", action: "intentar", next: "ch1_caja_fuerte" }]
    },
    ch1_caja_win: {
        text: "¡CLACK! La caja fuerte se abre. Dentro encuentras una vieja carta sin abrir. Decides guardarla en tu bolsillo sin leerla todavía.",
        item: "Carta Cerrada",
        sfx: "door",
        achievement: { id: "caja_fuerte", title: "Secretos Guardados", desc: "Abriste la caja fuerte del dormitorio." },
        choices: [{ text: "Cerrar la caja", action: "cerrar", next: "ch1_dormitorio" }]
    },

    // ---------------------------------------------------------
    // CAPÍTULO II: CRISTALES Y CENIZAS (IRA)
    // ---------------------------------------------------------
    ch2_start: {
        text: "Giras la llave y abres la puerta. El exterior no es el vecindario de siempre. Es un paisaje gris, cubierto de niebla y ceniza. El muro de tu negación se rompe violentamente. ¡El universo te lo arrebató!",
        chapter: "Capítulo II: Cristales y Cenizas",
        isSavePoint: true,
        sfx: "door",
        choices: [
            { text: "Gritar al cielo", action: "gritar", next: "ch2_gritar" },
            { text: "Apretar el Reloj Astillado", action: "apretar_reloj", reqItem: "Reloj Astillado", next: "ch2_romper_reloj" },
            { text: "Adentrarte en el bosque de niebla", action: "caminar", next: "ch2_niebla_1" }
        ]
    },
    ch2_gritar: {
        text: "Tus pulmones queman mientras lanzas un aullido de rabia pura contra el horizonte.",
        choices: [{ text: "Adentrarse en el bosque", action: "caminar", next: "ch2_niebla_1" }]
    },
    ch2_romper_reloj: {
        text: "Aprietas el reloj astillado hasta que el cristal cede y te corta la palma. El dolor te ancla a la realidad.",
        item: "Mano Ensangrentada",
        choices: [{ text: "Caminar por el bosque", action: "caminar", next: "ch2_niebla_1" }]
    },
    
    // Minijuego Laberinto de Niebla
    ch2_niebla_1: {
        text: "La niebla es tan espesa que apenas ves tus propios pies. Tienes que salir del bosque. Escuchas el crujir de ramas secas a tu izquierda y un sordo sonido de agua a tu derecha.",
        choices: [
            { text: "Ir hacia el crujido (Izquierda)", action: "ir_izq", next: "ch2_niebla_fail" },
            { text: "Ir hacia el agua (Derecha)", action: "ir_der", next: "ch2_niebla_2" },
            { text: "Avanzar recto", action: "ir_recto", next: "ch2_niebla_fail" }
        ]
    },
    ch2_niebla_fail: {
        text: "Caminaste en círculos. La niebla se ríe de ti. Acabas exactamente en el mismo punto de partida del bosque.",
        choices: [{ text: "Volver a intentar", action: "intentar", next: "ch2_niebla_1" }]
    },
    ch2_niebla_2: {
        text: "Llegas a un riachuelo seco. Ahora escuchas un búho ulular de frente, y el sonido del viento helado a tu izquierda.",
        choices: [
            { text: "Ir hacia el viento (Izquierda)", action: "ir_izq", next: "ch2_niebla_3" },
            { text: "Ir hacia el búho (Recto)", action: "ir_recto", next: "ch2_niebla_fail" },
            { text: "Cruzar el riachuelo (Derecha)", action: "ir_der", next: "ch2_niebla_fail" }
        ]
    },
    ch2_niebla_3: {
        text: "El aire se vuelve más claro. Ves una luz roja parpadeante a la derecha y una figura sombría de pie a la izquierda.",
        choices: [
            { text: "Ir hacia la figura (Izquierda)", action: "ir_izq", next: "ch2_vecinos" },
            { text: "Ir hacia la luz roja (Derecha)", action: "ir_der", next: "ch2_coche" }
        ]
    },
    
    ch2_coche: {
        text: "¡Lograste salir del laberinto! La luz roja pertenece a un coche abandonado y oxidado en el barro.",
        achievement: { id: "laberinto", title: "Navegante de la Bruma", desc: "Superaste el laberinto de niebla." },
        choices: [
            { text: "Reventar la ventanilla con una piedra", action: "romper_cristal", next: "ch2_coche_roto" },
            { text: "Ignorarlo y avanzar", action: "avanzar", next: "ch2_espejo" }
        ]
    },
    ch2_coche_roto: {
        text: "¡CRASH! Golpeas el cristal hasta que cede. La ira destructiva se apodera de ti.",
        sfx: "shatter",
        achievement: { id: "destruccion", title: "Cólera Metálica", desc: "Desataste tu ira en el coche." },
        choices: [{ text: "Caminar lejos", action: "caminar", next: "ch2_espejo" }]
    },
    ch2_vecinos: {
        text: "La figura resulta ser un ente sin rostro que murmura juicios. '¡DEJADME EN PAZ!', ruges, y el ente se desvanece.",
        achievement: { id: "aislamiento", title: "Muros de Fuego", desc: "Alejaste a quienes intentaban acercarse." },
        choices: [{ text: "Avanzar", action: "avanzar", next: "ch2_espejo" }]
    },
    ch2_espejo: {
        text: "Llegas a un claro. Encuentras un inmenso espejo de pie. Tu reflejo está demacrado, furioso. Representa todo lo que odias.",
        choices: [
            { text: "Golpear tu propio reflejo", action: "golpear", next: "ch2_espejo_roto" },
            { text: "Mirarte a los ojos fijamente", action: "mirar", next: "ch2_espejo_intacto" }
        ]
    },
    ch2_espejo_roto: {
        text: "Tiras un puñetazo. El espejo estalla en pedazos. Entre los cristales caídos en el barro, ves algo brillando.",
        setFlag: "ira_desatada",
        sfx: "shatter",
        achievement: { id: "espejo", title: "Siete Años de Mala Suerte", desc: "La ira te llevó a romper el cristal." },
        choices: [{ text: "Recoger el trozo de cristal más afilado", action: "coger_cristal", next: "ch3_start" }]
    },
    ch2_espejo_intacto: {
        text: "Te quedas mirando. Lloras de rabia, pero no golpeas el cristal. La ira se consume lentamente dejándote exhausto.",
        choices: [{ text: "Tocar el espejo y dejarlo", action: "tocar", next: "ch3_start" }]
    },

    // ---------------------------------------------------------
    // CAPÍTULO III: EL RELOJ DE ARENA INVERTIDO (NEGOCIACIÓN)
    // ---------------------------------------------------------
    ch3_start: {
        text: "El páramo se extiende, vacío. Caes de rodillas. El fuego de la ira te ha abandonado. Ahora, buscas una laguna legal en las reglas de la realidad. 'Si hago esto perfecto, quizá...'",
        chapter: "Capítulo III: El Reloj de Arena Invertido",
        isSavePoint: true,
        choices: [
            { text: "Hacer un altar con los cristales", action: "altar", reqFlag: "ira_desatada", next: "ch3_altar" },
            { text: "Dibujar un espiral en la tierra", action: "dibujar", next: "ch3_simbolos" },
            { text: "Abrir la Carta Cerrada", action: "abrir_carta", reqItem: "Carta Cerrada", next: "ch3_leer_carta" },
            { text: "Buscar ofrendas en el suelo", action: "buscar", nextRng: ["ch3_encuentro1", "ch3_encuentro2"] }
        ]
    },
    ch3_leer_carta: {
        text: "Rompes el sobre. Es una nota escrita a mano de hace meses: 'Pase lo que pase, no te culpes. Te quiero'. Las palabras te atraviesan el pecho.",
        achievement: { id: "carta_leida", title: "Palabras Póstumas", desc: "Leíste la carta de la caja fuerte." },
        choices: [{ text: "Apretar la carta contra tu pecho", action: "llorar", next: "ch3_delirio" }]
    },
    ch3_altar: {
        text: "Empiezas a amontonar los trozos de espejo, intentando reconstruir la imagen rota. 'Si encaja perfectamente, el tiempo volverá a fluir hacia atrás'.",
        achievement: { id: "alquimia", title: "Alquimia Inútil", desc: "Intentaste revertir lo irreversible." },
        choices: [{ text: "Unir las piezas", action: "unir", next: "ch3_delirio" }]
    },
    ch3_simbolos: {
        text: "Trazas círculos complejos en el barro hasta que las uñas te sangran.",
        choices: [{ text: "Seguir dibujando compulsivamente", action: "dibujar", next: "ch3_delirio" }]
    },
    ch3_encuentro1: {
        text: "Encuentras un billete de tren del viaje que nunca hicieron. Una punzada dolorosa.",
        item: "Billete de Tren",
        choices: [{ text: "Apretar el billete", action: "apretar", next: "ch3_delirio" }]
    },
    ch3_encuentro2: {
        text: "Encuentras un juguete rasgado. Te agarras a él como un salvavidas.",
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
        text: "La puerta no existe. No pasa nada. El tiempo no retrocede. El universo es monumentalmente indiferente a tus promesas.",
        choices: [
            { text: "Dejar caer los brazos (Aceptar la derrota)", action: "rendirse", next: "ch4_start" }
        ]
    },

    // ---------------------------------------------------------
    // CAPÍTULO IV: LA GRAVEDAD DEL VACÍO (DEPRESIÓN)
    // ---------------------------------------------------------
    ch4_start: {
        text: "El páramo se oscurece hasta volverse negro puro. Las piernas te fallan. La gravedad aquí parece estar multiplicada por diez.",
        chapter: "Capítulo IV: La Gravedad del Vacío",
        itemRemoveAll: true,
        isSavePoint: true,
        choices: [
            { text: "Dejarse caer al suelo", action: "caer", next: "ch4_suelo" }
        ]
    },
    ch4_suelo: {
        text: "La oscuridad es total. No hay diferencia entre tener los ojos abiertos o cerrados. De repente, una Sombra (una parte de tu mente) empieza a susurrarte.",
        choices: [
            { text: "Escuchar a la Sombra", action: "escuchar", next: "ch4_ataque_1" }
        ]
    },
    
    // Minijuego Batalla Mental / Ataque de Ansiedad
    ch4_ataque_1: {
        text: "El frío te paraliza. La Sombra susurra desde la oscuridad: 'Fue tu culpa. Podrías haber hecho más.' Tu pecho se oprime violentamente, apenas puedes respirar.",
        choices: [
            { text: "¡Callate! ¡Eres un mentiroso!", action: "atacar", next: "ch4_ataque_fail" },
            { text: "(Inhalar profundamente) No pude controlarlo.", action: "inhalar", next: "ch4_ataque_2" },
            { text: "Tienes razón... soy escoria.", action: "rendirse", next: "ch4_ataque_fail" }
        ]
    },
    ch4_ataque_fail: {
        text: "La oscuridad se espesa. El pánico te asfixia. Pierdes el control por completo y te desmayas por hiperventilación... Despiertas en el mismo sitio negro.",
        choices: [{ text: "Volver a intentarlo", action: "intentar", next: "ch4_ataque_1" }]
    },
    ch4_ataque_2: {
        text: "Un poco de aire entra a tus pulmones. La Sombra insiste: 'Nunca volverás a ser feliz. Tu vida ha terminado con ellos.'",
        choices: [
            { text: "Es mentira, el tiempo lo cura todo.", action: "razonar", next: "ch4_ataque_fail" },
            { text: "(Exhalar lentamente) Ahora mismo duele, y eso está bien.", action: "exhalar", next: "ch4_ataque_3" }
        ]
    },
    ch4_ataque_3: {
        text: "El ritmo cardíaco se estabiliza un poco. La Sombra grita: '¡Olvidarles es traicionarles!'",
        choices: [
            { text: "(Inhalar y Exhalar) Avanzar no es olvidar. Es llevarles conmigo.", action: "aceptar", next: "ch4_ataque_win" },
            { text: "Nunca les olvidaré, me castigaré a diario.", action: "castigar", next: "ch4_ataque_fail" }
        ]
    },
    ch4_ataque_win: {
        text: "La Sombra retrocede y se disuelve en el suelo oscuro. Has dominado el ataque de pánico. Estás exhausto, pero tienes el control de tu respiración.",
        achievement: { id: "respiracion", title: "Mente Clara", desc: "Superaste un ataque de ansiedad." },
        choices: [
            { text: "Tocar el suelo buscando apoyo", action: "tocar_suelo", next: "ch4_esfuerzo" },
            { text: "Dormir por puro agotamiento", action: "dormir", next: "ch4_sueno_silencio" }
        ]
    },

    ch4_sueno_silencio: {
        text: "Duermes en la oscuridad. Tienes un sueño profundo sin imágenes. Solo paz temporal.",
        choices: [{ text: "Despertar lentamente", action: "despertar", next: "ch4_esfuerzo" }]
    },
    ch4_esfuerzo: {
        text: "Arrastras la mano por el suelo negro. Tocas una piedra redonda y extraordinariamente densa.",
        item: "Piedra Pesada",
        choices: [
            { text: "Agarrar la piedra con fuerza", action: "agarrar", next: "ch5_start" }
        ]
    },

    // ---------------------------------------------------------
    // CAPÍTULO V: EL PESO DE LA PIEDRA (ACEPTACIÓN)
    // ---------------------------------------------------------
    ch5_start: {
        text: "Agarras la Piedra Pesada. Entiendes lo que es: es el dolor mismo condensado. Es la ausencia. Esta piedra no va a desaparecer jamás.",
        chapter: "Capítulo V: El Peso de la Piedra",
        isSavePoint: true,
        choices: [
            { text: "Intentar lanzar la piedra lejos", action: "lanzar", next: "ch5_rechazo" },
            { text: "Abrazar la piedra contra tu pecho", action: "abrazar", next: "ch5_abrazo" }
        ]
    },
    ch5_rechazo: {
        text: "Con todas tus escasas fuerzas, intentas tirarla, pero es demasiado pesada y vuelve a caer a tus pies.",
        sfx: "door",
        choices: [{ text: "Aceptar que debes cargarla", action: "levantar", next: "ch5_abrazo" }]
    },
    ch5_abrazo: {
        text: "Aceptas el peso. Es tuyo. Te pertenece. La levantas con ambas manos. Tus piernas tiemblan violentamente.",
        choices: [
            { text: "Levantarte sobre tus rodillas", action: "rodillas", next: "ch5_levantando" }
        ]
    },
    ch5_levantando: {
        text: "Estás de rodillas. El peso de la piedra amenaza con aplastarte. Extrañamente, ahora que has aceptado llevarla, la oscuridad alrededor empieza a resquebrajarse.",
        choices: [
            { text: "Hacer un esfuerzo final y ponerte de pie", action: "de_pie", next: "ch5_escalon" }
        ]
    },
    ch5_escalon: {
        text: "Estás de pie. Aparece ante ti una inmensa escalera de piedra labrada en la roca, que asciende hacia una niebla dorada.",
        choices: [
            { text: "Dar el primer paso hacia arriba", action: "subir", next: "ch5_subiendo_1" }
        ]
    },
    ch5_subiendo_1: {
        text: "Primeros diez escalones. El dolor quema como ácido en tus brazos y pantorrillas. Una lágrima resbala por tu mejilla.",
        choices: [{ text: "Continuar ascendiendo paso a paso", action: "subir", next: "ch5_resbalo" }]
    },
    ch5_resbalo: {
        text: "¡Tus botas resbalan en un escalón húmedo! La piedra pesada se tambalea peligrosamente y tira de ti hacia atrás, hacia el abismo negro.",
        choices: [
            { text: "Soltar la piedra y salvarte", action: "soltar", next: "ch5_caida" },
            { text: "Aferrarse a la piedra abrazando el dolor", action: "agarrar", next: "ch5_subiendo_2" },
            { text: "Gritar por ayuda", action: "gritar", next: "ch5_caida" }
        ]
    },
    ch5_caida: {
        text: "Pierdes el equilibrio. Caes rodando por las escaleras hacia la oscuridad total, machacándote el cuerpo y el alma. Tienes que volver a escalar.",
        sfx: "door",
        choices: [{ text: "Levantarse magullado", action: "levantar", next: "ch5_escalon" }]
    },
    ch5_subiendo_2: {
        text: "Logras recuperar el equilibrio aferrándote a tu carga. A mitad de camino. La piedra no se ha vuelto más ligera... pero tus músculos se han vuelto más fuertes. Ya no te arrastra, te acompaña.",
        achievement: { id: "fuerza", title: "Carga Compartida", desc: "Aprendiste a cargar con el dolor sin caer." },
        choices: [{ text: "Avanzar los últimos metros hacia la luz", action: "subir_cima", next: "ch6_start" }]
    },

    // ---------------------------------------------------------
    // EPÍLOGO: EL HORIZONTE
    // ---------------------------------------------------------
    ch6_start: {
        text: "Llegas a la meseta en la cima de la montaña. Dejas la piedra pesada suavemente a tu lado. Ya no la abrazas, pero sabes que siempre estará ahí.",
        chapter: "Epílogo: El Horizonte",
        theme: "transcendence",
        isSavePoint: true,
        sfx: "door",
        choices: [
            { text: "Levantar la cabeza y mirar", action: "mirar_horizonte", next: "ch6_mirar" }
        ]
    },
    ch6_mirar: {
        text: "El paisaje frente a ti es de una belleza aplastante. Un amanecer vasto pinta el mundo entero. Las nubes se rompen debajo de ti.",
        choices: [
            { text: "Tomar aire profundamente", action: "respirar", next: "ending" }
        ]
    },
    ending: {
        text: "Exhalas lentamente. Ves el mundo girar, hermoso, caótico y terrible a la vez. Esa piedra siempre será tuya. Pero el paisaje sigue siendo precioso y tú, a pesar de todo, estás vivo para verlo.\n\nSigues aquí. Sigues respirando.\n\nFIN.",
        achievement: { id: "respirar", title: "Respirar", desc: "Completaste la ascensión." },
        choices: [
            { text: "Ver créditos", action: "creditos", next: "credits" }
        ]
    },
    credits: {
        text: "Gracias por jugar a 'El Ascenso'.\n\nCreado por Ariel Capdevila.\nMúsica generada con Suno.\n\nDesarrollado para quienes han perdido algo o a alguien.\nEl duelo es como llevar una piedra pesada en el bolsillo: al principio pesa tanto que no puedes caminar, con el tiempo te acostumbras a su peso, y aunque nunca desaparece, tus piernas se vuelven lo suficientemente fuertes para subir montañas.\n\n(Puedes volver al menú principal para iniciar un nuevo viaje).",
        choices: []
    }
};
