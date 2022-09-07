<template>
  <div class="main-filter-container flex space-between">
    <div class="filter-container flex align-end">
      <label>
        <h4>name</h4>
        <el-input type="text" placeholder="search" v-model="filter.name" @input="setFilterBy" />
      </label>
      <label>
        <h4>type</h4>
        <el-select @change="setFilterBy" v-model="filter.type">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label>
        <h4>stock</h4>
        <el-select @change="setFilterBy" v-model="filter.inStock">
          <el-option v-for="item in stockOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </label>
    </div>
    <div class="sort-container flex align-end">
      <label>
        <h4>sort</h4>
        <el-select v-model="sortBy" @change="setSortBy" placeholder="">
          <el-option v-for="item in sortOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        name: '',
        inStock: 'All',
        type: 'All',
        test: [],
      },
      labels: [
        'On wheels',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ],
      sortBy: '',
      typeOptions: [
        {
          value: 'All',
          label: 'all',
        },
        {
          value: 'Educational',
          label: 'edu',
        },
        {
          value: 'Funny',
          label: 'funny',
        },
        {
          value: 'Adult',
          label: 'adult',
        },
      ],
      sortOptions: [
        {
          value: 'name',
          label: 'name',
        },
        {
          value: 'price',
          label: 'price',
        },
      ],
      stockOptions: [
        {
          value: 'All',
          label: 'all',
        },
        {
          value: true,
          label: 'inStock',
        },
        {
          value: false,
          label: 'outStock',
        },
      ],
    };
  },
  methods: {
    setFilterBy() {
      var filter = this.filter;
      console.log(filter);
      this.$store.commit({
        type: 'setFilterBy',
        filterBy: JSON.parse(JSON.stringify(filter)),
      });
      this.$store.dispatch('loadToys');
    },
    setSortBy() {
      this.$store.commit({
        type: 'sortBy',
        sortBy: JSON.parse(JSON.stringify(this.sortBy)),
      });
    },
  },
};
</script>
