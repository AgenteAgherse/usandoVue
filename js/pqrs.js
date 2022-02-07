const dir = 'https://61db14134593510017aff7f0.mockapi.io/api/v1/pqrs';

Vue.component('pqrs',{
    data(){
        return{
            nombreCRUD: "",
            telefonoCRUD: "",
            razonCRUD: "",
        }
    },

    methods: {
        limpiar(){
            this.nombreCRUD = "";
            this.telefonoCRUD = "";
            this.razonCRUD = "";
            document.getElementById('obt').value = "";
        },

        async add(){
            const datos = {
                nombre: this.nombreCRUD,
                telefono: this.telefonoCRUD,
                razon: this.razonCRUD
            };
            const response = await fetch(dir, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            this.limpiar();
            return response.json().then(mat => alert('Su número de PQRS es: ' + mat.id));
        },

        async get(){
            const url = dir + "/" + document.getElementById('obt').value;
            const response = await fetch(url).then(res => res.json());
            if(response.status != 404){
                this.nombreCRUD = response.nombre;
                this.telefonoCRUD = response.telefono;
                this.razonCRUD = response.razon;
                return "";
            }
        },

        async mod(){
            const url = dir + "/" + document.getElementById('obt').value;
            const datos = {
                nombre: this.nombreCRUD,
                telefono: this.telefonoCRUD,
                razon: this.razonCRUD
            };
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(datos)
            }).then(res => res.json());
            alert('Modificado correctamente!');
            this.limpiar()
        },

        async del(){
            const url = dir + "/" + document.getElementById('obt').value;
            let confirmar = confirm('¿Está seguro de eliminar la guía?: ');
            if(confirmar){
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                this.limpiar();
                alert('Eliminado Correctamente!');
                return response.json();
            }
            else{
                return "";
            }
        }
    },

    template: `
    <div class="container text-center" style="margin-top: 5%;">
        <div class="card">
            <div class="card-header">
                <h2>PQRS</h2>
                <div class="input-group" role="group">
                    <input type="number" class="form-control" id="obt" placeholder="Ingrese el número de solicitud en caso de querer cambiarla o eliminarla">
                    <button class="btn btn-dark" v-on:click="get">Ver</button>
                </div>
            </div>
            <div class="card-body">
                <h4 class="card-title">Ingrese los detalles</h4>
                <input type="text" class="form-control" placeholder="Ingrese su nombre" v-model="nombreCRUD">
                <input type="tel" class="form-control" placeholder="Ingrese su teléfono" v-model="telefonoCRUD">
                <textarea class="form-control" cols="20" rows="10" placeholder="Ingrese motivo" v-model="razonCRUD"></textarea>

                <label for="message">El mensaje actualmente se encuentra de esta manera</label>
                <textarea name="message" id="message" class="form-control" cols="30" rows="10" disabled>
Nombre: {{nombreCRUD}}
Teléfono: {{telefonoCRUD}}
Mensaje: {{razonCRUD}}
                </textarea>
                <p></p>
                <div role="group">
                    <button class="btn btn-light" style="text-decoration: underline black;" v-on:click="limpiar">Cancelar</button>
                    <button class="btn" style="background-color: rgba(102, 16, 242, 0.3);" v-on:click="add">Agregar</button>
                    <button class="btn" style="background-color: rgba(102, 16, 242, 0.5);" v-on:click="mod">Modificar</button>
                    <button class="btn" style="background-color: rgb(102, 16, 242);" v-on:click="del">Eliminar</button>
                </div>
            </div>

        </div>
    </div>
    `,

});

new Vue({
    el: '#app',
    data(){

    }
});