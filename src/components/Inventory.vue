<template>
  <div class="inventory ">
    <div class="grid grid-cols-5 h-full">
      <div class="h-20"
           v-for="i in numbrs"
           :key="i">
        <inventory-box :index="i"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InventoryBox from '@/components/InventoryBox.vue'

export default {
  name: 'Inventory',
  props: {
  },
  components: {
    InventoryBox
  },
  data () {
    return {
      numbrs: [1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11, 12, 13, 14, 15,
        16, 17, 18, 19, 20,
        21, 22, 23, 24, 25]
    }
  },

  methods: {
    ...mapActions(['getS3Object', 'getInventory'])
  },

  async mounted () {
    this.getS3Object()
    console.log(this.getInventory())
  }
}
</script>
