import {test, newMockEvent, assert, clearStore, describe, afterAll} from "matchstick-as/assembly/index"
import { Address, ethereum, BigInt } from "@graphprotocol/graph-ts";
import {
    MultiSigOwnerAdded,
    MultiSigOwnerRemoved,
  } from "../generated/MultiSig/MultiSig"
import { handleOwnerAdded, handleOwnerRemoved } from "../src/multi-sig"

let OWNER_ENTITY_TYPE = "Owner";

let ownersToAdd = ["0x425e9c05dc9209fe49f949c0ce0b529134717419",
"0xfbfd6b7c7d2fa6eea676566ba6d40c32f19d58a9",
"0x5f64591d8af44815f48cf1cd12801d5ec6c3d053",
"0xc08f701fa695c64ddb1d24970c1c6e900f79bbd1",
"0x22e8b52f62c7c7907a09b0a90ddb25c9d85e02e4"];

let ownersToRemove = ["0xfbfd6b7c7d2fa6eea676566ba6d40c32f19d58a9",
"0x22e8b52f62c7c7907a09b0a90ddb25c9d85e02e4"];

let initialTimeStamp = 1661756753;

describe("Owners Entity Store", () => {
    test("Add a owner entity", ()=>{
        for (let ownerCount = 0; ownerCount < ownersToAdd.length; ownerCount++) {
            var timestamp = initialTimeStamp +5 ;
            let newOwnerToAddEvent = changetype<MultiSigOwnerAdded>(newMockEvent());
            newOwnerToAddEvent.parameters = new Array();
            let ownerParam = new ethereum.EventParam("owner", ethereum.Value.fromAddress(Address.fromString(ownersToAdd[ownerCount])));
            let timestampParam = new ethereum.EventParam("timestamp", ethereum.Value.fromSignedBigInt(BigInt.fromString(timestamp.toString())));

            newOwnerToAddEvent.parameters.push(ownerParam);
            newOwnerToAddEvent.parameters.push(timestampParam);

            handleOwnerAdded(newOwnerToAddEvent);

            assert.entityCount(OWNER_ENTITY_TYPE, ownerCount + 1);
            assert.fieldEquals(OWNER_ENTITY_TYPE, ownersToAdd[ownerCount], "status", "In");
        }
    });

    test("Remove a entity owner", ()=>{
        for (let ownerCount = 0; ownerCount < ownersToRemove.length; ownerCount++) {
            var timestamp = initialTimeStamp + 50 ;
            let newOwnerToRemoveEvent = changetype<MultiSigOwnerRemoved>(newMockEvent());
            newOwnerToRemoveEvent.parameters = new Array();
            let ownerParam = new ethereum.EventParam("owner", ethereum.Value.fromAddress(Address.fromString(ownersToRemove[ownerCount])));
            let timestampParam = new ethereum.EventParam("timestamp", ethereum.Value.fromSignedBigInt(BigInt.fromString(timestamp.toString())));

            newOwnerToRemoveEvent.parameters.push(ownerParam);
            newOwnerToRemoveEvent.parameters.push(timestampParam);

            handleOwnerRemoved(newOwnerToRemoveEvent);

            assert.fieldEquals(OWNER_ENTITY_TYPE, ownersToRemove[ownerCount], "status", "Out");
        }
        //removed owners are removed from initial list
        for (let ownerCount = 0; ownerCount < ownersToRemove.length; ownerCount++) {
            const index = ownersToAdd.indexOf(ownersToRemove[ownerCount], 0);
            if (index > -1) {
                ownersToAdd.splice(index, 1);
            }
        }
        //from initial 5 users added, 2 have been removed, so we expect the array to have 3 values
        assert.equals(ethereum.Value.fromI32(3), ethereum.Value.fromI32(ownersToAdd.length));

        //check if entities previously added still have the status = "In"
        for (let ownerCount = 0; ownerCount < ownersToAdd.length; ownerCount++) {
            assert.fieldEquals(OWNER_ENTITY_TYPE, ownersToAdd[ownerCount], "status", "In");
        }
    });

    afterAll(() => {
        clearStore();
      })
});
