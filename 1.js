function twoSum(nums, target) {
	const indexMap = new Map();

	for (let i = 0; i < nums.length; i += 1) {
		const complement = target - nums[i];
		if (indexMap.has(complement)) {
			return [indexMap.get(complement), i];
		}
		indexMap.set(nums[i], i);
	}

	return [];
}

module.exports = { twoSum };
