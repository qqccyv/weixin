import wepy from 'wepy';

export default class extends wepy.mixin {
    data = {
        // 输入框默认值。
        value: '',
        // 搜索建议列表。
        suggestList: []
    };

    timer = 0

    methods = {
        // 输入关键字的事件。
        onChange({ detail }) {
            clearTimeout(this.timer);
            detail ? (this.timer = setTimeout(() => this.getSuggestList(detail), 700)) : (this.suggestList = []); // ??????????????????
        },

        // 回车之后触发的搜索事件。
        onSearch({detail}) {
            const keyword = detail.trim();
            keyword ? wepy.navigateTo({
                url: '/pages/goods_list?query=' + keyword
            }) : wepy.$toast('请输入关键字！');
        },

        // 搜索取消。
        onCancel() { },

        goGoodsDetail(id){
            wepy.navigateTo({
                url: '/pages/goods_detail/main?goods_id=' + id
            })
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