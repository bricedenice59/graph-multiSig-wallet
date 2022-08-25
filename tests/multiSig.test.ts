import {test, newMockEvent, assert, clearStore, describe, afterAll} from "matchstick-as/assembly/index"
import { Address, Bytes, ethereum, BigInt } from "@graphprotocol/graph-ts";
import {
    TxSubmitted,
    TxConfirmed,
    TxExecuted
  } from "../generated/MultiSig/MultiSig"
import { handleTxSubmitted, handleTxConfirmed, handleTxExecuted } from "../src/multi-sig"

let TxProposal_ENTITY_TYPE = "TransactionProposal";
let TxConfirmation_ENTITY_TYPE = "TransactionItem";
let TxExecuted_ENTITY_TYPE = "TransactionItem";
let nonceProposalValue = ethereum.Value.fromSignedBigInt(BigInt.fromString("1"));
let ownerProposalValue = ethereum.Value.fromAddress(Address.fromString("0x7856a05611ed5286931c3eb66dcdd758df58d5a8"));
let idProposalValue = nonceProposalValue.toBigInt().toHexString() + ownerProposalValue.toAddress().toHexString();

describe("Entity Store", () => {
    test("Add a proposal transaction entity", ()=>{
       
        let toValue = "0xfbf22b1e66a6904bd6b9f80ebc6505646b698e12";
        let dataValue = "0x7065cb4800000000000000000000000006cfb38c30775505c934a1ba364bffedfbfafe37"

        let newTransactionProposalEvent = changetype<TxSubmitted>(newMockEvent())
        newTransactionProposalEvent.parameters = new Array();
    
        let ownerParam = new ethereum.EventParam("owner", ownerProposalValue);
        let nonceParam = new ethereum.EventParam("nonce", nonceProposalValue);
        let toParam = new ethereum.EventParam("to", ethereum.Value.fromAddress(Address.fromString(toValue)));
        let valueParam = new ethereum.EventParam("value", ethereum.Value.fromSignedBigInt(BigInt.fromString("0")));
        let dataParam = new ethereum.EventParam("data", ethereum.Value.fromBytes(Bytes.fromHexString(dataValue)));
    
        newTransactionProposalEvent.parameters.push(ownerParam);
        newTransactionProposalEvent.parameters.push(nonceParam);
        newTransactionProposalEvent.parameters.push(toParam);
        newTransactionProposalEvent.parameters.push(valueParam);
        newTransactionProposalEvent.parameters.push(dataParam);
    
        handleTxSubmitted(newTransactionProposalEvent);

        assert.entityCount(TxProposal_ENTITY_TYPE, 1)
        assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "to", toValue);
        assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "data", dataValue);
        assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "nbOfConfirmations", "0");
        assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "isExecuted", "false");
    });

    test("Add mutliple transaction confirmations entity", ()=>{
        let ethAddresses = ["0x425e9c05dc9209fe49f949c0ce0b529134717419",
        "0xfbfd6b7c7d2fa6eea676566ba6d40c32f19d58a9",
        "0x5f64591d8af44815f48cf1cd12801d5ec6c3d053",
        "0xc08f701fa695c64ddb1d24970c1c6e900f79bbd1",
        "0x22e8b52f62c7c7907a09b0a90ddb25c9d85e02e4"];

        let nbConfirmationsRequired = ethAddresses.length;
        for (let nbConfirmation = 1; nbConfirmation < nbConfirmationsRequired; nbConfirmation++) {
            var newOwnerAddress = ethAddresses[nbConfirmation];

            let newTransactionConfirmation = changetype<TxConfirmed>(newMockEvent())
            newTransactionConfirmation.parameters = new Array();
   
            let otherOwnerValue = ethereum.Value.fromAddress(Address.fromString(newOwnerAddress));
            let ownerParam = new ethereum.EventParam("owner", otherOwnerValue);
            let txOriginOwnerParam = new ethereum.EventParam("txOriginOwner", ownerProposalValue);
            let nonceParam = new ethereum.EventParam("nonce", nonceProposalValue);
            
            newTransactionConfirmation.parameters.push(ownerParam);
            newTransactionConfirmation.parameters.push(txOriginOwnerParam);
            newTransactionConfirmation.parameters.push(nonceParam);
        
            handleTxConfirmed(newTransactionConfirmation);
    
            const idNewTransactionConfirmation = nonceProposalValue.toBigInt().toHexString() + otherOwnerValue.toAddress().toHexString();
            assert.entityCount(TxConfirmation_ENTITY_TYPE, nbConfirmation);
            assert.fieldEquals(TxConfirmation_ENTITY_TYPE, idNewTransactionConfirmation, "owner", otherOwnerValue.toAddress().toHexString());
            assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "nbOfConfirmations", nbConfirmation.toString());
        }
    });

    test("Add execute transaction entity", ()=>{
        let newOwnerAddress = "0x425e9c05dc9209fe49f949c0ce0b529134717419";

        let newTransactionExecuted = changetype<TxExecuted>(newMockEvent())
        newTransactionExecuted.parameters = new Array();

        let otherOwnerValue = ethereum.Value.fromAddress(Address.fromString(newOwnerAddress));
        let ownerParam = new ethereum.EventParam("owner", otherOwnerValue);
        let txOriginOwnerParam = new ethereum.EventParam("txOriginOwner", ownerProposalValue);
        let nonceParam = new ethereum.EventParam("nonce", nonceProposalValue);
        
        newTransactionExecuted.parameters.push(ownerParam);
        newTransactionExecuted.parameters.push(txOriginOwnerParam);
        newTransactionExecuted.parameters.push(nonceParam);
    
        handleTxExecuted(newTransactionExecuted);

        const idNewTransactionConfirmation = nonceProposalValue.toBigInt().toHexString() + otherOwnerValue.toAddress().toHexString();
        assert.fieldEquals(TxExecuted_ENTITY_TYPE, idNewTransactionConfirmation, "owner", otherOwnerValue.toAddress().toHexString());
        assert.fieldEquals(TxProposal_ENTITY_TYPE, idProposalValue, "isExecuted", true.toString());
    });

    afterAll(() => {
        clearStore();
      })
});
