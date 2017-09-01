new Vue({
    el:'.container',
    data:{
        limitNumber:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1,
        curAddress:'',

    },
    mounted:function(){
        this.$nextTick(function () {
            this.getAddressList()
        });
    },

    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNumber);
        }

    },
    methods:{
        getAddressList:function () {
            var _this=this;
            this.$http.get("data/address.json").then(function (response) {
                var res=response.data;
                if(res.status=="0"){
                    _this.addressList=res.result;
                }
            });
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else{
                    address.isDefault=false;
                }
            });

        },

        delAddress:function (item) {
            this.curAddress=item;
            var index=this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
        }
    },

})