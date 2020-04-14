<template>
  <div class="box-wrapper">
    <form enctype="multipart/form-data"
          :class="classObject"
          ref="Form"
          @dragend.prevent.stop
          @drop.prevent.stop="uploadBox"
          @submit.prevent="uploadBox"
          @dragenter.prevent="dragin"
          @dragleave.prevent="dragout"
          @dblclick.prevent.stop="onClick"
          @click.right.prevent="downloadBox">
      <div class="box_input">
        <input class="box__file" name="files[]" type="file" multiple
               ref="inputFile"
               :id="'input' + index"
               @change="onChange" />
        <label for="file"><span class="box__dragndrop">
            {{ box }}
          </span></label>
        <button class="box__button" type="submit" ref="uploadButton" ></button>
      </div>
      <div class="box__uploading">Up</div>
      <div class="box__success">D</div>
      <div class="box__error">e!</div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'InventoryBox',
  props: {
    index: Number
  },
  computed: {
    box () {
      return this.getBox()(this.index)
    },
    classObject () {
      return {
        occupied: this.box,
        box: true
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapGetters(['getBox']),
    ...mapActions(['uploadFile', 'getFileUrl', 'getInventory']),
    printFile (e) {
      console.log(this.index)
      console.log(this.box)
    },

    onClick (e) {
      console.log('onclicke: ', e)
      this.$refs.inputFile.click()
    },

    onChange (e) {
      this.$refs.uploadButton.click()
    },

    async uploadBox (e) {
      const files = e.dataTransfer
        ? e.dataTransfer.files
        : this.$refs.inputFile.files

      const file = files[0]

      console.log('files: ', files)
      console.log('file: ', file)
      const index = this.index

      await this.uploadFile({ index, file })
      await this.getInventory()
    },

    downloadBox (e) {
      console.log(this.box)
      for (let i = 0; i < this.box.length; i++) this.downloadFile(this.box[i].Key)
    },

    async downloadFile (key) {
      const fileUrl = await this.getFileUrl(key)
      console.log(fileUrl)

      window.open(fileUrl)

      /* TODO: Make this work with multiple files
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = fileUrl
      a.download = this.box.key
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(fileUrl)
      */
    },

    dragin (e) {
      this.classObject['is-dragover'] = true
    },

    dragout (e) {
      this.classObject['is-dragover'] = false
    },

    isAdvancedUpload () {
      const div = document.createElement('div')
      return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window
    }
  }
}
</script>

<style lang="scss">
.box-wrapper {
  height: 100%;
}

.box {
  width: 100%;
  height: 100%;
  border: #e2e8f0 1px solid;
}

.box.occupied {
  background-color: grey;
}

.box:hover {
  background-color: grey;
}

.box_input {
  width: 100%;
  height: 100%;
}

.box_input label {
  display: block;
  width: 100%;
  height: 100%;
}

.box__file {
  display: none;
}

.box__button {
  display: none;
}

.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}

.box.is-dragover {
  background-color: grey;
}

.box.has-advanced-upload {
  background-color: white;
  outline: 2px dashed black;
  outline-offset: -10px;
}

.box.has-advanced-upload .box__dragndrop {
  display: inline;
}

</style>
