import wepy from 'wepy'

export default class extends wepy.mixin {
  data = {
    cateList: [],
    active: 0,
    windowHeight: 0,
    top: 0
  }

  methods= {
    onChange({detail}){
      console.log(detail);
      this.top = !this.top
    },
     //跳转产品列表页面
  goGoodsList(id){
    wepy.navigateTo({
      url: '/pages/goods_list?cid=' + id
    })
  }
  }

  computed= {
    secondCateList(){
      const {cateList,active} = this
      return cateList[active] && cateList[active].children
    }
  }

  onLoad() {
    this.getCateList()
    this.getWindowHeight()
  }

 

  // 获取运行设备视图高度
  getWindowHeight(){
   const {windowHeight} =  wepy.getSystemInfoSync()
   this.windowHeight = windowHeight
  }

  // 获取分类列表
  async getCateList() {
    // console.log(1);

    const { data: res } = await wepy.get('/categories')

    if (res.meta.status === 200) {
      // 将数据赋值到页面 data 中。
      this.cateList = res.message;
      console.log(this.cateList);

      this.$apply();
    } else wepy.$toast();

  }
}