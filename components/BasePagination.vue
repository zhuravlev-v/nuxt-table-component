<template>
  <div class="pagination">
    <ul>
      <li @click="prevPage" :class="{ disabled: currentPage === 1 }">
        <span href="#" class="bullet">Previous</span>
      </li>
      <li v-for="count of shownBullet" :key="count" @click="pickPage(count)" :class="{ active: count === currentPage }">
        <span class="bullet">{{ count }}</span>
      </li>
      <li @click="nextPage" :class="{ disabled: currentPage === pageCount }">
        <span href="#" class="bullet">Next</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    ellipsisOffset: 1,
  }),
  props: {
    currentPage: { type: Number, required: true },
    pageCount: { type: Number, required: true },
  },
  methods: {
    nextPage() {
      const nextPage = this.currentPage + 1
      const value = Math.min(nextPage, this.pageCount)
      this.$emit('newValue', value)
    },
    prevPage() {
      const prevPage = this.currentPage - 1
      const value = Math.max(prevPage, 1)
      this.$emit('newValue', value)
    },
    pickPage(value) {
      if (isFinite(value)) {
        this.$emit('newValue', value)
      }
    }
  },
  computed: {
    shownBullet() {
      let totalDigits = new Array(this.pageCount).fill(null).map((item, index) => {
        return item = index;
      });

      for (let digit of totalDigits) {
        if (digit > this.currentPage + this.ellipsisOffset && digit != totalDigits[totalDigits.length - 1]) {
          totalDigits[digit] = "…";
        }
        if (digit < this.currentPage - this.ellipsisOffset && digit != totalDigits[0]) {
          totalDigits[digit] = "‥";
        }
      }
      totalDigits = [...new Set(totalDigits)];
      return totalDigits.map(digit => isFinite(digit) ? ++digit : digit);
    },
  },
}
</script>

<style lang='scss' scoped>
$main-color: #f0f0f0;
$secondary-color: #EEE3FF;

*,
*::after,
*::before {
  box-sizing: border-box;
}

.disabled {
  opacity: 0.7;
  pointer-events: none;
}

.pagination {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  font-size: 0.85em;
  width: 100%;
  border-radius: 10px;
  background: lighten($main-color, 5%);
  padding: 1rem;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
  counter-reset: pagination;
  text-align: center;
  user-select: none;

  &:after {
    clear: both;
    content: "";
    display: table;
  }

  ul {
    width: 100%;
  }
}

ul,
li {
  list-style: none;
  display: inline;
  padding-left: 0px;
}

li {
  &:hover {
    .bullet {
      color: #4005A0;
      background-color: $secondary-color;
      border: solid 1px $secondary-color;
    }
  }

  &.active {
    .bullet {
      color: #4005A0;
      background-color: $secondary-color;
      border: solid 1px $secondary-color;
    }
  }

  &:first-child {
    float: left;
  }

  &:last-child {
    float: right;
  }

  .bullet {
    border: solid 1px darken($main-color, 10%);
    border-radius: 0.2rem;
    color: darken($main-color, 45%);
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    text-align: center;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
  }
}
</style>