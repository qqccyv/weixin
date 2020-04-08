import wepy from "wepy"


export default class extends wepy.mixin {

  data = {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
    goodsList: [],
    total: 1,
    isLoading: false
  }

  computed = {
    canLoading() {
      return this.goodsList.length < this.total
    }
  }

  methods= {
    goGoodsDetail(id){
      console.log(1);
      
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id='+id
      })
    }
  }

  onLoad({ query = '', cid = '' }) {
    this.query = query
    this.cid = cid
    this.getGoodsList()

  }

  async getGoodsList(cb) {
    this.isLoading = true
    const { query, cid, pagenum, pagesize } = this
    const { data: res } = await wepy.get('/goods/search', { query, cid, pagenum, pagesize })
    console.log(res);
    if (res.meta.status == 200) {
      this.goodsList = this.goodsList.concat(res.message.goods)
      this.total = res.message.total
      this.$apply()
      console.log(this.goodsList);
    } else wepy.$toast()
    this.isLoading = false
    cb && cb()
  }

  onReachBottom() {
    if(this.isLoading) return 
    if (this.canLoading) {
      this.pagenum++
      this.getGoodsList()
    }

  }

  onPullDownRefresh(){
    this.pagenum= 1
    this.total= 0
    this.goodsList = []
    this.isLoading = false
    this.getGoodsList(()=>wepy.stopPullDownRefresh())
  }
}