<template>
  <li class="toy-preview-container flex space-between" @click="showToyDetails">
    <div class="toy-preview-info flex column space-between">
      <div>
        <h3>{{ toy.name }}</h3>
      </div>
      <h4>{{ toy.price }}</h4>
    </div>
    <div class="toy-preview-btns flex column space-between">
      <!-- <router-link @click.native.stop :to="'toy/edit/' + toy._id" class="btn">
        edit
      </router-link> -->
      <button @click="toEdit(toy._id)">Edit</button>
      <button class="btn" @click.stop="removeToy">X</button>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      toy: Object,
    },
    methods: {
      showToyDetails() {
        this.$router.push('/toy/' + this.toy._id);
      },
      toEdit(toyId) {
        this.$router.push(`/toy/edit/${toyId}`);
      },
      removeToy() {
        this.$store.dispatch({
          type: 'removeToy',
          toyId: this.toy._id,
        });
      },
    },
  };
</script>
