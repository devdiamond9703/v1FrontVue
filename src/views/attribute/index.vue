<template>
    <v-row>
        <v-col class="text-left">
            <h2>Attribute List</h2>
        </v-col>
        <v-col class="text-right">        
            <v-btn color="success" location="end" density='default' icon="mdi-plus" @click="attribute.dialog.add = true"></v-btn>    
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="attribute.page"
                :headers="attribute.headers"
                :items="attribute.all"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn size="small" class="me-3" color="primary" @click="addAttributeValue(item.raw)">
                        Add value
                    </v-btn>
                    <v-icon size="small" color="primary" @click="editAttribute(item.raw)">
                        mdi-pencil
                    </v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="attribute.dialog.add" persistent width="600">
            <v-card>
                <v-card-title>
                    <span v-if="attribute.field.id" class="text-h5">Update attribute</span>
                    <span v-else class="text-h5">Add attribute</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="attribute.field.name"
                                    label="Attribute name"
                                    variant="underlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="closeBtn">
                        Close
                    </v-btn>
                    <v-btn v-if="attribute.field.id" color="blue-darken-1" variant="text" @click="updateAttribute">
                        Update
                    </v-btn>
                    <v-btn v-else color="blue-darken-1" variant="text" @click="saveAttribute">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="attributeValue.dialog.add" persistent width="700">
            <v-card>
                <v-card-title>
                <span class="text-h5">Add attribute value</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="attributeValue.field.attribute_name"
                                    label="Attribute Name"
                                    variant="solo"
                                    readonly
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="attributeValue.field.value"
                                    label="Attribute value"
                                    variant="underlined"
                                ></v-text-field>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn color="blue-darken-1"  @click="saveAttributeValue">
                                    Save
                                </v-btn>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-divider :thickness="7" class="border-opacity-50"></v-divider>
                            <v-col cols="12">
                                <v-data-table
                                    v-model:items-per-page="attributeValue.page"
                                    :headers="attributeValue.headers"
                                    :items="attributeValue.valuesByAttr"
                                >
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon size="small" color="primary" @click="editAttribute(item.raw)">
                                            mdi-pencil
                                        </v-icon>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="text" @click="attributeValue.dialog.add = false">
                        Close
                    </v-btn>                    
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

    import { 
        getAttributeAllApi, 
        saveAttributeApi,
        getValuesByAttrApi,
        saveAttrValueApi
    } from '../../api/attribute/index.js'
    
    export default {
        data() {
            return {
                attribute: {
                    page: 5,
                    all: [],
                    one: {
                        id: null,
                        name: null,
                        status: null
                    },
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'name'},
                        { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                    ],
                    dialog: {
                        add: false,
                        edit: false,
                    },
                    defaultField: {
                        id: null,
                        name: null,
                        type: 'select',
                    },
                    field: {
                        id: null,
                        name: null,
                        type: 'select',
                    }
                },
                attributeValue: {
                    page: 10,
                    valuesByAttr: [],
                    headers: [
                        { title: 'Attribute value', align: 'start', sortable: false, key: 'value'},
                        { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                    ],
                    dialog: {
                        add: false
                    },
                    field: {
                        id: null,
                        attribute_name: null,
                        attribute_id: null,
                        value: null,
                    }
                }
            }
        },

        methods: {
            // add and update attribute
            async getAttributeAll() {
                this.attribute.all = await getAttributeAllApi();
            },
            async saveAttribute() {
                this.attribute.dialog.add = false
                let response = await saveAttributeApi(this.attribute.field)

                if(response.status) {
                    this.attribute.all.push(response.data)
                }
            },
            editAttribute(item) {
                this.attribute.dialog.add = true
                this.attribute.field.id = item.id
                this.attribute.field.name = item.name
            },
            async updateAttribute() {
                this.attribute.dialog.add = false
                const response = await saveAttributeApi(this.attribute.field)
                if(response.status) {
                    for(let attribute of this.attribute.all) {
                        if(attribute.id === response.data.id) {
                            attribute.name = response.data.name;
                            attribute.type = response.data.type;
                            attribute.updated_at = response.data.created_at;
                            attribute.updated_at = response.data.updated_at;
                        }
                    }
                }
            },
            closeBtn() {
                this.attribute.dialog.add = false
                this.attribute.field = {...this.attribute.defaultField}
            },
            // add attribute value
            async addAttributeValue(item) {
                this.attributeValue.dialog.add = true
                this.attributeValue.field.attribute_id = item.id
                this.attributeValue.field.attribute_name = item.name
                this.attributeValue.valuesByAttr = await getValuesByAttrApi(item.id)
            },
            async saveAttributeValue() {
                let response = await saveAttrValueApi(this.attributeValue.field);
                if(response.status) {
                    this.attributeValue.field.value = null
                    this.attributeValue.valuesByAttr.push(response.data)
                }
            }

        },

        mounted() {
            this.getAttributeAll()
        }

    }
</script>
