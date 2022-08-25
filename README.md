# The graph MultiSig Project

This project allows me to track transaction proposals that are sent from the [multi-signature contract](https://github.com/bricedenice59/multisig-wallet-marketplace) that I have created.

In just one query I can track:

1.A proposal transaction has been sent and who initiated it.

2.All confirmation transactions and who confirmed the proposal.

3.How many confirmations have been sent so far.

4.If the proposal got executed and who executed it.

```shell
{
  transactionProposals {
    id
    to
    value
    data
    nbOfConfirmations
    isExecuted
    txConfirmations{
      owner
    }
    txExecuted{
      owner
    }
  }
}
....
```

An example
```shell
  {
    "id": "0x20xc85d72a0a168b33d30d1140dd5d220af5652617d",
    "to": "0x952694e44e5d5c17c0a89e98a20a48c57092e6f4",
    "value": "0",
    "data": "0x7065cb4800000000000000000000000006cfb38c30775505c934a1ba364bffedfbfafe37",
    "nbOfConfirmations": 3,
    "isExecuted": true,
    "txConfirmations": [
      {
        "owner": "0x86434a3079a635c17fea61a8f1a070dad73d3b01"
      },
      {
        "owner": "0xc85d72a0a168b33d30d1140dd5d220af5652617d"
      },
      {
        "owner": "0xd60504758e413aaf9d4f44bebf1d7f0669fb0622"
      }
    ],
    "txExecuted": {
      "owner": "0xd60504758e413aaf9d4f44bebf1d7f0669fb0622"
    }
  }
```