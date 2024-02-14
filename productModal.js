
export default {
    props:['addNew','newProduct','updateProduct','addImagesUrl','addNewProduct'],
    data(){
      return{
        modalProduct: null
      }
    },
    methods:{
      openModal(){
        this.modalProduct.show();
      },
      closeModal(){
        this.modalProduct.hide();
      }
    },
    template:
    `<div id="productModalabc" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="addNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
                 <div class="mb-3">
                    <label for="imageUrl" class="form-label">主要圖片</label>
                    <input id="imageUrl" v-model.lazy="newProduct.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入主要圖片連結">
                    <img style="max-width: 280px; max-height: 280px;" class="img-fluid" :src="newProduct.imageUrl">
                </div>
              <hr>
              <div v-if="Array.isArray(newProduct.imagesUrl)">
                <div class="mb-1" v-for="(img, index) in newProduct.imagesUrl" :key="index">
                  <div class="mb-3">
                    <label :for="'imagesUrl' + index" class="form-label">圖片網址</label>
                    <input :id="'imagesUrl' + index" v-model.lazy="newProduct.imagesUrl[index]" type="text" class="form-control"
                      placeholder="請輸入圖片連結">
                  </div>
                  <img class="img-fluid" :src="img">
                </div>
                <div >
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="newProduct.imagesUrl.push('')">
                    新增其他圖片
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="newProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImagesUrl">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" v-model="newProduct.title" type="text" class="form-control" placeholder="請輸入標題">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" v-model="newProduct.category" type="text" class="form-control"
                    placeholder="請輸入分類">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="unit" class="form-label">單位</label>
                  <input id="unit" v-model="newProduct.unit" type="text" class="form-control" placeholder="請輸入單位">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" v-model.number="newProduct.origin_price" type="number" min="0"
                    class="form-control" placeholder="請輸入原價">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" v-model.number="newProduct.price" type="number" min="0" class="form-control"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" v-model="newProduct.description" type="text" class="form-control"
                  placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="content" v-model="newProduct.content" type="text" class="form-control"
                  placeholder="請輸入說明內容">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" v-model="newProduct.is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <span v-if="addNew">
            <button type="button" class="btn btn-primary" @click="addNewProduct">
              確認
            </button>
          </span>  
          <span v-else>
            <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
          </span>
        </div>
      </div>
    </div>
  </div>`,
    mounted(){
      this.modalProduct = new bootstrap.Modal((this.$refs.productModal), {
        keyboard: false,
        backdrop: 'static'
      });
    }

}