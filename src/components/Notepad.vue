<template>
  <div
    class="notepad h-56 border-double border-b-8"
    @click.right="onClick">
    <textarea
       v-model="memo"
       @keyup="onChange"
       :disabled="isLoading"
       class="box-border w-full h-full py-4 px-6 bg-orange-100">
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Notepad',

  data () {
    return {
      memo: '',
      isLoading: true
    }
  },

  computed: {
    ...mapGetters(['getMemo'])
  },

  props: {
    msg: String
  },

  methods: {
    ...mapActions(['getMemoContent', 'putMemoContent']),

    onChange: _.debounce(function () {
      this.putMemoContent(this.memo)
    }, 400),

    async onClick () {
      await this.getMemoContent()
    }
  },

  async mounted () {
    await this.getMemoContent()

    this.memo = this.getMemo.Body
    this.isLoading = false
  }
}
</script>
