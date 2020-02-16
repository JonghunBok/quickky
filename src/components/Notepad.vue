<template>
  <div class="notepad h-56 border-double border-b-8">
    <textarea class="box-border w-full h-full py-4 px-6 bg-orange-100"></textarea>
  </div>
</template>

<script>

export default {
  name: 'Notepad',
  components: {
  },
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
</style>
