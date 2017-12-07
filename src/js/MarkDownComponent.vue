<template>
    <div class="page-container">
        <a :href="backUrl" v-if="backUrl">&laquo; Back</a>
        <div class="content" v-html="content" v-cloak></div>
    </div>
</template>

<script type="text/javascript">
  import axios from 'axios';
  import marked from 'marked';

  export default {
    data() {
      return {
        content: null
      };
    },
    created() {
      this.updateData();
    },
    methods: {
      updateData() {
        axios.get(this.getUrl())
          .then(response => {
            this.content = marked(response.data);
          })
          .catch(response => {
            console.log(response.data);
          });
      },
      getUrl() {
        return `/docs${this.$route.fullPath}`;
      }
    },
    computed: {
      backUrl() {
        let parts = location.pathname.split('/').filter(item => item);

        if (!parts.length) {
          return false;
        }

        if (parts.length <= 1) {
          parts = [];
        } else {
          parts = parts.slice(0, parts.length - 1);
        }

        return '/' + parts.join('/');
      }
    }
  };
</script>
