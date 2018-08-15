//개발에 필요한 기능들을 nem2-sdk에서 import함
import {
    Account, Address, Deadline, UInt64, NetworkType, PlainMessage, TransferTransaction, Mosaic, MosaicId, TransactionHttp
} from 'nem2-sdk';

var event_listener = document.getElementById('btn_charge');
 
//if 충전 버튼이 눌리면
event_listener.onclick = function() {
    //충전 버튼을 누르면 모자이크 충전하는 함수
    charge();
}

const charge = (): void => {
    //후원자들의 데이터가 있는 db에서 후원자 정보를 가지고 nem account를 만들기.
    alert("Hello NEM");
}
