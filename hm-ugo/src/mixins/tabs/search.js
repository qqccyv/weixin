import wepy from 'wepy';
const KEYWORD = 'SEARCH_KEYWORD'
export default class extends wepy.mixin {
  data = {
    // 输入框默认值。
    value: '',
    // 搜索建议列表。
    suggestList: [],
    searchList: []
  };

  onLoad() {
    this.searchList = wx.getStorageSync(KEYWORD) || []
    console.log(this.searchList);
    
  }

  timer = 0

  methods = {
    // 输入关键字的事件。
    onChange({ detail }) {
      // console.log(detail);

      clearTimeout(this.timer);
      detail.trim().length !== 0 ? (this.timer = setTimeout(() =>
        this.getSuggestList(detail)
        , 700)) : (this.suggestList = []); // ??????????????????
      this.value = detail.trim()
    },

    // 回车之后触发的搜索事件。
    onSearch({ detail }) {
      const keyword = detail.trim();
      this.searchList = [...new Set([keyword, ...this.searchList])].slice(0, 10)
      keyword && wepy.setStorageSync(KEYWORD, this.searchList)
      // return 
      keyword ? wepy.navigateTo({
        url: '/pages/goods_list?query=' + keyword
      }) : wepy.$toast('请输入关键字！');
    },

    // 搜索取消。
    onCancel() { },

    goGoodsDetail(id) {
      wepy.navigateTo({
        url: '/pages/goods_detail/main?goods_id=' + id
      })
    },

    goGoodsList(query){
      
      
      wepy.navigateTo({
        url: '/pages/goods_list?query=' + query
      })
    },

    clearHistory(){
      console.log(1);
      wepy.setStorageSync(KEYWORD, this.searchList=[])
    }
  };

  // 获取建议列表。
  async getSuggestList(keyword) {
    const { data: res } = await wepy.get('/goods/search', { query: keyword });

    if (res.meta.status === 200) {
      this.suggestList = res.message.goods;
      this.$apply();
    } else wepy.$toast();
  }
}