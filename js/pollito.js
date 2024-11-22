class Pollito {

    constructor() {

        // aqui estarán todas las propiedas del pollito

        // emepzamos con la imagen e insertamos la imagen al gameBox
        this.node = document.createElement("img")
        this.node.src = "./images/flappy.png" // el src de la imagen siempre empieza con "./"

        gameBoxNode.append(this.node)

        this.x = 50;
        this.y = 60;
        this.w = 40;
        this.h = 35;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        this.node.style.position = "absolute";

        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.gravitySpeed = 2;
        this.jumpSpeed = 35;

    }

    // aqui estarán todos los metodos del polllito
    gravityEffect() {
        
        this.y += this.gravitySpeed;
        this.node.style.top = `${this.y}px`

    }

    jump() {
        // this.y -= this.jumpSpeed;
        // this.node.style.top = `${this.y}px`

        let jumpIntervalId = setInterval(() => {
            this.y -= 8
            this.node.style.top = `${this.y}px`
        }, 10);

        setTimeout(() => {
            clearInterval(jumpIntervalId)
        }, 100);
    }
}