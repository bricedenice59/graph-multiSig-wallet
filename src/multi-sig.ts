import {
  TransactionItem, TransactionProposal,Owner
} from '../generated/schema'
import {
  TxConfirmed as TxConfirmedEvent,
  TxSubmitted as TxSubmittedEvent,
  TxExecuted as TxExecutedEvent,
  MultiSigOwnerAdded as OwnerAddedEvent,
  MultiSigOwnerRemoved as OwnerRemovedEvent
} from "../generated/MultiSig/MultiSig"

export function handleTxSubmitted(event: TxSubmittedEvent): void {
  const id = event.params.nonce.toHexString() + event.params.owner.toHexString();
  let txItem = TransactionProposal.load(id);
  if (!txItem) {
    txItem = new TransactionProposal(id);
    txItem.to = event.params.to;
    txItem.value = event.params.value;
    txItem.data = event.params.data;
    txItem.nbOfConfirmations = 0;
    txItem.isExecuted = false;
    txItem.save();
  }
}

export function handleTxConfirmed(event: TxConfirmedEvent): void {
  const id = event.params.nonce.toHexString() + event.params.owner.toHexString();
  let txItem = TransactionItem.load(id);
  if(!txItem)
  {
    txItem = new TransactionItem(id);
    txItem.owner = event.params.owner;
    txItem.txOriginOwner = event.params.txOriginOwner;
    txItem.save();
  }
  const idOriginTxProposal = event.params.nonce.toHexString() + event.params.txOriginOwner.toHexString();
  let txProposal = TransactionProposal.load(idOriginTxProposal);
  let allConfirmations = txProposal!.txConfirmations;

  if(!allConfirmations)
  {
    var confirmations:string[] = []; 
    confirmations.push(txItem.id);
    txProposal!.txConfirmations = confirmations;
  }
  else{
    allConfirmations.push(txItem.id)
    txProposal!.txConfirmations = allConfirmations;
  }

  txProposal!.nbOfConfirmations += 1;
  txProposal!.save()
}

export function handleTxExecuted(event: TxExecutedEvent): void {
  const id = event.params.nonce.toHexString() + event.params.owner.toHexString();
  let txItem = TransactionItem.load(id);
  if(!txItem)
  {
    txItem = new TransactionItem(id);
    txItem.owner = event.params.owner;
    txItem.txOriginOwner = event.params.txOriginOwner;
    txItem.save();
  }
  const idOriginTxProposal = event.params.nonce.toHexString() + event.params.txOriginOwner.toHexString();
  let txProposal = TransactionProposal.load(idOriginTxProposal);
  txProposal!.isExecuted = true;
  txProposal!.txExecuted = txItem.id;
  txProposal!.save()
}

export function handleOwnerAdded(event: OwnerAddedEvent): void {
  const id = event.params.owner;
  let txItem = Owner.load(id);
  if(!txItem)
  {
    txItem = new Owner(id);
    txItem.lastTransactionAtTimestamp = event.params.timestamp;
    txItem.status = "In";
  }
  txItem.save();
}

export function handleOwnerRemoved(event: OwnerRemovedEvent): void {
  const id = event.params.owner;
  let txItem = Owner.load(id); 
  txItem!.lastTransactionAtTimestamp = event.params.timestamp;
  txItem!.status = "Out";
  txItem!.save();
}

