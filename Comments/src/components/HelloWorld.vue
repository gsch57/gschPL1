<template>
<<<<<<< HEAD
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <h3 class="ml-auto mt-auto" v-if="loginSav != ''">Welcome {{loginSav}}</h3>
        <b-navbar-nav class="ml-auto">
          <b-dropdown right text="User" variant="info">
            <b-dropdown-item variant="primary" v-if="connected == false" >Log in</b-dropdown-item>
            <b-dropdown-item v-else href="#" @click="logOut()">Log out</b-dropdown-item>
            <b-dropdown-item v-if="connected" @click="changePWD()">Change password</b-dropdown-item>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-tabs>
      <b-tab title="Satisfaction Client" class="m-auto" style="width:98vw" active>
        <div align="left" class="mb-0">
          <h2>Satisfaction Client</h2>
        </div>
        <div align="right">
          <b-input-group>
            <b-form-input horizontale size="sm" type="text" v-model="filter" class="m-1" placeholder="Type to Search" />
              <b-input-group-append>
                  <b-btn class="m-1" :disabled="!filter" @click="filter = ''">Clear</b-btn>
              </b-input-group-append>
              <b-button v-b-toggle.collapse1 class="m-1" align="right" variant="outline-info" size="sm">
                filter
              </b-button>
              <b-button class="m-1" variant="outline-primary" align="right" @click.stop="add()" size="sm">
                  Add
              </b-button>
          </b-input-group>
        </div>
        <b-collapse id="collapse1" class="mt-2">
          <b-container fluid>
            <b-row>
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Sort" class="mb-0">
                    <b-input-group>
                        <b-form-select v-model="sortBy" :options="sortOptions">
                            <option slot="first" :value="null">-- none --</option>
                        </b-form-select>
                        <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                            <option :value="false">Asc</option>
                            <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col md="6" class="my-1">
                    <b-form-group horizontal label="Per page" class="mb-0">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                    </b-form-group>
                </b-col>
            </b-row>
          </b-container>
        </b-collapse>
        <b-table :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :hover="true"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :sort-direction="sortDirection"
                @filtered="onFiltered">
          <template slot="Action" slot-scope="data">
            <b-button v-if="data.item.Data.length> 40" size="sm" @click.stop="data.toggleDetails" >
              Detail
            </b-button>
            <b-button v-if="(Date.now() - Date.parse(data.item.DateCreat) < 66400000 || loginSav == 'admin') && connected && (data.item.User == loginSav || loginSav == 'admin')"
            variant="danger"
            @click.stop="edit(data.item, data.index, $event.target)"
            size="sm">
              Edit
            </b-button>
          </template>
          <template slot="Type" slot-scope="data">
            <b-container fluid>
              {{options[data.item.Type]}}
            </b-container>
          </template>
          <template slot="IsValid" slot-scope="data">
            <b-container fluid>
              <b-form-checkbox style='position:absolute' v-model=data.value :disabled="!connected" @change="updateState(data)">
              </b-form-checkbox>
            </b-container>
          </template>
          <template slot="row-details" slot-scope="data">
            <b-card border-variant="info" class="ml-3 text-center"
                    align="center" style="max-width: 95vw;">
              <p class="card-text">
                {{data.item.Data}}
              </p>
            </b-card>
          </template>
        </b-table>
        <b-row>
          <b-col md="6" class="my-1">
            <b-pagination  :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Réclamations en cours">
      </b-tab>
      <b-tab title="Tableau de réclamations" class="m-auto" style="width:98vw">
      </b-tab>
      <b-tab title="Statistiques" >
      </b-tab>
    </b-tabs>
    <EditModal ref="editModal" @update="getComment"></EditModal>
=======
  <div class="hello">
    <h1>{{ msg }}</h1>
>>>>>>> c46bb9058d0a0ca52633b8f55b8f015a43cf6ae8
  </div>
</template>

<script>
<<<<<<< HEAD

import EditModal from './EditModal.vue'
import PostsService from '@/services/PostsService'

const items = []

export default {
  name: 'HelloWorld',
  components: {
    EditModal,
    PostsService,
  },
  data () {
    return {
      items: items,
      fields: [
        { key: 'ID', label: 'ID', sortable: true },
        { key: 'Client', label: 'Client', sortable: true },
        { key: 'IsValid', label: 'State', sortable: true, formatter: (value) => {return value == 'Y' ? true : false}},
        { key: 'Type', label: 'Type', sortable: true},
        { key: 'Data', label: 'Comment', sortable: false, formatter: (value => {
          return value.length > 60 ? value.substring(0, 60) + "..." : value
        })},
        { key: 'User', label: 'User', sortable: true },
        { key: 'DateCreat', formatter: (value) => {
            return this.getDateFormat(value)
          }, label: 'Date', sortable: true },
        { key: 'Action', label: 'Actions' ,sortable: false},
      ],
      options: { "A" : 'friendliness of staff', "B" : 'competence of staff', "C" : 'quality of products', "D" : 'quality of services ' },
      currentPage: 1,
      perPage: 5,
      pageOptions: [ 5, 10, 15 ],
      sortBy: 'DateCreat',
      sortDirection: 'desc',
      filter: null,
      showEdit: false,
      sortDesc: true,
      totalRows: items.length,
      editData: null,
      connected: true,
      loginSav: 'admin'
    }
  },
  computed: {
    sortOptions () {
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  mounted () {
    this.getComment()
  },
  methods: {
    async sendUpdateState(data) {
      var params = {
        state: data.value,
        id: data.item.ID
      }
      const response = await PostsService.sendUpdateState(params)
      this.getComment()
    },
    updateState(data) {
      this.sendUpdateState(data)
    },
    getDateFormat(value) {
      var myCustomDate = new Date(value)
      var day = myCustomDate.getDate() < 10 ? '0' + myCustomDate.getDate() : myCustomDate.getDate()
      var month = myCustomDate.getMonth() + 1 < 10 ? '0' + myCustomDate.getMonth() : myCustomDate.getMonth()
      var year = myCustomDate.getFullYear()
      return day + "/" + month  + "/" + year
    },
    async getComment () {
      const response = await PostsService.getComment()
      this.items = response.data
      
      for (var i = 0; i < this.items.length;i++){
        this.items[i]._rowVariant = this.items[i].IsValid == 'Y' ? 'success' : ''
      }
    },
    edit(item, index, button) {
      this.$refs.editModal.updateData(item)
      this.$refs.editModal.showEditModal('Admin')
    },
    add () {
        this.$refs.editModal.showAddModal('Admin')
    },
    onFiltered (filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
=======
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'HelloWorld'
    }
>>>>>>> c46bb9058d0a0ca52633b8f55b8f015a43cf6ae8
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
