import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  MultiSigOwnerAdded,
  MultiSigOwnerRemoved,
  TxConfirmed,
  TxExecuted,
  TxSubmitted
} from "../generated/MultiSig/MultiSig"

export function createMultiSigOwnerAddedEvent(
  owner: Address,
  timestamp: BigInt
): MultiSigOwnerAdded {
  let multiSigOwnerAddedEvent = changetype<MultiSigOwnerAdded>(newMockEvent())

  multiSigOwnerAddedEvent.parameters = new Array()

  multiSigOwnerAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  multiSigOwnerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return multiSigOwnerAddedEvent
}

export function createMultiSigOwnerRemovedEvent(
  owner: Address,
  timestamp: BigInt
): MultiSigOwnerRemoved {
  let multiSigOwnerRemovedEvent = changetype<MultiSigOwnerRemoved>(
    newMockEvent()
  )

  multiSigOwnerRemovedEvent.parameters = new Array()

  multiSigOwnerRemovedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  multiSigOwnerRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return multiSigOwnerRemovedEvent
}

export function createTxConfirmedEvent(
  owner: Address,
  nonce: BigInt
): TxConfirmed {
  let txConfirmedEvent = changetype<TxConfirmed>(newMockEvent())

  txConfirmedEvent.parameters = new Array()

  txConfirmedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  txConfirmedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )

  return txConfirmedEvent
}

export function createTxExecutedEvent(
  owner: Address,
  nonce: BigInt
): TxExecuted {
  let txExecutedEvent = changetype<TxExecuted>(newMockEvent())

  txExecutedEvent.parameters = new Array()

  txExecutedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  txExecutedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )

  return txExecutedEvent
}

export function createTxSubmittedEvent(
  owner: Address,
  nonce: BigInt,
  to: Address,
  value: BigInt,
  data: Bytes
): TxSubmitted {
  let txSubmittedEvent = changetype<TxSubmitted>(newMockEvent())

  txSubmittedEvent.parameters = new Array()

  txSubmittedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  txSubmittedEvent.parameters.push(
    new ethereum.EventParam("nonce", ethereum.Value.fromUnsignedBigInt(nonce))
  )
  txSubmittedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  txSubmittedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )
  txSubmittedEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return txSubmittedEvent
}
