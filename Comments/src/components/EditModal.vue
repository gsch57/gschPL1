<template>
  <div id="EditModalId">
    <b-modal ref="addModalRef" size="lg">
        <b-container fluid>
            <b-form-group
                id="fieldset1"
                description=""
                label="Enter client's name"
                label-for="input1"
                :invalid-feedback="invalidFeedback"
                :valid-feedback="validFeedback"
                :state="state">
            <b-form-input id="input1" :state="state" v-model.trim="name"></b-form-input>
            </b-form-group>
        </b-container>
        <b-container fluid>
        <b-form-group
                id="fieldset2"
                description=""
                label="Enter a comment"
                label-for="input2"
                :invalid-feedback="invalidFeedback2"
                :valid-feedback="validFeedback2">
            <b-form-textarea id="textarea1"
                     v-model="comment"
                     placeholder="Enter something"
                     :rows="3"
                     :max-rows="6"
                     :state="state2">
            </b-form-textarea>
            </b-form-group>
        </b-container>
        <b-container fluid>
            <b-form-select v-model="selectedOptions" variant="info" :options="options" class="mb-auto">
            </b-form-select>
        </b-container>
        <div v-if="edit" slot="modal-footer" class="w-100">
            <div class="float-right">
                <b-btn size="sm" class="mr-1" variant="primary" @click="hideEditModal" :disabled="!(state && state2)">
                    Update
                </b-btn>
                <b-btn size="sm" class="mr-1" variant="danger" @click="hideAndDelModal" :disabled="!(state && state2)">
                    Delete
                </b-btn>
            </div>
        </div>
        <div v-else slot="modal-footer" class="w-100">
            <p class="float-left"></p>
            <b-btn size="sm" class="float-right" variant="primary" @click="hideAddModal" :disabled="!(state && state2)">
                ajouter
            </b-btn>
        </div>
    </b-modal>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
    computed: {
        state () {
            return this.name.length >= 4 ? true : false
        },
        state2 () {
            return this.comment.length > 0 ? true : false
        },
        invalidFeedback () {
            if (this.name.length > 4) {
                return ''
            } else if (this.name.length > 0) {
                return 'Enter at least 4 characters'
            } else {
                return 'Please enter something'
            }
        },
        validFeedback () {
            return this.state === true ? '' : ''
        },
        invalidFeedback2 () {
            if (this.comment.length > 4) {
                return ''
            } else if (this.comment.length > 0) {
                return 'Enter at least 4 characters'
            } else {
                return 'Please enter something'
            }
        },
        validFeedback2 () {
            return this.state2 === true ? '' : ''
        }
    },
    methods: {
        clearData () {
            this.name = ''
            this.comment = ''
            this.selectedOptions = 'A'
        },
        async sendData () {
            console.log(this.name)
            console.log(this.comment)
            var params = {
                client: this.name,
                comments: this.comment,
                user: this.login,
                type: this.selectedOptions
            }
            console.log("USER: " + params.user)
            await PostsService.sendComment(params)
            this.$emit('update')
        },
        async sendDeleteData () {
            var params = {
                id: this.id
            }
            await PostsService.deleteComment(params)
            this.$emit('update')
        },
        async sendUpdateData () {
            console.log(this.name)
            console.log(this.comment)
            var params = {
                client: this.name,
                comments: this.comment,
                id: this.id,
                type: this.selectedOptions
            }
            await PostsService.sendUpdateData(params)
            this.$emit('update')
        },
        showAddModal (login) {
            this.login = login
            this.edit = false
            this.clearData()
            this.$refs.addModalRef.show()
        },
        showEditModal (login) {
            if (this.dataToEdit != null && this.dataToEdit.Client != null)
            {
                this.name = this.dataToEdit.Client
                console.log(this.name)
            }
            this.login = login
            this.edit = true
            this.$refs.addModalRef.show()
        },
        hideAddModal () {
            this.sendData()
            this.clearData()
            this.$refs.addModalRef.hide()
        },
        hideEditModal () {
            this.sendUpdateData()
            this.clearData()
            this.$refs.addModalRef.hide()
        },
        updateData(item) {
            this.name = item.Client
            this.comment = item.Data
            this.id = item.ID
            this.selectedOptions = item.Type
        },
        hideAndDelModal () {
            this.sendDeleteData()
            this.clearData()
            this.$refs.addModalRef.hide()
        }
    },
    data () {
        return {
            selectedOptions: 'A',
            login: '',
            show: false,
            edit: false,
            name: '',
            comment:'',
            id: 0,
            options: [
                { value: 'A', text: 'friendliness of staff' },
                { value: 'B', text: 'competence of staff' },
                { value: 'C', text: 'quality of products' },
                { value: 'D', text: 'quality of services ' }
            ]
        }
    }
}
</script>
