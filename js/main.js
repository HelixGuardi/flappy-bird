//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")

// game box
const gameBoxNode = document.querySelector("#game-box")


//* VARIABLES GLOBALES DEL JUEGO
let pollitoObj = null; // por ahora está vacio, pero más adelante tendrá su valor

// let tuberiaObj = null; // TEST
let tuberiasArr = [];

let gameIntervalId = null;
let addTuberiaIntervalId = null;


//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {

    // 1. ocultar la pantalla de inicial
    splashScreenNode.style.display = "none";

    // 2. mostrar la pantalla de juego
    gameScreenNode.style.display = "flex";

    // 3. añadir todos los elementos iniciales del juego
    pollitoObj = new Pollito()
    // console.log(pollitoObj)

    // tuberiaObj = new Tuberia(); // TEST

    // 4. iniciar el intervalo del juego (game-loop)
    gameIntervalId = setInterval(() => {
        gameLoop();
    }, Math.round(1000/60)); // 60 fps

    // 5. iniciar los otros intervalos del juego
    addTuberiaIntervalId = setInterval(() => {
        addTuberia();
    }, 2000)

}

function gameLoop() {
    // console.log("ejecutando loop inicial del juego");
    
    //! AQUI AGREGAMOS UNICAMENTE LO QUE SE DEBA EJECUTAR 60 VECES POR SEGUNDO. (LO QUE SE DEBA CHECKEAR CONTINUAMENTE EN EL JUEGO)

    pollitoObj.gravityEffect();
    // console.log(pollitoObj.y)

    // tuberiaObj.automaticMovement(); // TEST
    tuberiasArr.forEach((cadaTuberiaObj) => {
        cadaTuberiaObj.automaticMovement();
    });

    checkRemoverTuberiasQueSalen();
    checkCollisionPollitoTuberias();
    checkCollisionPollitoFloor();
    

}

function addTuberia() {

    let posicionAleatoriaTuberiaArriba = Math.floor(Math.random() * -200) // numero aleatorio entre -200 y 0

    let tuberiaObjArriba = new Tuberia("arriba", posicionAleatoriaTuberiaArriba);
    tuberiasArr.push(tuberiaObjArriba)

    let tuberiaObjAbajo = new Tuberia("abajo", posicionAleatoriaTuberiaArriba + 370);
    // 350 es la distancia entre las dos tuberias + la altura de la tuberia
    tuberiasArr.push(tuberiaObjAbajo)

    // console.log(tuberiasArr.length);

}

function checkRemoverTuberiasQueSalen() {

    if (tuberiasArr.length !== 0 && tuberiasArr[0].x + tuberiasArr[0].w <= 0) {
        tuberiasArr[0].node.remove();
        tuberiasArr.shift() // eliminar el primer elemento del array

    }

}

function checkCollisionPollitoTuberias() {

    tuberiasArr.forEach((cadaTuberiaObj) => {
        // cadatuberiaObj
        // pollitoObj
        if (
            pollitoObj.x < cadaTuberiaObj.x + cadaTuberiaObj.w &&
            pollitoObj.x + pollitoObj.w > cadaTuberiaObj.x &&
            pollitoObj.y < cadaTuberiaObj.y + cadaTuberiaObj.h &&
            pollitoObj.y + pollitoObj.h > cadaTuberiaObj.y
          ) {
            // Collision detected!
            gameOver();
          }

    })

}

function gameOver() {

    //1. IMPORTANTE: detener todos los intervalos del juego
    clearInterval(gameIntervalId)
    clearInterval(addTuberiaIntervalId)

    //2. Ocultar la pantalla de juego
    gameScreenNode.style.display = "none";

    //3. Mostrar la pantalla de game over
    gameOverScreenNode.style.display = "flex";

}

function checkCollisionPollitoFloor() {
    
    if ((pollitoObj.y + pollitoObj.h) > gameBoxNode.offsetHeight) {
        gameOver();
    }
}


//* EVENT LISTENERS
startBtnNode.addEventListener('click', () => {
    startGame()
})

gameBoxNode.addEventListener('click', () => {
    pollitoObj.jump();
})







// brainstorming planificación
    // agregar fondo del juego ✅
    // pollo exista (img, x, y, w, h, jumpSpeed, gravitySpeed)✅
    // efecto de gravedad✅
    // salto del pollito✅
    // tubos existen (img, x, y, w, h, speed)✅
    // movimiento automatico de los tubos✅
    // tuberia spawn (van apareciendo con el tiempo)✅
    // IMPORTANTE: debemos eliminar del juego las tuberias que salgan de la pantalla✅
    // aparecen 2 tubos con imagenes diferentes✅
    // los tubos aparezcan el alturas aleatorias✅
    // colision entre los tubos y el pollito✅
    // gameOver✅

// bonus
    // contador de puntos
    // niveles
    // dificultad aumento
    // aleteo
    // suelo moviendose


