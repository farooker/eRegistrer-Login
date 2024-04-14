<template>

    <div style="background-color: lightgrey">
  <v-row align="center">
    <v-col cols="6">
      <v-row no-gutters>
        <v-col
          class="d-flex"
          cols="12"
          style="
            height: 100vh;
            background-image: url('/BG2-02.png');
            background-size: cover;
            background-position: center;
          "
        >
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="6">

    </v-col>
  </v-row>

  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
