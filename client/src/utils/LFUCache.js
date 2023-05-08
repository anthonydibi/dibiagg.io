export default class LFUCache {
  constructor(capacity) {
    this.min = -1
    this.capacity = capacity
    this.values = new Map() //stores keys and values
    this.counts = new Map() //stores keys and access counts
    this.sets = new Map() //stores counts and a set of keys with that count
    this.sets.set(0, new Set())
  }

  set(key, value) {
    if (this.values.has(key)) {
      this.values.set(key, value)
      this.get(key) //maintain ordering
      return
    }
    if (this.values.size >= this.capacity) {
      let evictSet = this.sets.get(this.min)
      let evictedKey = [...evictSet][0] //get first element of set
      evictSet.delete(evictedKey)
      this.values.delete(evictedKey)
      this.counts.delete(evictedKey)
    }
    this.values.set(key, value)
    this.counts.set(key, 0)
    this.min = 0
    let zeroCountSet = this.sets.get(0)
    zeroCountSet.add(key)
  }

  get(key) {
    if (!this.values.has(key)) {
      return -1
    }
    let count = this.counts.get(key)
    if (count === undefined) {
      throw new Error(`A key ${key} exists but has no count.`)
    }
    this.counts.set(key, count + 1)
    let set = this.sets.get(count)
    if (set === undefined) {
      throw new Error(`A key ${key} exists but is not in a count set.`)
    }
    set.delete(key)
    if (count == this.min && set.size <= 0) {
      this.min++
    }
    if (!this.sets.has(count + 1)) {
      this.sets.set(count + 1, new Set())
    }
    let newCountSet = this.sets.get(count + 1)
    newCountSet.add(key)
    return this.values.get(key)
  }

  toList(ascending) {
    let res = []
    for (let set of this.sets.values()) {
      res = res.concat([...set])
    }
    if (ascending) {
      return res
    }
    return res.reverse()
  }
}
