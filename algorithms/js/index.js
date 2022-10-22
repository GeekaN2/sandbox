const numbers = process.argv.slice(2);

class Merge {
  nums = []

  constructor(nums) {
    this.nums = nums.map(num => Number(num));
    this.merge(0, 3);
    console.log(this.nums);
  }

  sort(leftBorder, rightBorder) {
    
  }

  /**
   * Merge 2 equal part of array
   */
  merge(leftBorder, rightBorder) {
    const mid = Math.floor((leftBorder + rightBorder) / 2);

    let toMerge = [];
    let itLeft = leftBorder;
    let itRight = mid + 1;

    while (itLeft <= mid && itRight <= rightBorder) {
      if (this.nums[itLeft] < this.nums[itRight]) {
        toMerge.push(this.nums[itLeft++]);
      } else {
        toMerge.push(this.nums[itRight++]);
      }
    }

    if (itLeft > mid) {
      toMerge.push(this.nums.slice(itRight, rightBorder + 1))
    } else {
      toMerge.push(...this.nums.slice(itLeft, mid + 1));
    }

    return toMerge;
  }
}

const mergedArray = new Merge(numbers);