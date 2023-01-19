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

function validarSalarios() {
    const errores = {};
    const $salarios = document.querySelectorAll('.integrante input');

    for (let i = 0; i < $salarios.length; i++) {
        errores[i] = validarSalario($salarios[i].value);
    }

    const sonValidos = 0 === manejarErrores(errores, $salarios);

    return sonValidos;
}

function validarSalario(salario) {
    if ('' === salario) {
        return 'El campo salario no debe estar vacio';
    }

    if (!/^[0-9]+[\.,]*[0-9]{0,2}$/.test(salario)) {
        return 'El campo salario solo admite hasta 2 decimales';
    }

    return '';
}

function manejarErrores(errores, $salarios) {
    let cantidadErrores = 0;

    Object.keys(errores).forEach(function(key) {
        const error = errores[key];

        if (error) {
            cantidadErrores++;
            $salarios[key].classList.add('error');

            if (!comprobarExisteError(error)) {
                crearError(error);
            }
        } else {
            $salarios[key].classList.remove('error');
        }
    })

    const $listaErrores = document.querySelectorAll('#errores li');
    borrarErroresCorregidos(errores, $listaErrores);

    return cantidadErrores;
}

function crearError(error) {
    const $error = document.createElement('li');
    $error.className = 'list-group-item';
    $error.innerText = error;

    document.querySelector('#errores').appendChild($error);
}

function comprobarExisteError(error) {
    const $listaErrores = document.querySelectorAll('#errores li');

    for (let i = 0; i < $listaErrores.length; i++) {
        if (error === $listaErrores[i].innerText) {
            return true;
        }
    }

    return false
}

function borrarErroresCorregidos(errores, $listaErrores) {
    const valorErrores = Object.values(errores);

    for (let i = 0; i < $listaErrores.length; i++) {
        let existeError = false;

        for (let j = 0; j < valorErrores.length; j++) {
            if ($listaErrores[i].innerText === valorErrores[j]) {
                existeError = true;
                break;
            }
        }

        if (!existeError) {
            $listaErrores[i].remove();
        }
    }
}
