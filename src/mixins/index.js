export default function () {
    return {
        filters: {
        },
        directives: {
        },
        computed: {
            // 计算屏幕比例
            isNormal() {
                const w = document.body.clientWidth;
                const h = document.body.clientHeight;
                const wh = w / h;
                if (wh > 2.5) {
                    return false;
                }
                return true;
            },
        },
        data() {
            return {

            };
        },
        methods: {

        },
        mounted() {


        },
    };
}
