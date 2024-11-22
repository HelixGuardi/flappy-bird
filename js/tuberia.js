class Tuberia {

    constructor(type, posY) {

        this.node = document.createElement("img");
        if (type === "arriba") {
            this.node.src = "./images/obstacle_top.png"
        } else if (type === "abajo") {
            this.node.src = "./images/obstacle_bottom.png"
        }

        gameBoxNode.append(this.node);

        this.x = gameBoxNode.offsetWidth; // el ancho de la caja de juego
        this.y = posY;
        this.w = 60;
        this.h = 250;

        this.node.style.width = `${this.w}px`;
        this.node.style.height = `${this.h}px`;

        this.node.style.position = "absolute";

        this.node.style.top = `${this.y}px`;
        this.node.style.left = `${this.x}px`;

        this.speed = 2;

    }

    automaticMovement() {

        this.x -= this.speed
        this.node.style.left = `${this.x}px`

    }

}