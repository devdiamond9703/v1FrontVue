<template>
    <v-row>
        <v-col class="text-left">
            <h2>Product List</h2>
        </v-col>
        <v-col class="text-right">        
            <v-btn color="success" icon="mdi-plus" @click="product.dialog.add = true" ></v-btn>    
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="product.page"
                :headers="product.headers"
                :items="product.all"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn size="small" class="me-3" color="primary" @click="getVariantsByProduct(item.raw)">
                        Variants
                    </v-btn>
                    <v-icon size="small"
                        class="me-2"
                        color="primary"
                        @click="editProduct(item.raw)"
                    >
                        mdi-pencil
                    </v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-row>
        <v-dialog v-model="product.dialog.add" width="700">
            <v-card>
                <v-card-title>
                    <h3 v-if="product.field.id">Update product</h3>
                    <h3 v-else>Add product</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-select
                            v-model="product.field.product_category_id"
                            :items="category.all"
                            item-value="id"
                            item-title="name"
                            label="Category"
                            variant="outlined"
                        ></v-select>
                        <v-text-field
                            v-model="product.field.name"
                            label="Product Name"
                            variant="underlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="product.field.description"
                            label="Product Description"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="closeBtn">
                        Close
                    </v-btn>
                    <v-btn v-if="product.field.id" color="blue" variant="text" @click="updateProduct">
                        Update
                    </v-btn>
                    <v-btn v-else color="blue" variant="text" @click="saveProduct">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row>
        <v-dialog v-model="productVariant.dialog.list" width="900">
            <v-card>
                <v-card-title class="d-flex">
                    <v-col class="text-left">
                        <h3>Product variant</h3>
                    </v-col>
                    <v-col class="text-right">
                        <v-btn color="success" icon="mdi-plus" @click="createProductVariant" ></v-btn>    
                    </v-col>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-data-table
                            :headers="productVariant.headers"
                            :items="productVariant.all"
                            :hide-default-footer="true"
                        >
                            <template v-slot:item.actions="{ item }">                                
                                <v-icon size="small"
                                    class="me-2"
                                    color="primary"
                                    @click="editProductVariant(item.raw)"
                                >
                                    mdi-pencil
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="productVariant.dialog.list = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {
        getProductsAllApi, 
        saveProductApi,
        getVariantsByProductApi
    } from '../../api/product/index.js'
    import {getCategoryAllApi} from '../../api/category/index.js'
    export default {
        data() {
            return {
                product: {
                    page: 10,
                    all: [],
                    headers: [
                        { title: 'Category Name', align: 'start', sortable: false, key: 'productCatName'},
                        { title: 'Product Name', align: 'start', sortable: false, key: 'productName'},
                        { title: 'Description', align: 'start', sortable: false, key: 'productDescription'},
                        { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                    ],
                    dialog: {
                        add: false
                    },
                    field: {
                        id: null,
                        product_category_id: null,
                        name:null,
                        description: null
                    },
                    defaultField: {
                        id: null,
                        product_category_id: null,
                        name:null,
                        description: null
                    }
                },
                productVariant: {
                    productField: {
                        product_cat_id: null,
                        product_cat_name: null,
                        product_id: null,
                        product_name:null
                    },
                    all: [],
                    dialog: {
                        list: false,
                        add: false
                    },
                    headers: [
                        { title: 'Name', align: 'start', key: 'name'},
                        { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                    ]
                },
                category: {
                    all: []
                }
            }
        },

        methods: {
            closeBtn() {
                this.product.dialog.add = false,
                this.product.field = {...this.product.defaultField}
            },
            async getProductsAll() {
                this.product.all = await getProductsAllApi();
            },
            async getCategoryAll() {
                this.category.all = await getCategoryAllApi();
            },
            async saveProduct() {
                let response = await saveProductApi(this.product.field);
                if(response.status) {
                    this.getProductsAll(),
                    this.product.dialog.add = false,
                    this.product.field = {...this.product.defaultField}
                }
            },
            editProduct(item) {
                this.product.dialog.add = true
                this.product.field.id = item.productId
                this.product.field.product_category_id = item.productCatId
                this.product.field.name = item.productName
                this.product.field.description = item.productDescription
            },

            async updateProduct() {
                let response = await saveProductApi(this.product.field);
                if(response.status) {
                    this.getProductsAll(),
                    this.product.dialog.add = false,
                    this.product.field = {...this.product.defaultField}
                }
            },

            async getVariantsByProduct(item) {
                this.productVariant.productField.product_cat_id = item.productCatId
                this.productVariant.productField.product_cat_name = item.productCatName
                this.productVariant.productField.product_id = item.productId
                this.productVariant.productField.product_name = item.productName
                this.productVariant.dialog.list = true
                this.productVariant.all = await getVariantsByProductApi(item.productId);
            },
            
            createProductVariant() {
                
            }

        },

        mounted() {
            this.getProductsAll()
            this.getCategoryAll()
        }

    }
</script>
