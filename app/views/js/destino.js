const selectElement = document.getElementById('destino');
const submitButton = document.querySelector('input[type="submit"]');

submitButton.addEventListener('click', function () {
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedText = selectedOption.textContent;

    console.log('Valor seleccionado:', selectedValue);
    console.log('Texto seleccionado:', selectedText);
});