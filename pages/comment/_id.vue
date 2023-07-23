<template>
  <div class="comment">
    <div class="comment__inner">
      <div class="comment__flexbox">
        <BaseInfoCard :info="comment" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentPage',
  async asyncData({ $api, params }) {
    let comment = await $api.comments.getById(params.id)

    if (!comment) {
      comment = []
      return comment
    }
    return { comment }
  },
}
</script>

<style lang='scss' scoped>
.comment {
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