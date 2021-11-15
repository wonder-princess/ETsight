<template>
  <b-container>
    <b-row>
      <b-col>
        <b-navbar>
          <b-navbar-brand href="./index.html">
            <img src="@/assets/logo.png" alt="Bookshelf" />
          </b-navbar-brand>
          <shelf-modal
            class="ml-auto"
            @add-book="onAddBook"
          >
          </shelf-modal>
        </b-navbar>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BCol,
  BContainer,
  BNavbar,
  BNavbarBrand,
  BRow,
} from 'bootstrap-vue';
import ShelfModal from '@/components/ShelfModal.vue';

export default {
  components: {
    BCol,
    BContainer,
    ShelfModal,
    BNavbar,
    BNavbarBrand,
    BRow,
  },
  methods: {
    onAddBook(book) {
      this.$emit('add-book', book);
    },
  },
};
</script>
