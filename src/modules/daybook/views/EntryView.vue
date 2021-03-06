<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-1 fs-4 fw-light">{{ yearDay }}</span>
            </div>

            <div>

                <input type="file"
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpg, image/jpeg"
                >
                <button
                    v-if="entry.id"
                    class="btn btn-danger mx-2"
                    @click="onDeleteEntry"
                >
                    Borrar
                    <i class="fas fa-trash-alt"></i>
                </button>

                <button @click="onSelectImage" class="btn btn-primary">
                    Subir foto
                    <i class="fas fa-upload"></i>
                </button>
            </div>
        </div>

        <hr>
        <div class="d-flex flex-column px3 h-75">
            <textarea name="" id="" v-model="entry.text " placeholder="¿Qué sucedió?"></textarea>
        </div>

        <img
            v-if="entry.picture && !localImage"
            :src="entry.picture" alt="entry picture" class="img-thumbnail">
        <img
            v-if="localImage"
            :src="localImage" alt="entry picture" class="img-thumbnail">
    </template>

    <Fab
        @on:click="saveEntry"
        icon="fa-save"/>
</template>




/*  */
<script>
import { defineAsyncComponent  } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'
import Swal from 'sweetalert2'

import uploadImage from '../helpers/uploadImage'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        day() {
            const { day } = getDayMonthYear( this.entry.date )
            return day
        },
        month() {
            const { month } = getDayMonthYear( this.entry.date )
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear( this.entry.date )
            return yearDay
        },
    },
    methods: {
        ...mapActions('journal', ['updateEntries', 'addEntry', 'deleteEntry']),
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()
            const picture = await uploadImage ( this.file );

            this.entry.picture = picture

            if ( this.entry.id ) {
                await this.updateEntries(this.entry)
            } else {
                const id = await this.addEntry( this.entry )
                this.$router.push({ name: 'entry', params: { id }})

            }

            this.file = null
            Swal.fire('Guadado', 'Entrada registrada con exito', 'success')
        },

        loadEntry() {
            let entry
            if ( this.id === 'new' ) {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntriesById( this.id )
                if ( !entry ) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = entry
        },
        async onDeleteEntry() {

            const result = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showConfirmButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if ( result.isConfirmed ) {
                new Swal({
                    title: 'Espere por favor',
                    allowOutsideClick: false,
                })
                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })
                Swal.fire('Guadado', 'Eliminado con exito', 'success')
            }

        },

        onSelectedImage( event ) {
            const file = event.target.files[0]
            if ( !file ) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
        },


        onSelectImage() {
            this.$refs.imageSelector.click()
        }
    },
    created() {
        this.loadEntry()
    },

    watch: {
        id( ) {
            this.loadEntry()
        }
    }
}
</script>




/*  */
<style lang="scss" scoped>
    textarea {
        font-size: 20px;
        border: none;
        height: 100%;

        &:focus {
            outline: none;
        }
    }

    img {
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: opx 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>

