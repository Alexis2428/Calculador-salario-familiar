function probarValidarSalario() {
    console.assert(
        validarSalario('') === 'El campo salario no debe estar vacio',
        'validarSalario no validó que no se ingresó ningun salario'
    );

    console.assert(
        validarSalario('0,000') === 'El campo salario solo admite hasta 2 decimales',
        'validarSalario no validó que el campo salario tenga hasta 2 decimales'
    );

    console.assert(
        validarSalario('12000,00') === '',
        'validarSalario falló con un valor valido'
    );
}

probarValidarSalario();
