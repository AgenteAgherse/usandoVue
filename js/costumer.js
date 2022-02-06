const direccion = 'https://61db14134593510017aff7f0.mockapi.io/api/v1/costumer';


Vue.component('adcrud',{
    data(){
        return {
            nombreCRUD: "",
            idCRUD: 0,
            telefonoCRUD: 0,
            productosCRUD: [],
            longitud: 0
        }
    },
    methods: {
        async agregar(){
            const datos = {
                idPer: document.getElementById('idAgregar').value,
                nombre: document.getElementById('nombreAgregar').value,
                telefono: document.getElementById('telAgregar').value,
            }

            const response = await fetch(direccion, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if(response.ok){
                alert('Persona agregada con éxito');
            }
            else{
                alert('Persona no agregada. Error');
            }
            return response.json().then(mat => alert('Su número de guía es: ' + mat.id));
        },

        async obtener(){
            let buscar = document.getElementById('idCli').value;
            const response = await fetch(direccion + '/' + buscar).then(res => res.json());
                this.nombreCRUD = response.nombre;
                this.idCRUD = response.idPer;
                this.telefonoCRUD = response.telefono;
        },

        async actualizar(){
            let buscar = document.getElementById('idCli').value;
            const cambio = {
                nombre: this.nombreCRUD,
                telefono: this.telefonoCRUD
            }
            const response = await fetch(direccion + '/' + buscar, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(cambio)
            });
            alert('Datos Actualizados!');
            this.nombreCRUD = "";
            this.telefonoCRUD = 0;
            this.idCRUD = 0;
            return response.json();
        },

        async eliminar(){
            let buscar = document.getElementById('idCli').value;
            console.log(direccion + '/' + buscar);
            const response = await fetch(direccion + '/' + buscar, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json"
                }
            });
            alert('Datos Eliminados!');
            this.nombreCRUD = "";
            this.telefonoCRUD = "";
            this.idCRUD = "";
            return response.json();
        }
        
    },

    template: `
    <div class="card text-center m-5">
        <div class="card-body">
        <h2>Agregar Cliente</h2>
        <!--Parte para agregar cliente-->
            <div class="row justify-content-center">
                <div class="col-10 input-group" role="group">
                    <input class="form-control" type="text" id="nombreAgregar" placeholder="Nombre Y Apellidos">
                    <input class="form-control" type="text" id="idAgregar" placeholder="identificación">
                    <input class="form-control" type="text" id="telAgregar" placeholder="teléfono">
                </div>
            </div>

            <div class="row justify-content-center" style="margin-top: 2%;">
                <div class="col-3 btn-group" role="group">
                    <button class="btn btn-dark" v-on:click="agregar">Agregar</button>
                </div>
            </div>
            
        <!--PARTE PARA MODIFICAR, OBTENER Y ELIMINAR A LA PERSONA-->
            <h2 style="margin-top:5%;">Obtener información de una persona</h2>

            <div class="input-group" role="group">
                <input type="text" id="idCli" class="form-control" placeholder="Ingrese la guía">
                <button class="btn btn-dark" v-on:click="obtener">Ingresar</button>
            </div>
            <p></p>
            <div class="row">
                <table class="table">
                    <thead>
                        <th class="col">NOMBRE</th>
                        <th class="col">ID</th>
                        <th class="col">TELEFONO</th>
                    </thead>
                    <tbody>
                    <tr>
                    <th><input type="text" class="form-control" id="nombre" placeholder="Nombre" v-model="nombreCRUD"></th>
                    <th><input type="number" class="form-control" id="id" placeholder="id" v-model="idCRUD" disabled></th>
                    <th><input type="tel" class="form-control" id="tel" placeholder="Teléfono" v-model="telefonoCRUD"></th>
                </tr>
                    </tbdoby>
                </table>
            </div>

            <div class="row">
            <div class="btn-group" role="group">
                <button class="btn btn-warning" v-on:click="actualizar">Actualizar</button>
                <button class="btn btn-danger" v-on:click="eliminar">Eliminar</button>
            </div>
        </div>
        </div>
    </div>
    `
});

new Vue({
    el: '#app',
    data(){
    }
});