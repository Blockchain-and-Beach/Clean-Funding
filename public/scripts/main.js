onload = function () {
    // var ctx = document.getElementById('myChart').getContext('2d');
    // var myChart = new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });

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