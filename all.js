// Initialization for ES Users

import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';
import productModal from './productModal.js';

const url = 'https://vue3-course-api.hexschool.io'; // 請加入站點
const path = 'colorgolden'; // 請加入個人 API Path

let delProductModal = null;

const app = {
  data() {
    return { 
      temp:{},
      products:[],
      data_id: '',
      data_name: '',
      pages: {},
      user: {
        username: '',
        password: '',
      },
      addNew: false,
      newProduct :{
         is_enabled: 1,
         imageUrl: "",
         imagesUrl: [
         "",
         ],
        },
     }
  },

  mounted() {
     delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    });
  },

  methods: {

    login() {

      // #2 發送 API 至遠端並登入（並儲存 Token）
      axios.post(`${url}/v2/admin/signin`, this.user)
        .then((res) => {
          alert(res.data.message);
          const { token, expired } = res.data;          // 寫入 cookie token
          document.cookie = `newToken=${token}; expires=${new Date(expired)};`;    // expires 設置有效時間
          window.location.href = 'admin_products.html'; //跳轉到products頁面
        })
        .catch((error) => {
          (error.data.message);
        })
    },

    checkLogin() {
      // #3 取得 Token（Token 僅需要設定一次）
      
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)newToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      if (!window.location.href.includes('index.html')) {  //只要不是在index頁面，就執行大括號內的程式碼
        // #4  確認是否登入
        axios.post(`${url}/v2/api/user/check`, {}, { headers: { 'Authorization': token } })
          .then((res) => {

          })
          .catch((error) => {
            alert("尚未登入會員，請重新登入！");
            window.location.href = 'index.html'; //跳轉到login頁面
            return;
          })
      } else {
        return;
      }
    },

    getProducts(page = 1) {
      // #5 取得後台產品列表
      
      axios.get(`${url}/v2/api/${path}/admin/products?page=${page}`)
        .then((res) => {
          // 將res.data.products設定到Vue的products陣列中
          this.products = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },

    showModal(addNew, product) {
    
      if (addNew === "addNew") {
        this.newProduct = {
          imagesUrl: [],
        };
        this.addNew = true;
        this.$refs.pdModal.openModal();
        
      } else if (addNew === "edit") {
        this.addNew = false;
        this.newProduct = { ...product };
        this.$refs.pdModal.openModal();

      } else if (addNew === "delete") {
        delProductModal.show();
        this.addNew = false;
        this.newProduct = { ...product };
        this.data_id = product.id;
        this.data_name = product.title;
      }
    },



    delProduct(id){
      axios.delete(`${url}/api/${path}/admin/product/${id}`)
      .then((res) => {
        alert(res.data.message);
        this.getProducts(); //重新取得產品資料
      })
      .catch((error) => {
        alert(error);
      })
    },

    addNewProduct() {
      // #6 新增單一產品資訊
      axios.post(`${url}/v2/api/${path}/admin/product`,{ data: this.newProduct })
        .then((res) => {
          alert(res.data.message);
          this.getProducts();
          this.$refs.pdModal.closeModal();
        })
        .catch((error) => {
          alert(error.data.message);
        })
    },

    updateProduct() {
      // #7 更新單一產品資訊
      axios.put(`${url}/v2/api/${path}/admin/product/${this.newProduct.id}`,{ data: this.newProduct })
        .then((res) => {
          alert(res.data.message);
          this.getProducts();
          productModal.hide();
          this.$refs.pdModal.closeModal();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
    },

    addImagesUrl(){
      // #8 新增圖片
      this.newProduct.imagesUrl = [];
      this.newProduct.imagesUrl.push('');
    },
  },
  created() {  
    this.checkLogin();
    this.getProducts(); 
  },
  components: {
    pagination,
    productModal,
  },

}

// Use createApp to create the Vue app
const vueApp = createApp(app);

// Mount the app to the specified element
vueApp.mount('#app');





