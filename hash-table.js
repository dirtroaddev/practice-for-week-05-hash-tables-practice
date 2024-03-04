const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null)
  }

  hash(key) {
    // Your code here
    let hashed = sha256(key).substring(0, 8);
    return parseInt(hashed, 16);
  }

  hashMod(key) {
    // Your code here
    
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    const index = this.hashMod(key);

    // Check for existing KeyValuePair at the index
    if (this.data[index]) {
      // Check if the key already exists
      if (this.data[index].key === key) {
        throw new Error('hash collision or same key/value pair already exists!');
      } else {
        // If there's a different key at the index, it's a collision
        throw new Error('hash collision or same key/value pair already exists!');
      }
    }

    // If the slot is empty, insert the new KeyValuePair
    this.data[index] = new KeyValuePair(key, value);
    this.count++;
  }
  insertWithHashCollisions(key, value) {
    // Determine the bucket index for the key
    const index = this.hashMod(key);
  
    // Create a new node. Assuming you do not have a separate Node class, we'll use a simple object.
    const newNode = { key, value, next: null };
  
    // If the bucket is already occupied, we need to handle the collision
    if (this.data[index]) {
      // Prepend the new node to the existing list to maintain the insertion order as per the test expectations
      newNode.next = this.data[index];
    }
  
    // Insert (or re-insert) the node at the bucket index
    this.data[index] = newNode;
  
    // Increase the count of items in the hash table
    this.count++;
  }
  

  insert(key, value) {
    // Step 1: Determine the bucket index for the key
    const index = this.hashMod(key);
  
    // Create a new node for the linked list (assuming you have a Node class or similar structure)
    const newNode = { key, value, next: null };
  
    // Step 2: If the bucket is empty, insert the new node directly
    if (!this.data[index]) {
      this.data[index] = newNode;
    } else {
      // Step 3: If the bucket is not empty, search for the key in the linked list
      let current = this.data[index];
      let prev = null;
      while (current) {
        if (current.key === key) {
          // If the key already exists, update the value and return
          current.value = value;
          return;
        }
        prev = current;
        current = current.next;
      }
      // If the key doesn't exist, insert the new node at the head of the linked list
      newNode.next = this.data[index];
      this.data[index] = newNode;
    }
  
    this.count++; // Increase the count of items in the hash table
  }
  

}


module.exports = HashTable;