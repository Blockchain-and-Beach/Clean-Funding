onload = function () {

    var userInformation = document.querySelector("#user-information");

    if (userId == "undefined") {
        userInformation.style.display = "none";
    }



    setInterval(function () {

        // 목표금액 + 승인된 금액
        approvedAmountServerCommunication();

    }, 1000);


    // var approvedAmount = document.querySelector("#approved-amount");

    // function approvedAmountServerCommunication() {
    //     let result;
    //     let path;
    //     let low, high;
                                        
    //     path = fetch("/" + title + approvedAmount);
    //     path = path.then(function (response) {
    //         return response.json();
    //     })
    //     path.then(function (myJSON) {
    //         low = myJSON.amount;
    //     });
        
    //     high = totarPrice;

    //     // result = low * 100 / high;

    //     approvedAmount.style.width = (low * 100 / high) + "%";
    // }

    var approvedAmount = document.querySelector("#approved-amount");

    function approvedAmountServerCommunication() {
        let result;
        let path;
        let low, high;
                                        
        path = fetch("/" + title + approvedAmount);
        path = path.then(function (response) {
            return response.json();
        })
        path.then(function (myJSON) {
            low = myJSON.amount;
        });
        
        high = totarPrice;

        // result = low * 100 / high;

        approvedAmount.style.width = (low * 100 / high) + "%";
    }

    // 숫자에 콤마 붙여줌
    function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
    }
};




/*
    $(function(){
        var selectugtCtt = document.getElementById("mophnNo-prefix-ugtCtt");
        var valueugtCtt = document.getElementById("mophnNo-mask-ugtCtt");

        if(selectugtCtt.value == "" || selectugtCtt.value == "-") {
            $("#mophnNo-input-ugtCtt").attr("readonly",true);
            $("#mophnNo-mask-ugtCtt").attr("disabled",true);
        }

        $(selectugtCtt).on('change',function(){
            var selectVal = selectugtCtt.value;
            var valueVal = valueugtCtt.value;

            if(selectVal == "" || selectVal == null) {
                $("#mophnNo-prefix-ugtCtt").val("");
                $("#mophnNo-input-ugtCtt").val("");
                $("#mophnNo-mask-ugtCtt").val("");
                $("#mophnNo-input-ugtCtt").attr("readonly",true);
                $("#mophnNo-mask-ugtCtt").attr("disabled",true);
            } else if(selectVal == '-') {
                $("#mophnNo-prefix-ugtCtt").val("-");
                $("#mophnNo-input-ugtCtt").val("-");
                $("#mophnNo-mask-ugtCtt").val("");
                $("#mophnNo-input-ugtCtt").attr("readonly",true);
                $("#mophnNo-mask-ugtCtt").attr("disabled",true);
            } else if(selectVal != "-" || selectVal != "" || selectVal != null){
                $("#mophnNo-input-ugtCtt").attr("readonly",false);
                $("#mophnNo-mask-ugtCtt").attr("disabled",false);
                document.getElementById("mophnNo-input-ugtCtt").value= selectVal+"-"+valueVal;
            }
        });

        $(valueugtCtt).keydown(function(){
            var selectVal = selectugtCtt.value;
            var valueVal = valueugtCtt.value;
            document.getElementById("mophnNo-input-ugtCtt").value= selectVal+"-"+valueVal;
        });

        $(valueugtCtt).keyup(function(){
            var selectVal = selectugtCtt.value;
            var valueVal = valueugtCtt.value;
            document.getElementById("mophnNo-input-ugtCtt").value= selectVal+"-"+valueVal;
        });

        if($(valueugtCtt).val() == "-") {
            $(valueugtCtt).val("");
        }
    })

    // 자동 하이푼(안되는 경우가 있어서 만듦)
    function phoneNum(obj) {
        var selectugtCtt = document.getElementById("mophnNo-prefix-ugtCtt");
        var valueugtCtt = document.getElementById("mophnNo-mask-ugtCtt");
        var num = $(obj).val().replace(/[^0-9]/g,"");
        var number = "";

        if(num.length == 7) {
            number = num.replace(/(^[0-9]{3})([0-9]{4})/,"$1-$2");
        } else {
            number = num.replace(/(^[0-9]{4})([0-9]{4})/,"$1-$2");
        }

        $(obj).val(number);
        }
 */