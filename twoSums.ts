function a(nums: number[], target: number): [number, number] | [] {
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

export default a;