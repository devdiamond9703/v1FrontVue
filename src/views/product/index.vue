<template>
    <v-row>
        <v-col class="text-left">
            <h2>Product List</h2>
        </v-col>
        <v-col class="text-right">        
            <v-btn color="success" location="end" density='default' icon="mdi-plus"></v-btn>    
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="itemsPerPage"
                :headers="products.headers"
                :items="desserts"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon size="small"
                        class="me-2"
                        color="primary"
                        @click="viewItem(item.raw)"
                    >
                        mdi-eye
                    </v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
    import { getProductsOneApi, getProductsAllApi} from '../../api/product/index.js'
    export default {
        data() {
            return {
                itemsPerPage: 5,
                products: {
                    all: null,
                    one: {
                        "id": null, 
                        "title": null, 
                        "description": null, 
                        "price": null, 
                        "discountPercentage": null, 
                        "rating": null, 
                        "stock": null, 
                        "brand": null, 
                        "category": null, 
                        "thumbnail": null
                    },
                    headers: [
                        { title: 'Dessert (100g serving)', align: 'start', sortable: false, key: 'name'},
                        { title: 'Calories', align: 'end', key: 'calories' },
                        { title: 'Fat (g)', align: 'end', key: 'fat' },
                        { title: 'Carbs (g)', align: 'end', key: 'carbs' },
                        { title: 'Protein (g)', align: 'end', key: 'protein' },
                        { title: 'Iron (%)', align: 'end', key: 'iron' },
                        { title: 'Action', align: 'end', key: 'actions'},
                    ],
                },
                
                desserts: [
                    {
                        id: '1',
                        name: 'Frozen Yogurt',
                        calories: 159,
                        fat: 6.0,
                        carbs: 24,
                        protein: 4.0,
                        iron: '1'
                        
                    },
                    {
                        id: '2',
                        name: 'Jelly bean',
                        calories: 375,
                        fat: 0.0,
                        carbs: 94,
                        protein: 0.0,
                        iron: '0'                        
                    },
                    {
                        id: '3',
                        name: 'KitKat',
                        calories: 518,
                        fat: 26.0,
                        carbs: 65,
                        protein: 7,
                        iron: '6'                        
                    },
                    {
                        id: '4',
                        name: 'Eclair',
                        calories: 262,
                        fat: 16.0,
                        carbs: 23,
                        protein: 6.0,
                        iron: '7'                        
                    },
                ],
            }
                
        },

        methods: {
            async getProductsOne() {
                this.products.one = await getProductsOneApi();
            },
            async getProductsAll() {
                this.products.all = await getProductsAllApi();
            }
        },

        mounted() {        
            this.getProductsOne()
            this.getProductsAll()
        }

    }
</script>
