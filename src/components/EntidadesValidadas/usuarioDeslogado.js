export function UsuarioDeslogado(){

    function validarUsuario(){
        let tipo = localStorage.getItem("tipo")
        let id = localStorage.getItem("id")

        if(tipo == 0){ 
            window.location.href = `/alterarCadastro/${id}`
        }
    }

    return(
        <>
            {
                validarUsuario()
            }
        </>
    )
}