import wepy from "wepy"


export default class extends wepy.mixin {

  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    goodsList: [],
    total: 1
  }

  computed = {
    canLoading() {
      return this.goodsList.length < this.total
    }
  }
  onLoad({ query = '', cid = '' }) {
    this.query = query
    this.cid = cid
    this.getGoodsList()

  }

  async getGoodsList() {
    const { query, cid, pagenum, pagesize } = this
    const { data: res } = await wepy.get('/goods/search', { query, cid, pagenum, pagesize })
    console.log(res);
    if (res.meta.status == 200) {
      this.goodsList = this.goodsList.concat(res.message.goods)
      this.total = res.message.total
      this.$apply()
      console.log(this.goodsList);
    } else wepy.$toast()

  }

  onReachBottom() {
    if (this.canLoading) {
      this.pagenum++
      this.getGoodsList()
    }

  }
}