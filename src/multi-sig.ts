import {
  TransactionItem, TransactionConfirmation, TransactionExecution
} from '../generated/schema'
import {
  TxConfirmed as TxConfirmedEvent,
  TxSubmitted as TxSubmittedEvent,
  TxExecuted as TxExecutedEvent,
} from "../generated/MultiSig/MultiSig"

export function handleTxSubmitted(event: TxSubmittedEvent): void {
  let txItem = TransactionItem.load(event.params.nonce.toHexString());
  if (!txItem) {
    txItem = new TransactionItem(event.params.nonce.toHexString());
    txItem.owner = event.params.owner;
    txItem.to = event.params.to;
    txItem.value = event.params.value;
    txItem.data = event.params.data;
    txItem.nbOfConfirmations = 0;
    txItem.IsExecuted = false;
    txItem.save();
  }
}

export function handleTxConfirmed(event: TxConfirmedEvent): void {
  let txItem = TransactionConfirmation.load(event.params.nonce.toHexString());
  if(!txItem)
  {
    txItem = new TransactionConfirmation(event.params.nonce.toHexString());
    txItem.owner = event.params.owner;
    txItem.txOrigin =event.params.nonce.toHexString();
    txItem.save();
  }
  let txExistingItem = TransactionItem.load(event.params.nonce.toHexString());
  txExistingItem!.nbOfConfirmations += 1;
  txExistingItem!.save()
}

export function handleTxExecuted(event: TxExecutedEvent): void {
  let txItem = TransactionExecution.load(event.params.nonce.toHexString());
  if(!txItem)
  {
    txItem = new TransactionExecution(event.params.nonce.toHexString());
    txItem.owner = event.params.owner;
    txItem.txOrigin =event.params.nonce.toHexString();
    txItem.save();
  }
  let txExistingItem = TransactionItem.load(event.params.nonce.toHexString());
  txExistingItem!.IsExecuted = true;
  txExistingItem!.save()
}
