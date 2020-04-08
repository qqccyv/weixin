import wepy from 'wepy';

export default class extends wepy.mixin {
    data = {
        sizeArray: ['黑色', '白色', '银色', '塑料'],
        sizeIndex: 0,
        goods_id: '',
        goodsDetail: {}
    };

    methods = {
        changeSize({ detail: { value } }) {
            this.sizeIndex = value;
        }
    };

    onLoad({ goods_id }) {
        this.goods_id = goods_id;
        this.getGoodsDetail()
    }

    async getGoodsDetail() {
        const { goods_id } = this;
        const { data: res } = await wepy.get('/goods/detail', { goods_id });

        if (res.meta.status === 200) {
            this.goodsDetail = res.message;
            this.$apply();
        } else wepy.$toast();
    }
}