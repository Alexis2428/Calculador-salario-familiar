const $botonAgregar = document.querySelector('button[name=agregar]');
$botonAgregar.onclick = function() {
    agregarIntegrante();
    mostrarBotonCalcular();
}

const $botonQuitar = document.querySelector('button[name=quitar]');
$botonQuitar.onclick = borrarUltimoIntegrante;

const $botonCalcular = document.querySelector('button[name=calcular]');
$botonCalcular.onclick = obtenerRespuestas;

const $botonReiniciar = document.querySelector('button[name=reiniciar]');
$botonReiniciar.onclick = reiniciar;

function agregarIntegrante() {
    const $cuadroTexto = document.createElement('input');
    $cuadroTexto.type = 'number';
    $cuadroTexto.className = 'form-control';

    const $texto = document.createElement('label');
    $texto.textContent = 'Ingrese el salario anual';

    const $integrante = document.createElement('div');
    $integrante.classList.add('form-floating');
    $integrante.classList.add('mb-1');
    $integrante.classList.add('integrante');

    $integrante.appendChild($cuadroTexto);
    $integrante.appendChild($texto);

    document.querySelector('#integrantes').appendChild($integrante);
}

function borrarUltimoIntegrante() {
    const $integrantes = document.querySelectorAll('.integrante');
    if (0 < $integrantes.length) {
        const ultimoIntegrante = $integrantes.length - 1;
        $integrantes[ultimoIntegrante].remove();
    }
}

function borrarIntegrantes() {
    const $integrantes = document.querySelectorAll('.integrante');
    for (let i = $integrantes.length; i > 0; i--) {
        borrarUltimoIntegrante();
    }
}

function obtenerRespuestas(event) {
    event.preventDefault();

    if (validarSalarios()) {
        const salarios = obtenerSalarios();

        obtenerRespuesta('mayor', obtenerNumeroMayor(salarios));
        obtenerRespuesta('menor', obtenerNumeroMenor(salarios));
        obtenerRespuesta('promedio', obtenerPromedio(salarios).toFixed(2));
        obtenerRespuesta('mensual-promedio', (obtenerPromedio(salarios) / 12).toFixed(2));

        mostrarRespuestas();
        mostrarBotonReiniciar();
    }
}

function obtenerSalarios() {
    const salarios = [];
    const $salarios = document.querySelectorAll('.integrante input');

    for (let i = 0; i < $salarios.length; i++) {
        salarios.push(Number($salarios[i].value));
    }

    return salarios;
}

function mostrarBotonCalcular() {
    document.querySelector('button[name=calcular]').classList.remove('oculto');
}

function ocultarBotonCalcular() {
    document.querySelector('button[name=calcular]').classList.add('oculto');
}

function mostrarBotonReiniciar() {
    document.querySelector('button[name=reiniciar]').classList.remove('oculto');
}

function ocultarBotonReiniciar() {
    document.querySelector('button[name=reiniciar').classList.add('oculto');
}

function obtenerRespuesta(tipo, valor) {
    document.querySelector(`#salario-${tipo}`).textContent = valor;
}

function mostrarRespuestas() {
    document.querySelector('#respuestas').className = '';
}

function ocultarRespuestas() {
    document.querySelector('#respuestas').className = 'oculto';
}

function reiniciar() {
    borrarIntegrantes();
    ocultarBotonCalcular();
    ocultarRespuestas();
    ocultarBotonReiniciar();
}

