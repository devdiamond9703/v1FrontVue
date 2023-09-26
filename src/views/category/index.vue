<template>
    <v-row>
        <v-col class="text-left">
            <h3>Product category list</h3>  
        </v-col>
        <v-col class="text-right">
            <v-btn color="success" icon="mdi-plus" @click="category.dialog.add = true"></v-btn>
        </v-col>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="category.page"
                :headers="category.headers"
                :items="category.all"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn size="small" class="me-3" color="primary" @click="addAttribute(item.raw)">
                        Add attr
                    </v-btn>
                    <v-icon size="small" color="primary" @click="editCategory(item.raw)">
                        mdi-pencil
                    </v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-row>
        <v-dialog v-model="category.dialog.add" width="600">
            <v-card>
                <v-card-title>
                    <h3 v-if="category.field.id">Update product category</h3>
                    <h3 v-else>Add product category</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field v-model="category.field.name" variant="underlined"></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="closeBtn">
                        Close
                    </v-btn>
                    <v-btn v-if="category.field.id" color="blue" variant="text" @click="updateCategory">
                        Update
                    </v-btn>
                    <v-btn v-else color="blue" variant="text" @click="saveCategory">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row>
        <v-dialog v-model="category.dialog.addAttr" width="700">
            <v-card>
                <v-card-title>
                    <h3 >Add attribute to product category</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-select
                            v-model="category.field"
                            :items="categoryAttr.unselected"
                            item-value="id"
                            item-title="name"
                            label="Category"
                            variant="outlined"
                            readonly
                        ></v-select>
                        <v-select
                            v-model="categoryAttr.field.attribute_id"
                            :items="categoryAttr.unselected"
                            item-value="id"
                            item-title="name"                            
                            label="Attribute"
                            variant="outlined"
                        ></v-select>
                        <div class="text-right">
                            <v-btn color="blue-darken-1"  @click="saveCategryAttribute">
                                Save
                            </v-btn>
                        </div>
                    </v-col>
                    <v-divider :thickness="7" class="border-opacity-50"></v-divider>
                    <v-col cols="12">
                        <v-data-table
                            v-model:items-per-page="categoryAttr.page"
                            :headers="categoryAttr.headers"
                            :items="categoryAttr.selected"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-icon size="small" color="primary" @click="editCategory(item.categoryAttrId)">
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="category.dialog.addAttr = false">
                        Close
                    </v-btn>
                    <v-btn v-if="category.field.id" color="blue" variant="text" @click="updateCategory">
                        Update
                    </v-btn>
                    <v-btn v-else color="blue" variant="text" @click="saveCategory">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { 
    getCategoryAllApi, 
    saveCategoryApi, 
    getAttrByCategoryApi, 
    saveCategryAttributeApi} 
from '../../api/category/index.js'
import { getAttributeAllApi } from '../../api/attribute/index.js'

export default {
    data() {
        return {
            category: {
                page: 10,
                all: [],
                dialog: {
                    add: false,
                    addAttr: false,
                },
                headers: [
                    { title: 'Name', align: 'start', sortable: false, key: 'name'},
                    { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                ],
                defaultField: {
                    id: null,
                    name: null,
                },
                field: {
                    id: null,
                    name: null,
                },
            },
            categoryAttr: {
                page: 10,
                selected: [],
                unselected: [],
                headers: [
                    { title: 'Name', align: 'start', sortable: false, key: 'attrName'},
                    { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                ],
                field: {
                    id: null,
                    product_category_id: null,
                    attribute_id: null,
                    sort: 1,
                    status: 1,
                }
            },

            attribute: {
                all: []
            }
        }
    },

    methods: {
        async getAttributeAll() {
            this.attribute.all = await getAttributeAllApi();
        },
        async getCategoryAll() {
            this.category.all = await getCategoryAllApi();
        },
        closeBtn() {
            this.category.dialog.add = false;
            this.category.field = {...this.category.defaultField}
        },
        editCategory(item) {
            this.category.dialog.add = true
            this.category.field.id = item.id
            this.category.field.name = item.name
        },
        async updateCategory() {
            this.category.dialog.add = false
            let response = await saveCategoryApi(this.category.field)
            if(response.status) {
                for(let object of this.category.all) {
                    if(object.id === response.data.id) {
                        object.name =  response.data.name
                    }
                }
            }
        },
        async saveCategory() {
            this.category.dialog.add = false
            let response = await saveCategoryApi(this.category.field)
            if(response.status) {
                this.category.all.push(response.data)
            }
        },

        addAttribute(item) {
            console.log("all category", this.category.all);
            this.category.dialog.addAttr = true
            this.category.field.id = item.id
            this.category.field.name = item.name
            this.getAttrByCategory(item.id)
        },

        async getAttrByCategory(id) {
            this.categoryAttr.selected = await getAttrByCategoryApi(id)
            let attrIds = new Set(this.categoryAttr.selected.map(item => item.attrId));
            this.categoryAttr.unselected = [...this.attribute.all.filter(item => !attrIds.has(item.id))];
        },
        async saveCategryAttribute() {
            this.categoryAttr.field.product_category_id = this.category.field.id;
            let response = await saveCategryAttributeApi(this.categoryAttr.field);
            if(response.status) {
                this.categoryAttr.field.attribute_id = null
                this.getAttrByCategory(this.category.field.id)
            } 
        }


    },

    mounted() {
        this.getCategoryAll()
        this.getAttributeAll()
    }
}
</script>
