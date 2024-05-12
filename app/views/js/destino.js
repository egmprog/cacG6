<script>
    function redirect() {
        // Obtener el valor seleccionado en el menú desplegable
        var destino = document.getElementById("destino").value;
        
        // Redirigir según la opción seleccionada
        switch (destino) {
            case "norte":
                window.location.href = "/app/views/content/norte.html";
                break;
            case "sur":
                window.location.href = "/app/views/content/sur.html";
                break;
            case "cordoba":
                window.location.href = "/app/views/content/cordoba.html";
                break;
            case "mardel":
                window.location.href = "/app/views/content/mardel.html";
                break;
            default:
                // Redirigir a una página predeterminada si no se seleccionó ninguna opción válida
                window.location.href = "/app/views/content/offers.html";
        }
        // Evitar que se envíe el formulario normalmente
        return false;
    }
</script>