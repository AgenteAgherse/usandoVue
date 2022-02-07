const url = 'https://61db14134593510017aff7f0.mockapi.io/api/v1/calificaciones';
Vue.component('calificaciones',{
    data(){
        return{
            persona: "",
            calificacion: 0,
            comentario: ""
        }
    },

    methods: {
        async add(){
            const datos = {
                nombre: this.persona,
                calificacion: this.calificacion,
                comentario: this.comentario
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify(datos)
            });

            this.persona = "";
            this.calificacion = 0;
            this.comentario = "";
            return response.json().then(res => alert('Se ha registrado el comentario #' + res.id));
        },

        async get(){
            let id = document.getElementById('obt').value;
            const dir = url + '/' + id;
            const response = await fetch(dir).then(res => res.json());
            this.persona = response.nombre;
            this.calificacion = response.calificacion;
            this.comentario = response.comentario;
        },

        async mod(){
            let id = document.getElementById('obt').value;
            const dir = url + '/' + id;
            const datos = {
                nombre: this.persona,
                calificacion: this.calificacion,
                comentario: this.comentario
            };
            const response = await fetch(dir, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            this.persona = "";
            this.calificacion = 0;
            this.comentario = "";
            return response.json().then(alert('Cambios realizados!'));
        },

        async del(){
            let id = document.getElementById('obt').value;
            const dir = url + '/' + id;
            const response = await fetch(dir, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            this.persona = "";
            this.calificacion = 0;
            this.comentario = "";
            return response.json().then(alert('Elemento eliminado!'));
        }
    },

    template: `
        <div class="container" style="margin-top: 5%">
            <div class="card">
                <div class="card-header text-center">
                    <h2 class="card-title">Procesos de Calificación</h2>
                    <div class="input-group" role="group">
                        <input type="text" id="obt" name="nombre" class="form-control" placeholder="Número de comentario">
                        <button class="btn btn-dark" v-on:click="get">Buscar</button>
                    </div>
                </div>
                <div class="card-body">
                    <label for="nombre">Ingrese su nombre: </label>
                    <input type="text" name="nombre" class="form-control" placeholder="Nombre" v-model="persona">
        
                    <label for="comentario">Ingrese su comentario: </label>
                    <textarea name="comentario" class="form-control" cols="30" rows="5" placeholder="Ingrese su comentario" v-model="comentario"></textarea>
                    
                    <label for="calificacion">¿Qué calificación desea darle a nuestros servicios?</label>
                    <input type="range" class="form-range" min="0" max="5" v-model="calificacion">
                    <div class="row">
                        <div class="col-3">0</div>
                        <div class="col-2">1</div>
                        <div class="col-2">2</div>
                        <div class="col-2">3</div>
                        <div class="col-2">4</div>
                        <div class="col-1">5</div>
                    </div>

                    <div class="input-group" role="group">
                        <button class="btn btn-success" v-on:click="add">Agregar Comentario</button>
                        <button class="btn btn-warning" v-on:click="mod">Modificar Opinión</button>
                        <button class="btn btn-danger" v-on:click="del">Eliminar Opinión</button>
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
})