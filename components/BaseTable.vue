<template>
  <table class="table">
    <thead class="table__thead">
      <tr class="table__thead-tr">
        <th :class="['table__th', 'table__th_sortable', { 'table__th_sortable-up': sortByIdAscent }]" @click="toggleSortMethod">Id</th>
        <th class="table__th">Name</th>
        <th class="table__th">Email</th>
      </tr>
    </thead>
    <tbody class="table__tbody">
      <tr v-for="item of sortedItems" :key="item.id" @click="pushTo(item.id)" class="table__tr">
        <td class="table__td">{{ item.id }}</td>
        <td class="table__td">{{ item.name }}</td>
        <td class="table__td">{{ item.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => ({
    sortByIdAscent: true,
  }),
  props: {
    items: { type: Array, required: true }
  },
  methods: {
    pushTo(id) {
      this.$router.push({ path: 'comment/' + id });
    },
    toggleSortMethod() {
      this.sortByIdAscent = !this.sortByIdAscent
    },
  },
  computed: {
    sortedItems() {
      if (this.sortByIdAscent) {
        return this.items
      }
      else {
        return [...this.items].sort((a, b) => b.id - a.id)
      }
    }
  },
}
</script>

<style lang='scss' scoped>
.table {
  display: block;
  font-family: 'Inter';
  border-collapse: collapse;
  border-radius: 1em;
  overflow: hidden;
  min-width: 700px;
  width: 700px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);

  &__thead {
    display: block;
    border-bottom: 1px solid #E1CFFF;
    background: #e9e9e9;
    border-radius: 10px 10px 0 0;
  }

  &__thead-tr {
    border-radius: inherit;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(40px, 10%) 50% 40%;
    align-items: center;
  }

  &__th {
    color: #0F1419;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 146%;
    padding: 15px 0px;
    text-align: start;
    padding: 15px min(15px, 10%);

    &:nth-child(1) {
      padding: 0 5% 0 15%;
      width: max(40px, 10%);
    }

    &:nth-child(n+2) {
      width: 45%;
    }

    &_sortable {
      cursor: pointer;

      &::after {
        content: '↓';
        display: inline-block;
        transition: transform 0.2s linear;
      }
    }

    &_sortable-up {
      &::after {
        transform: rotate(180deg);
      }
    }
  }

  &__tbody {
    display: block;
    background: #FFF;
  }

  &__tr {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(40px, 10%) 50% 40%;
    align-items: center;
    color: #333;
    height: 50px;
    cursor: pointer;
    box-sizing: border-box;
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: transparent;

    &:hover {
      color: #4005A0;
      background-color: #EEE3FF;
      border-top: 1px solid #E1CFFF;
      border-bottom: 1px solid #E1CFFF;

      & .table__td {
        font-weight: 600;
      }
    }
  }

  &__td {
    box-sizing: border-box;
    font-size: 13px;
    font-style: normal;
    line-height: 50px;
    font-weight: 400;
    height: 100%;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 min(15px, 10%);

    &::after {
      content: attr(data-text);
      content: attr(data-text) / "";
      height: 0;
      visibility: hidden;
      overflow: hidden;
      user-select: none;
      pointer-events: none;
      font-weight: 600;

      @media speech {
        display: none;
      }
    }

    &:nth-child(1) {
      padding: 0 5% 0 15%;
    }
  }
}
</style>