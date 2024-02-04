<template>
  <div>
    <input :id="id" type="hidden" :value="input" name="content">
    <!-- updated here -->
    <trix-editor :input="id"></trix-editor>
  </div>
</template>

<script>
import Input from "../../../mixins/input";
/**
 * Full Wysiwyg HTML editor examples by using Trix
 * 
 * https://codesandbox.io/s/react-pyqk0v?file=/src/App.js:149-156
 * https://codesandbox.io/s/trix-demo-h5n8g?file=/src/components/TrixComponent.vue
 */
export default {
  mixins: [Input],
  props: {
    /**
     * Editor id: must be change for every inputs
     */
    id: {
      type: String,
      default: "trix_editor_",
    }
  },
  methods: {
    setValue(e) {
      this.input = document.getElementById(this.id).value;
    },
  },
  mounted() {
    document.addEventListener("trix-change", this.setValue);
  },
  beforeDestroy: function() {
    document.removeEventListener("trix-change", this.setValue);
  },
  updated() {
    this.update(this.input);
  }
};
</script>