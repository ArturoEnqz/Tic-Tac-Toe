const board = document.getElementById("board");
const boardCells = [];
const btnReiniciar = document.getElementById("btnReiniciar");
btnReiniciar.style.display = "none"

for (let i = 0; i < 9; i++) {
    let boardCell = document.createElement("div");
    boardCell.classList.add("cell");
    boardCells.push(boardCell);
    board.appendChild(boardCell);
}

function colocarEquisInicial() {
    const esquinas = [0, 2, 6, 8];
    const esquinaAleatoria = esquinas[Math.floor(Math.random() * esquinas.length)];
    boardCells[esquinaAleatoria].innerText = "❌";
    boardCells[esquinaAleatoria].classList.add("clicked");
}

function colocarEquis() {
    const indicesVacios = boardCells.reduce((emptyCells, cell, index) => {
        if (!cell.innerText) {
            emptyCells.push(index);
        }
        return emptyCells;
    }, []);

    const indiceAleatorio = indicesVacios[Math.floor(Math.random() * indicesVacios.length)];
    boardCells[indiceAleatorio].innerText = "❌";
    boardCells[indiceAleatorio].classList.add("clicked");
    setTimeout(verificarGanador, 500);
}

function iniciarJuego() {
    btnReiniciar.style.display = "block"
    setTimeout(colocarEquisInicial, 500);
    const button = document.getElementById("btnIniciar")
    button.style.display = "none";

    boardCells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!cell.classList.contains("clicked")) {
                cell.classList.add("clicked");
                cell.innerText = "🔵";
                setTimeout(verificarGanador, 500);
                setTimeout(colocarEquis, 500);
            }
        })
    })
}

function reiniciarJuego() {
    window.location.reload()
}

function verificarGanador() {
    const lineasGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let linea of lineasGanadoras) {
        const valores = linea.map(index => boardCells[index].innerText);
        if (valores.every(val => val === "🔵") || valores.every(val => val === "❌")) {
            alert(`¡${valores[0]} ganó!`);
            window.location.reload();
            return;
        }
    }
}

