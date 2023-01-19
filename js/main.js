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

function mostrarRespuestas() {
    document.querySelector('#respuestas').className = '';
}

function ocultarRespuestas() {
    document.querySelector('#respuestas').className = 'oculto';
}

