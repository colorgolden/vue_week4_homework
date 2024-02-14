export default {
    props:['pages', 'getProducts'],
    template: `      
    <nav aria-label="...">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: pages.has_pre==false }">
        <a class="page-link" href="#" @click="getProducts(pages.current_page-1)">上一頁</a>
      </li>
      <li class="page-item" :class="{ active:page === pages.current_page }" v-for="page in pages.total_pages" :key="page + 123">
        <a class="page-link" href="#" @click="getProducts(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: pages.has_next === false }">
        <a class="page-link" href="#" @click="getProducts(pages.current_page+1)">下一頁</a>
      </li>
    </ul>
  </nav>`
}