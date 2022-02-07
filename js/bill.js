const dir = 'https://61db14134593510017aff7f0.mockapi.io/api/v1/costumer'

Vue.component('bills',{
    data(){
        return {
            nombreCRUD: "",
            opcionesCRUD: "",
            totalCRUD: "",
            estadoCRUD: "",
            cambiartipo: "",
            totalMOD: "",
            estadoMOD: ""
        }
    },

    methods: {
        async add(){
            let id = document.getElementById('bus').value;
            const url = dir + '/' + id + '/bill';
            const datos = {
                opciones: this.opcionesCRUD,
                total: this.totalCRUD,
                estado: this.estadoCRUD
            };
            const response = await fetch(url,{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos)
            });

            return response.json().then(mat => alert('Número de factura N°: ' + mat.id))

        },

        async get(){
            let id = document.getElementById('bus').value;
            //Para saber el nombre de la persona
            const usuario = await fetch(dir + '/' + id).then(res => res.json());
            this.nombreCRUD = usuario.nombre;
        },

        async getBill(){
            let id = document.getElementById('bus').value;
            let idmod = document.getElementById('idMod').value;
            const url = dir + '/' + id + '/bill/' + idmod;
            const response = await fetch(url).then(res => res.json());
            this.cambiartipo = response.opciones;
            this.totalMOD = response.total;
            this.estadoMOD = response.estado;
        },
        
        async modificarEstado(){
            let id = document.getElementById('bus').value;
            let idmod = document.getElementById('idMod').value;
            const url = dir + '/' + id + '/bill/' + idmod;
            const datos = {
                estado: this.estadoMOD
            };
            const response = await fetch(url,{
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(datos)
            });
            alert('Modificado con éxito');
            this.cambiartipo = "";
            this.totalMOD = "";
            this.estadoMOD = "";
            return response.json();
        },

        async deleteBill(){
            const confirmar = confirm('¿Desea eliminar la factura?');
            console.log(confirmar);
            if(confirmar){
                let id = document.getElementById('bus').value;
                let idmod = document.getElementById('idDel').value;
                const url = dir + '/' + id + '/bill/' + idmod;
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                alert('Eliminado correctamente!');
                return response.json();
            }
        }
    },
    template: `
    <div class="container">
        <div class="card">
            <div class="card-header text-center">
                <h2 class="card-title">Agregar Facturas</h2>
                <div class="input-group" role="group">
                    <input type="number" class="form-control" placeholder="Ingrese la guía de la persona" min="0" id="bus">
                    <button class="btn btn-dark" v-on:click="get">Buscar</button>
                </div>
            </div>
            <div class="card-body">

                <label for="opciones">Tipo de la factura</label>
                <select class="form-select" id="tipoFactura" name="opciones" v-model="opcionesCRUD">
                    <option value="Vinilo">Vinilo</option>
                    <option value="Microperforado">Microperforado</option>
                    <option value="Banner">Banner</option>
                    <option value="Acrilico">Acrilico</option>
                </select>
                
                <label for="valor">Ingrese el total de la factura</label>
                <input type="number" class="form-control" placeholder="Total: $0 COP" min="0" v-model="totalCRUD">

                <label for="estado">Definir estado de pago</label>
                <select name="estado" class="form-select" v-model="estadoCRUD">
                    <option value="Sin Pagar">Sin Pagar</option>
                    <option value="Con Aporte">Con Aporte</option>
                    <option value="Pagado">Pagado</option>
                </select>

                <label for="info">Forma parcial de la factura</label>
                <textarea name="info" cols="30" rows="5" class="form-control" disabled>
                    Nombre: {{nombreCRUD}}
                    Tipo Factura: {{opcionesCRUD}}
                    Total Factura: {{totalCRUD}}
                    Estado: {{estadoCRUD}}
                </textarea>
                <p></p>
                <div class="text-center">
                    <button class="btn btn-success" v-on:click="add">Agregar</button>
                </div>
                
            </div>
        </div>

        <div class="card">
            <div class="card-header text-center">
                <h2 class="card-title">Edición De estado</h2>
            </div>

            <div class="card-body" id="listado">
                <div class="input-group" role="group">
                    <input type="number" min="0" class="form-control" placeholder="Ingrese número de factura" id="idMod">
                    <button class="btn btn-warning" v-on:click="getBill">Buscar</button>
                </div>
                <div class="input-group" style="margin-top: 1%;">
                    <select name="estado" class="form-select" v-model="estadoMOD">
                        <option value="Sin Pagar">Sin Pagar</option>
                        <option value="Con Aporte">Con Aporte</option>
                        <option value="Pagado">Pagado</option>
                    </select>
                    <button class="btn btn-warning" v-on:click="modificarEstado">Modificar Estado</button>
                </div>
                <textarea class="form-control" style="margin-top:1%;" name="" id="" cols="30" rows="3" disabled>
                    Información Parcial
                    Nombre: {{nombreCRUD}}
                    Tipo Factura: {{cambiartipo}}
                    Total: {{totalMOD}}
                    Estado: {{estadoMOD}}
                </textarea>
            </div>
        </div>

        <div class="card">
            <div class="card-header text-center">
                <h2 class="card-title">Eliminar Factura</h2>
            </div>

            <div class="card-body" id="listado">
                <div class="input-group" role="group">
                    <input type="number" min="0" class="form-control" placeholder="Ingrese número de factura" id="idDel">
                    <button class="btn btn-danger" v-on:click="deleteBill">Eliminar</button>
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