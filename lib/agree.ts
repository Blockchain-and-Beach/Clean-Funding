import { Account, NetworkType, MosaicInfo, AccountInfo } from 'nem2-sdk';
/*
 * vote에 대해서 찬성일 때,
 * 후원할 때 받은 단체의 고유한 모자이크를
 * 다시 단체쪽으로 return해줌
 * 이 때 보냈다고 해서 없어지지 않음.
 * 왜냐, 다른 vote를 위해서
 * donaterPrivateKey: agree한 후원자의 privatekey
 * groupPrivateKey: 받을 단체의 privateKey
 * naName: 보낼 mosaic의 namespace
 * mosaic: 보낼 mosaic
 */
function agree(donaterPrivateKey: string, groupPrivateKey: string, nsName: string, mosaicName: string): void {
    const donaterAccount = Account.createFromPrivateKey(donaterPrivateKey, NetworkType.MIJIN_TEST);
    const groupAccount = Account.createFromPrivateKey(groupPrivateKey, NetworkType.MIJIN_TEST);

    
    
    console.log();
}

agree(process.env.donater, process.env.group, 'bob', 'token');