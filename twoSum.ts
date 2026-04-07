/**
 * Finds two numbers in the array that add up to the target value.
 * @param nums - An array of numbers.
 * @param target - The target sum.
 * @returns A tuple containing the indices of the two numbers that add up to the target, or an empty array if no such pair exists.
 */
function twoSum(nums: number[], target: number): [number, number] | [] {
    const indexMap = new Map<number, number>();

    for (let i = 0; i < nums.length; i += 1) {
        const complement = target - nums[i];
        if (indexMap.has(complement)) {
            return [indexMap.get(complement)!, i];
        }
        indexMap.set(nums[i], i);
    }

    return [];
}

export default twoSum;