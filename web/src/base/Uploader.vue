<template>
    <div class="file-upload">
      <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
        <slot v-if="fileStatus === 'loading'" name="loading">
          <button class="btn btn-primary" disabled>正在上传...</button>
        </slot>
        <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
          <button class="btn btn-primary">上传成功</button>
        </slot>
        <slot v-else name="default">
          <button class="btn btn-primary">点击上传</button>
        </slot>
      </div>
      <input ref="fileInput"
        type="file"
        class="file-input d-none"
        @change="handleFileChange"/>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, PropType, ref, watch } from 'vue'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    },
    uploaded: {
      type: Object
    }
  },
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>()
    const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready')
    const uploadedData = ref(props.uploaded)

    // 这里要利用一个watch，来回显已经上传的图片
    // 不用watch，由于是组件的属性，是异步请求传过来的会报错
    watch(() => props.uploaded, (newValue) => {
      if (newValue) {
        fileStatus.value = 'success'
        uploadedData.value = newValue
      }
    })
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      const files = currentTarget.files

      if (files) {
        const uploadedFiles = Array.from(files)
        const uploadedFile = uploadedFiles[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadedFile)
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', uploadedFile)
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((resp) => {
          fileStatus.value = 'success'
          uploadedData.value = resp.data
          context.emit('file-uploaded-success', resp.data)
        }).catch(error => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      triggerUpload,
      handleFileChange,
      fileStatus,
      fileInput,
      uploadedData
    }
  }
})
</script>

<style lang="css">
</style>
