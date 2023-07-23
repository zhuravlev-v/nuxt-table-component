<template>
  <div class="home">
    <div class="home__inner">
      <div class="home__flexbox">
        <BaseTable :items="paginatedComments" />
        <BasePagination :pageCount="pageCount" :currentPage="page" @newValue="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    page: 1,
    pageLimit: 10,
  }),
  async asyncData({ $api }) {
    const comments = await $api.comments.getAll()
    return { comments }
  },
  created() {
    if (this.$route.query.page) {
      this.page = +this.$route.query.page
    }
    else {
      this.$router.push(`${this.$route.path}?page=1`)
    }
  },
  methods: {
    changePage(value) {
      this.page = value
      this.$router.push({ path: `${this.$route.path}?page=${value}` })
    }
  },
  computed: {
    paginatedComments() {
      const first = this.pageLimit * (this.page - 1)
      const last = this.pageLimit * this.page
      return this.comments.slice(first, last)
    },
    pageCount() {
      let length = this.comments?.length;
      if (!length) return 0
      return Math.ceil(length / this.pageLimit);
    }
  },
}
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__inner {
    max-width: 1290px;
    padding: 0 30px 30px 30px;
    overflow-x: auto;
  }

  &__flexbox {
    width: max-content;
    box-sizing: border-box;
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>