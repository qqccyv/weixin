import wepy from 'wepy'

export default class extends wepy.mixin {
  data= {
    swiperList: [],
    cateList: [],
    floorList: []
   }
   onLoad(){
     this.getSwiperData()
     this.getCateList()
     this.getFloorList()
   }
   // 获取轮播图数据
  async getSwiperData(){
    const {data:res} = await wepy.get('/home/swiperdata')
   //  console.log(res);
    if(res.meta.status === 200){
      this.swiperList = res.message
      this.$apply()
    }else wepy.$toast()
   //  console.log(this.swiperList);
    
   }
   // 获取首页分类选项
   async getCateList(){
     const {data:res} = await wepy.get('/home/catitems')
      if(res.meta.status === 200){
      this.cateList = res.message
      this.$apply()
    }else wepy.$toast()
    // console.log(this.cateList);
   }
   // 获取楼层相关数据
   async getFloorList(){
    const {data:res} = await wepy.get('/home/floordata')
      if(res.meta.status === 200){
      this.floorList = res.message
      this.$apply()
    }else wepy.$toast()
    console.log(this.floorList);
   }
}