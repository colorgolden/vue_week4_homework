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
      pages: {},
      addNew: false,
      newProduct :{
        // title: '',
        // category: '',
        // origin_price: 0,
        // price: 300,
        // unit: "個",
        // description: "Sit down please 名設計師設計",
        // content: "這是內容",
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
      const username = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      console.log(username,password);
      const users = {
        username,
        password
      }
      
      
      // #2 發送 API 至遠端並登入（並儲存 Token）
      axios.post(`${url}/v2/admin/signin`, users)
        .then((res) => {
          console.log(res);
          console.log(username,password);
          window.location.href = 'admin_products.html'; //跳轉到products頁面
          const { token, expired } = res.data;
          document.cookie = `newToken=${token}; expires=${new Date(expired)};`;
        })
        .catch((error) => {
          console.log(username,password);
          console.dir(error);
        })
    },

    checkLogin() {
      // #3 取得 Token（Token 僅需要設定一次）
      
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)newToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      if (!window.location.href.includes('index.html')) {  //只要不是在admin_login頁面，就執行大括號內的程式碼
        // #4  確認是否登入
        axios.post(`${url}/v2/api/user/check`, {}, { headers: { 'Authorization': token } })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            alert("尚未登入會員，請重新登入！");
            window.location.href = 'admin_login.html'; //跳轉到login頁面
            console.dir(error);
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
          console.dir(error);
        })
    },

    showModal(addNew, product) {
    
      if (addNew === "addNew") {
        this.newProduct = {
          imagesUrl: [],
        };
        this.addNew = true;
        //productModal.show();
        this.$refs.pdModal.openModal();
      } else if (addNew === "edit") {
        this.addNew = false;
        // 將所選產品的值複製給 newProduct
        this.newProduct = { ...product };
        //productModal.show();
        this.$refs.pdModal.openModal();
      } else if (addNew === "delete") {
        this.addNew = false;
        this.newProduct = { ...product };
        delProductModal.show();
      }
    },



    delProduct(){
      axios.delete(`${url}/api/${path}/admin/product/${this.newProduct.id}`)
      .then((res) => {
        alert(res.data.message);
        this.getProducts(); //重新取得產品資料
        delProductModal.hide();
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
          //productModal.hide();
          this.$refs.pdModal.closeModal();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
    },

    updateProduct() {
      // #7 更新單一產品資訊
      axios.put(`${url}/v2/api/${path}/admin/product/${this.newProduct.id}`,{ data: this.newProduct })
        .then((res) => {
          alert(res.data.message);
          this.getProducts();
          //productModal.hide();
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
  }
}

// Use createApp to create the Vue app
const vueApp = createApp(app);

// Mount the app to the specified element
vueApp.mount('#app');





