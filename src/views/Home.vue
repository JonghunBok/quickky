<template>
  <div class="home">
    <Notepad />
    <Inventory />
  </div>
</template>

<script>
import Notepad from '@/components/Notepad.vue'
import Inventory from '@/components/Inventory.vue'

export default {
  name: 'Home',

  components: {
    Notepad,
    Inventory
  }
}
</script>
