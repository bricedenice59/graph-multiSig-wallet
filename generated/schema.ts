// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class TransactionItem extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransactionItem entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TransactionItem must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TransactionItem", id.toString(), this);
    }
  }

  static load(id: string): TransactionItem | null {
    return changetype<TransactionItem | null>(store.get("TransactionItem", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get txOriginOwner(): Bytes {
    let value = this.get("txOriginOwner");
    return value!.toBytes();
  }

  set txOriginOwner(value: Bytes) {
    this.set("txOriginOwner", Value.fromBytes(value));
  }
}

export class TransactionProposal extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TransactionProposal entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TransactionProposal must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("TransactionProposal", id.toString(), this);
    }
  }

  static load(id: string): TransactionProposal | null {
    return changetype<TransactionProposal | null>(
      store.get("TransactionProposal", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value!.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value!.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get data(): Bytes | null {
    let value = this.get("data");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set data(value: Bytes | null) {
    if (!value) {
      this.unset("data");
    } else {
      this.set("data", Value.fromBytes(<Bytes>value));
    }
  }

  get nbOfConfirmations(): i32 {
    let value = this.get("nbOfConfirmations");
    return value!.toI32();
  }

  set nbOfConfirmations(value: i32) {
    this.set("nbOfConfirmations", Value.fromI32(value));
  }

  get isExecuted(): boolean {
    let value = this.get("isExecuted");
    return value!.toBoolean();
  }

  set isExecuted(value: boolean) {
    this.set("isExecuted", Value.fromBoolean(value));
  }

  get txConfirmations(): Array<string> | null {
    let value = this.get("txConfirmations");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set txConfirmations(value: Array<string> | null) {
    if (!value) {
      this.unset("txConfirmations");
    } else {
      this.set("txConfirmations", Value.fromStringArray(<Array<string>>value));
    }
  }

  get txExecuted(): string | null {
    let value = this.get("txExecuted");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set txExecuted(value: string | null) {
    if (!value) {
      this.unset("txExecuted");
    } else {
      this.set("txExecuted", Value.fromString(<string>value));
    }
  }
}
