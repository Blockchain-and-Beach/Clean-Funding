import { sendMoney } from "./sendMoney";
import { TransferTransaction, Deadline, Account, NetworkType } from "nem2-sdk";

/* 
 *  후원 버튼을 눌렀을 때, 
 *  후원자는 root mosaic를 단체 account에,
 *  후원받은 단체는 후원자에게 고유한 모자이크를 return
 *  donaterPrivateKey: 후원자의 private 키
 *  groupPrivateKey: 단체의 private 키
 *  nsName: 단체가 후원자한테 투표권으로서 주는 모자이크의 네임스페이스
 *  mosaicName: 단체가 후원자한테 주는 투표권으로서의 모자이크
 *  coinNum: 돈의 양
 *  message: 있어도 없어도 되는 메시지
 */


function donate(donaterPrivateKey: string, groupPrivateKey: string, nsName:string, mosaicName:string, coinNum:number, message?:string): void {
    //후원
    const donaterAccount = Account.createFromPrivateKey(donaterPrivateKey,NetworkType.MIJIN_TEST);
    const groupAccount = Account.createFromPrivateKey(groupPrivateKey,NetworkType.MIJIN_TEST);
    //루트 네임스페이스, 루트 모자이크
    sendMoney('bob', 'won', donaterPrivateKey, groupAccount.publicKey, coinNum, message);
    sendMoney(nsName,mosaicName,groupPrivateKey, donaterAccount.publicKey, coinNum, message);
}
console.log(process.env.donater);
console.log(process.env.group);

//프로젝트의 네임스페이스, 모자이크
donate(process.env.donater, process.env.group, 'bob', 'token', 10);

export {donate}