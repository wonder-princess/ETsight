<template>
  <div>
    <b-button
      class="book-registration__show-btn"
      variant="outline-success"
      v-b-modal.book-registration
    >
      <b-icon-bookmark-plus></b-icon-bookmark-plus> 書籍の登録
    </b-button>
    <b-modal
      id="book-registration"
      hide-footer
      title="書籍の登録"
    >
      <b-form>
        <b-form-group class="mb-4">
          <label for="title">タイトル</label>
          <b-form-input
            id="title"
            v-model="title"
            required
            type="text"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group class="mb-4">
          <label for="file-uploader">表紙画像</label>
          <b-form-file
            id="file-uploader"
            v-model="imageFile"
            accept="image/*"
            browse-text="参照"
            class="mb-2"
            drop-placeholder="ファイルをここにドラッグ&ドロップしてください"
            placeholder="画像ファイルを選択してください"
            required
          >
          </b-form-file>
          <b-img
            :blank="!imageFileEncoded"
            blank-color="#ccc"
            height="80"
            :src="imageFileEncoded"
            alt="アップロード画像"
          >
          </b-img>
        </b-form-group>
        <b-button
          block
          class="mt-3"
          type="submit"
          variant="outline-success"
        >
          保存する
        </b-button>
      </b-form>
    </b-modal>

  </div>
</template>

<script>
import {
  BButton,
  BForm,
  BFormFile,
  BFormGroup,
  BFormInput,
  BIconBookmarkPlus,
  BImg,
  BModal,
  VBModal,
} from 'bootstrap-vue';

const encodeImage = (file) => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.onloadend = (event) => resolve(event.target.result);
    reader.readAsDataURL(file);
  });
};
export default {
  components: {
    BButton,
    BForm,
    BFormFile,
    BFormGroup,
    BFormInput,
    BIconBookmarkPlus,
    BImg,
    BModal,
  },

  directives: { 'b-modal': VBModal },

  data() {
    return {
      imageFile: null,
      imageFileEncoded: '',
      isValidImageFile: null,
      title: '',
    };
  },

  watch: {
    imageFile() {
      if (this.imageFile) {
        encodeImage(this.imageFile)
          .then((res) => {
            this.imageFileEncoded = res;
            this.isValidImageFile = true;
          })
          .catch((err) => {
            this.isValidImageFile = false;
            console.error(err.message);
          });
      } else {
        this.isValidImageFile = null;
      }
    },
  },
};
</script>

<style scoped>
.book-registration__show-btn {
  font-size: 1.2rem;
}
</style>
