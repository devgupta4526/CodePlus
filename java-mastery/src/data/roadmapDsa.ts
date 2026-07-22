export interface LeetCodeProblem {
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
}

export interface CodePatternBlueprint {
  language: 'java' | 'python';
  code: string;
}

export interface DsaTopic {
  id: string;
  title: string;
  desc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hardcore';
  timeComplexity: string;
  spaceComplexity: string;
  keyConcepts: string[];
  javaCode?: string;
  pythonCode?: string;
  problems: LeetCodeProblem[];
  masterclassUrl?: string;
  subItems: string[];
}

export interface DsaPhase {
  id: string;
  title: string;
  icon: string;
  color: string;
  badge: string;
  summary: string;
  topics: DsaTopic[];
}

export const DSA_MASTERCLASSES = [
  {
    id: 'bitmask-dp',
    title: 'Bitmask DP Patterns Deep Dive',
    desc: 'Master state compression, subset traversal, and the 5 essential Bitmask DP templates with interactive dry runs.',
    url: '/dsa/bitmask_dp_patterns_deep_dive',
    icon: '🧠',
    color: '#8B5CF6',
    tag: 'Interactive Masterclass',
    topicsCount: 5,
  },
  {
    id: 'cp-9patterns',
    title: 'CP 9 Patterns Java Masterclass',
    desc: 'The complete competitive programming toolkit: Binary Lifting, Fenwick Trees, Segment Trees, and Fast I/O.',
    url: '/dsa/cp_9patterns_java_masterclass',
    icon: '⚡',
    color: '#EF4444',
    tag: 'Pro CP Ladder',
    topicsCount: 9,
  },
  {
    id: 'dp-trees',
    title: 'DP on Trees & Re-rooting Pattern',
    desc: 'Solve all-pairs tree distance problems in O(N) using two-pass tree re-rooting dynamic programming.',
    url: '/dsa/dp_trees_problem_ladder',
    icon: '🌳',
    color: '#10B981',
    tag: 'Advanced Graph/Tree',
    topicsCount: 6,
  },
];

export const DSA_PHASES: DsaPhase[] = [
  {
    id: 'dsa-p1',
    title: 'Phase 1: Foundations & Core Data Structures',
    icon: '⚡',
    color: '#10B981',
    badge: 'Foundations',
    summary: 'Build rock-solid fundamentals in memory allocation, array manipulation, string processing, and pointer techniques.',
    topics: [
      {
        id: 'arrays-hashing',
        title: 'Arrays & Hash Maps',
        desc: 'Constant-time lookup techniques, frequency counting, and prefix sum arrays.',
        difficulty: 'Beginner',
        timeComplexity: 'O(1) lookup / O(N) traversal',
        spaceComplexity: 'O(N) aux space',
        keyConcepts: [
          'Direct index mapping & Hash tables',
          'Prefix Sum & Difference Arrays',
          'Frequency Counters & Hash Sets',
          'Handling integer overflows & collisions',
        ],
        javaCode: `// Two Sum using HashMap - O(N) Time, O(N) Space
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{ map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`,
        pythonCode: `# Two Sum using Hash Map - O(N) Time, O(N) Space
def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        problems: [
          { name: 'Contains Duplicate', difficulty: 'Easy', url: 'https://leetcode.com/problems/contains-duplicate/' },
          { name: 'Two Sum', difficulty: 'Easy', url: 'https://leetcode.com/problems/two-sum/' },
          { name: 'Group Anagrams', difficulty: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/' },
          { name: 'Top K Frequent Elements', difficulty: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
          { name: 'Subarray Sum Equals K', difficulty: 'Medium', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
        ],
        subItems: [
          'Understand Hash Collision Resolution (Chaining vs Open Addressing)',
          'Master Prefix Sum for Range Sum Queries in O(1)',
          'Implement Group Anagrams using sorted key or frequency array',
          'Solve Subarray Sum Equals K using Prefix Sum + Map',
        ],
      },
      {
        id: 'strings-two-pointers',
        title: 'Two Pointers & String Manipulation',
        desc: 'Squeezing search spaces from both ends and inward pointer traversals.',
        difficulty: 'Beginner',
        timeComplexity: 'O(N) Time',
        spaceComplexity: 'O(1) Space',
        keyConcepts: [
          'Opposite Direction Pointers (Left / Right)',
          'Same Direction Pointers (Fast / Slow)',
          'Palindromic Verification & Expansion',
          'String Immutability & StringBuilder Optimizations',
        ],
        javaCode: `// Valid Palindrome - O(N) Time, O(1) Space
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}`,
        pythonCode: `# Two Pointers Container With Most Water
def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water`,
        problems: [
          { name: 'Valid Palindrome', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-palindrome/' },
          { name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
          { name: '3Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/3sum/' },
          { name: 'Container With Most Water', difficulty: 'Medium', url: 'https://leetcode.com/problems/container-with-most-water/' },
          { name: 'Trapping Rain Water', difficulty: 'Hard', url: 'https://leetcode.com/problems/trapping-rain-water/' },
        ],
        subItems: [
          'Two Pointers on Sorted Arrays (Two Sum II)',
          'Handling duplicate skipping in 3Sum',
          'Greedy Container With Most Water proof',
          'Trapping Rain Water using 2-pointers technique',
        ],
      },
      {
        id: 'sliding-window',
        title: 'Sliding Window (Fixed & Variable)',
        desc: 'Dynamic dynamic window resizing to compute subsegment properties efficiently.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N) Time',
        spaceComplexity: 'O(K) Space',
        keyConcepts: [
          'Fixed Window Size vs Dynamic Resizing',
          'Window state invalidation & recovery',
          'At Most K distinct elements trick: count(K) - count(K-1)',
          'Auxiliary maps/arrays inside window',
        ],
        javaCode: `// Longest Substring Without Repeating Characters - O(N)
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char ch = s.charAt(right);
        if (lastSeen.containsKey(ch)) {
            left = Math.max(left, lastSeen.get(ch) + 1);
        }
        lastSeen.put(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        pythonCode: `# Minimum Window Substring - O(N)
def minWindow(s: str, t: str) -> str:
    if not t or not s: return ""
    from collections import Counter
    target = Counter(t)
    required = len(target)
    formed = 0
    window = {}
    ans = (float("inf"), None, None)
    l = 0
    for r, char in enumerate(s):
        window[char] = window.get(char, 0) + 1
        if char in target and window[char] == target[char]:
            formed += 1
        while l <= r and formed == required:
            if r - l + 1 < ans[0]:
                ans = (r - l + 1, l, r)
            window[s[l]] -= 1
            if s[l] in target and window[s[l]] < target[s[l]]:
                formed -= 1
            l += 1
    return "" if ans[0] == float("inf") else s[ans[1]:ans[2]+1]`,
        problems: [
          { name: 'Maximum Average Subarray I', difficulty: 'Easy', url: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
          { name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
          { name: 'Longest Repeating Character Replacement', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-repeating-character-replacement/' },
          { name: 'Minimum Window Substring', difficulty: 'Hard', url: 'https://leetcode.com/problems/minimum-window-substring/' },
          { name: 'Sliding Window Maximum', difficulty: 'Hard', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
        ],
        subItems: [
          'Fixed Window pattern: Subarray max/avg of length K',
          'Variable Window pattern: Expand right, contract left when invalid',
          'Character frequency validation using array counters',
          'Sliding Window Maximum using Deque',
        ],
      },
      {
        id: 'linked-lists',
        title: 'Linked Lists & Fast/Slow Pointers',
        desc: 'Node pointers, list reversal, merge sort, and Floyd cycle detection.',
        difficulty: 'Beginner',
        timeComplexity: 'O(N) Time',
        spaceComplexity: 'O(1) Space',
        keyConcepts: [
          'Dummy Head Node pattern',
          'In-place Iterative & Recursive List Reversal',
          'Floyd Cycle Finding Algorithm (Tortoise & Hare)',
          'Intersection & Palindrome Linked Lists',
        ],
        javaCode: `// Reverse Linked List in O(N) Time and O(1) Space
public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
        pythonCode: `# Floyd's Cycle Detection Algorithm
def hasCycle(head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
        problems: [
          { name: 'Reverse Linked List', difficulty: 'Easy', url: 'https://leetcode.com/problems/reverse-linked-list/' },
          { name: 'Merge Two Sorted Lists', difficulty: 'Easy', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
          { name: 'Linked List Cycle', difficulty: 'Easy', url: 'https://leetcode.com/problems/linked-list-cycle/' },
          { name: 'Reorder List', difficulty: 'Medium', url: 'https://leetcode.com/problems/reorder-list/' },
          { name: 'Remove Nth Node From End of List', difficulty: 'Medium', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
          { name: 'Merge k Sorted Lists', difficulty: 'Hard', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
        ],
        subItems: [
          'Dummy Head Node pattern for easy edge case management',
          'Iterative in-place list reversal pattern',
          'Fast and Slow pointers for finding list midpoint & cycle start',
          'Merge K sorted lists using Min-Heap priority queue',
        ],
      },
    ],
  },
  {
    id: 'dsa-p2',
    title: 'Phase 2: Linear Paradigms & Searching Algorithms',
    icon: '🎯',
    color: '#3B82F6',
    badge: 'Paradigms',
    summary: 'Master stacks, monotonic queues, binary search variations, and exhaustive recursive search.',
    topics: [
      {
        id: 'stack-monotonic',
        title: 'Stacks & Monotonic Stack Pattern',
        desc: 'LIFO evaluation, expression parsing, and next greater/smaller element queries.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(N) Amortized Time',
        spaceComplexity: 'O(N) Space',
        keyConcepts: [
          'Monotonic Increasing/Decreasing Stacks',
          'Next Greater / Next Smaller Element pattern',
          'Parentheses Matching & Calculator parsing',
          'Histogram & Matrix Max Area optimization',
        ],
        javaCode: `// Daily Temperatures - Monotonic Stack O(N)
public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] ans = new int[n];
    Deque<Integer> stack = new ArrayDeque<>(); // stores indices
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int prevIndex = stack.pop();
            ans[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    return ans;
}`,
        pythonCode: `# Next Greater Element using Monotonic Stack
def nextGreaterElement(nums1: list[int], nums2: list[int]) -> list[int]:
    stack = []
    nxt = {}
    for num in nums2:
        while stack and stack[-1] < num:
            nxt[stack.pop()] = num
        stack.append(num)
    return [nxt.get(x, -1) for x in nums1]`,
        problems: [
          { name: 'Valid Parentheses', difficulty: 'Easy', url: 'https://leetcode.com/problems/valid-parentheses/' },
          { name: 'Min Stack', difficulty: 'Medium', url: 'https://leetcode.com/problems/min-stack/' },
          { name: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
          { name: 'Daily Temperatures', difficulty: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/' },
          { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
        ],
        subItems: [
          'Implement Min Stack in O(1) time',
          'Evaluate Polish / Reverse Polish Notation',
          'Daily Temperatures via Monotonic Decreasing Stack',
          'Largest Rectangle in Histogram via Stack boundaries',
        ],
      },
      {
        id: 'binary-search',
        title: 'Binary Search & Search Space Optimization',
        desc: 'Logarithmic reduction across sorted arrays and implicit monotonic predicate spaces.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N) Time',
        spaceComplexity: 'O(1) Space',
        keyConcepts: [
          'Standard Binary Search bounds: low <= high vs low < high',
          'Lower Bound & Upper Bound (First/Last occurrence)',
          'Rotated Sorted Array Pivots',
          'Binary Search on Answer / Feasibility function check(mid)',
        ],
        javaCode: `// Binary Search on Answer: Koko Eating Bananas - O(N log(maxSpeed))
public int minEatingSpeed(int[] piles, int h) {
    int low = 1, high = 0;
    for (int p : piles) high = Math.max(high, p);
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canEatAll(piles, h, mid)) {
            ans = mid;
            high = mid - 1; // Try smaller speed
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

private boolean canEatAll(int[] piles, int h, int speed) {
    long hoursNeeded = 0;
    for (int p : piles) {
        hoursNeeded += (p + speed - 1) / speed;
    }
    return hoursNeeded <= h;
}`,
        pythonCode: `# Search in Rotated Sorted Array
def search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[low] <= nums[mid]: # Left half sorted
            if nums[low] <= target < nums[mid]:
                high = mid - 1
            else:
                low = mid + 1
        else: # Right half sorted
            if nums[mid] < target <= nums[high]:
                low = mid + 1
            else:
                high = mid - 1
    return -1`,
        problems: [
          { name: 'Binary Search', difficulty: 'Easy', url: 'https://leetcode.com/problems/binary-search/' },
          { name: 'Search a 2D Matrix', difficulty: 'Medium', url: 'https://leetcode.com/problems/search-a-2d-matrix/' },
          { name: 'Search in Rotated Sorted Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
          { name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
          { name: 'Koko Eating Bananas', difficulty: 'Medium', url: 'https://leetcode.com/problems/koko-eating-bananas/' },
          { name: 'Median of Two Sorted Arrays', difficulty: 'Hard', url: 'https://leetcode.com/problems/median-of-two-sorted-arrays/' },
        ],
        subItems: [
          'Avoid integer overflow: mid = low + (high - low) / 2',
          'Binary Search on 2D Matrix treating it as 1D array',
          'Rotated array pivot detection',
          'Binary Search on Answer range pattern',
        ],
      },
      {
        id: 'backtracking',
        title: 'Recursion & Backtracking',
        desc: 'State-space tree traversal with choice, constraint validation, and state undoing.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(2^N) or O(N!) Time',
        spaceComplexity: 'O(N) Call Stack',
        keyConcepts: [
          'Decision Tree: Choose, Explore, Un-choose',
          'Subsets & Power Set construction',
          'Permutations vs Combinations with duplicates',
          'Pruning invalid recursive branches early',
        ],
        javaCode: `// Subsets (Power Set) - O(2^N * N) Time
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(0, nums, new ArrayList<>(), result);
    return result;
}

private void backtrack(int start, int[] nums, List<Integer> current, List<List<Integer>> result) {
    result.add(new ArrayList<>(current));
    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(i + 1, nums, current, result);
        current.remove(current.size() - 1); // Undo choice
    }
}`,
        pythonCode: `# N-Queens Backtracking
def solveNQueens(n: int) -> list[list[str]]:
    cols, posDiag, negDiag = set(), set(), set()
    res = []
    board = [["."] * n for _ in range(n)]

    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r + c) in posDiag or (r - c) in negDiag:
                continue
            cols.add(c); posDiag.add(r + c); negDiag.add(r - c)
            board[r][c] = "Q"
            backtrack(r + 1)
            cols.remove(c); posDiag.remove(r + c); negDiag.remove(r - c)
            board[r][c] = "."

    backtrack(0)
    return res`,
        problems: [
          { name: 'Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/subsets/' },
          { name: 'Combination Sum', difficulty: 'Medium', url: 'https://leetcode.com/problems/combination-sum/' },
          { name: 'Permutations', difficulty: 'Medium', url: 'https://leetcode.com/problems/permutations/' },
          { name: 'Word Search', difficulty: 'Medium', url: 'https://leetcode.com/problems/word-search/' },
          { name: 'N-Queens', difficulty: 'Hard', url: 'https://leetcode.com/problems/n-queens/' },
        ],
        subItems: [
          'State Space Tree visualization',
          'Avoid duplicate subsets by sorting + skipping elements',
          'Word Search 2D grid backtracking with visiting marks',
          'N-Queens diagonal constraint representation',
        ],
      },
    ],
  },
  {
    id: 'dsa-p3',
    title: 'Phase 3: Trees & Hierarchical Structures',
    icon: '🌳',
    color: '#8B5CF6',
    badge: 'Hierarchical',
    summary: 'Master tree traversals, BST properties, priority queue heaps, and prefix trie dictionaries.',
    topics: [
      {
        id: 'binary-trees',
        title: 'Binary Trees & DFS/BFS Traversals',
        desc: 'Pre-order, In-order, Post-order, Level-order traversals, and tree properties.',
        difficulty: 'Beginner',
        timeComplexity: 'O(N) Time',
        spaceComplexity: 'O(H) Height Space',
        keyConcepts: [
          'Recursive DFS (Pre/In/Post-order)',
          'Iterative BFS Level Order using Queue',
          'Subtree Maximum Depth & Balance Factors',
          'Lowest Common Ancestor (LCA) in Binary Trees',
        ],
        javaCode: `// Lowest Common Ancestor in Binary Tree - O(N) Time
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,
        pythonCode: `# Binary Tree Level Order Traversal (BFS)
def levelOrder(root: Optional[TreeNode]) -> list[list[int]]:
    if not root: return []
    from collections import deque
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
        problems: [
          { name: 'Invert Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/invert-binary-tree/' },
          { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
          { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
          { name: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
          { name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
          { name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
        ],
        subItems: [
          'Pre-order, In-order, Post-order traversal properties',
          'BFS level-order traversal with level size snapshotting',
          'Diameter of Binary Tree & Path Sum calculation',
          'Serialization and deserialization algorithms',
        ],
      },
      {
        id: 'bst',
        title: 'Binary Search Trees (BST)',
        desc: 'BST ordering properties, searching, validation, and K-th smallest element retrieval.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N) Avg / O(N) Worst',
        spaceComplexity: 'O(H) Space',
        keyConcepts: [
          'BST Property: Left < Root < Right',
          'In-order traversal yields sorted sequence',
          'Validating BST using (minVal, maxVal) boundaries',
          'Deletion in BST (3 cases: leaf, 1 child, 2 children with successor)',
        ],
        javaCode: `// Validate Binary Search Tree - O(N) Time
public boolean isValidBST(TreeNode root) {
    return validate(root, null, null);
}

private boolean validate(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    if ((min != null && node.val <= min) || (max != null && node.val >= max)) {
        return false;
    }
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}`,
        pythonCode: `# Kth Smallest Element in a BST
def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    stack = []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right`,
        problems: [
          { name: 'Search in a Binary Search Tree', difficulty: 'Easy', url: 'https://leetcode.com/problems/search-in-a-binary-search-tree/' },
          { name: 'Validate Binary Search Tree', difficulty: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
          { name: 'Kth Smallest Element in a BST', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/' },
          { name: 'Construct BST from Preorder Traversal', difficulty: 'Medium', url: 'https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/' },
        ],
        subItems: [
          'Range validation with null bounds',
          'In-order traversal to get elements in ascending order',
          'Kth Smallest Element via iterative in-order stack',
          'Lowest Common Ancestor in BST in O(H) time',
        ],
      },
      {
        id: 'heaps-priority-queue',
        title: 'Heaps & Priority Queues',
        desc: 'Complete binary tree property, sift-up/sift-down operations, and streaming top-K elements.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(log N) push/pop, O(1) peek',
        spaceComplexity: 'O(N) Space',
        keyConcepts: [
          'Min-Heap & Max-Heap Array Representation',
          'Heapify in O(N) time vs N log N insertions',
          'Top-K Pattern (Use Min-Heap of size K)',
          'Two Heaps Pattern (Find Median from Data Stream)',
        ],
        javaCode: `// Find Median from Data Stream using Two Heaps
class MedianFinder {
    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // Max-Heap
    private PriorityQueue<Integer> large = new PriorityQueue<>(); // Min-Heap

    public void addNum(int num) {
        small.add(num);
        large.add(small.poll());
        if (small.size() < large.size()) {
            small.add(large.poll());
        }
    }

    public double findMedian() {
        return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;
    }
}`,
        pythonCode: `# Top K Frequent Words using Heap
import heapq
def topKFrequent(words: list[str], k: int) -> list[str]:
    from collections import Counter
    counts = Counter(words)
    # Heap stores (-freq, word) for min-heap behavior
    heap = [(-count, word) for word, count in counts.items()]
    heapq.heapify(heap)
    return [heapq.heappop(heap)[1] for _ in range(k)]`,
        problems: [
          { name: 'Kth Largest Element in a Stream', difficulty: 'Easy', url: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/' },
          { name: 'Kth Largest Element in an Array', difficulty: 'Medium', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
          { name: 'Task Scheduler', difficulty: 'Medium', url: 'https://leetcode.com/problems/task-scheduler/' },
          { name: 'Find Median from Data Stream', difficulty: 'Hard', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
        ],
        subItems: [
          'Binary Heap representation in 0-indexed arrays',
          'Top-K pattern: Min-Heap of size K for largest elements',
          'Two Heaps pattern: balancing sizes for running median',
          'Custom Comparators for custom objects in PriorityQueue',
        ],
      },
      {
        id: 'tries',
        title: 'Tries (Prefix Trees)',
        desc: 'Tree structure for rapid string prefix search, auto-complete, and spell checking.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(L) per word lookup',
        spaceComplexity: 'O(N * L * AlphabetSize)',
        keyConcepts: [
          'TrieNode with children array / map & isEndOfWord boolean',
          'Fast Prefix Matching in O(L) time',
          'Wildcard search using DFS on Trie',
          'Bitwise Trie for Maximum XOR Subarray',
        ],
        javaCode: `// Implement Trie (Prefix Tree)
class Trie {
    private class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEnd = false;
    }

    private TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode curr = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char ch : prefix.toCharArray()) {
            int idx = ch - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }
}`,
        pythonCode: `# Design Add and Search Words Data Structure
class WordDictionary:
    def __init__(self):
        self.trie = {}

    def addWord(self, word: str) -> None:
        node = self.trie
        for char in word:
            node = node.setdefault(char, {})
        node['$'] = True

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word): return '$' in node
            if word[i] == '.':
                return any(dfs(child, i + 1) for child in node if child != '$')
            if word[i] not in node: return False
            return dfs(node[word[i]], i + 1)
        return dfs(self.trie, 0)`,
        problems: [
          { name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
          { name: 'Design Add and Search Words Data Structure', difficulty: 'Medium', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
          { name: 'Word Search II', difficulty: 'Hard', url: 'https://leetcode.com/problems/word-search-ii/' },
        ],
        subItems: [
          'TrieNode design with 26-child array vs HashMap',
          'Inserting & Search operations in O(L) time',
          'Wildcard matching with recursive DFS',
          'Word Search II: Combining Grid DFS with Trie pruning',
        ],
      },
    ],
  },
  {
    id: 'dsa-p4',
    title: 'Phase 4: Graphs & Network Algorithms',
    icon: '🕸️',
    color: '#EC4899',
    badge: 'Graph Master',
    summary: 'Master graph representations, BFS/DFS traversal, shortest paths, topological sort, and DSU.',
    topics: [
      {
        id: 'graph-traversals',
        title: 'Graph Representations & Traversals (BFS/DFS)',
        desc: 'Adjacency lists/matrices, connected components, level-order BFS, and flood fill DFS.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(V + E) Time',
        spaceComplexity: 'O(V) Space',
        keyConcepts: [
          'Adjacency List vs Adjacency Matrix',
          'BFS Shortest Path on unweighted graphs',
          'DFS for connected components & cycle detection',
          'Grid Graph Navigation (4-directional & 8-directional)',
        ],
        javaCode: `// Number of Islands - 2D Grid DFS O(M * N)
public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
        for (int c = 0; c < grid[0].length; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0'; // Sink island
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}`,
        pythonCode: `# Rotting Oranges - Multi-source BFS
def orangesRotting(grid: list[list[int]]) -> int:
    from collections import deque
    rows, cols = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    
    time = 0
    dirs = [(1,0), (-1,0), (0,1), (0,-1)]
    while q and fresh > 0:
        time += 1
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
    return time if fresh == 0 else -1`,
        problems: [
          { name: 'Number of Islands', difficulty: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/' },
          { name: 'Max Area of Island', difficulty: 'Medium', url: 'https://leetcode.com/problems/max-area-of-island/' },
          { name: 'Clone Graph', difficulty: 'Medium', url: 'https://leetcode.com/problems/clone-graph/' },
          { name: 'Rotting Oranges', difficulty: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/' },
          { name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', url: 'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
        ],
        subItems: [
          'Build Adjacency List for Directed & Undirected graphs',
          'Grid DFS with in-place visited marking',
          'Multi-source BFS pattern for simultaneous propagation',
          'Clone Graph using HashMap visited cache',
        ],
      },
      {
        id: 'topological-sort',
        title: 'Topological Sort & Cycle Detection',
        desc: 'DAG ordering using Kahn’s Algorithm (In-degree BFS) and DFS 3-color state visiting.',
        difficulty: 'Intermediate',
        timeComplexity: 'O(V + E) Time',
        spaceComplexity: 'O(V + E) Space',
        keyConcepts: [
          'Directed Acyclic Graph (DAG) requirements',
          'Kahn\'s Algorithm via In-degree array + BFS Queue',
          'DFS Cycle Detection with 3 states (Unvisited=0, Visiting=1, Visited=2)',
          'Prerequisite Dependency Resolution',
        ],
        javaCode: `// Course Schedule II - Kahn's Topological Sort O(V + E)
public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    int[] inDegree = new int[numCourses];
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] p : prerequisites) {
        adj.get(p[1]).add(p[0]);
        inDegree[p[0]]++;
    }

    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);

    int[] order = new int[numCourses];
    int idx = 0;
    while (!q.isEmpty()) {
        int curr = q.poll();
        order[idx++] = curr;
        for (int neighbor : adj.get(curr)) {
            if (--inDegree[neighbor] == 0) q.add(neighbor);
        }
    }
    return idx == numCourses ? order : new int[0]; // If idx != V, cycle exists!
}`,
        pythonCode: `# Course Schedule - Cycle Detection using Kahn's BFS
def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    from collections import deque, defaultdict
    adj = defaultdict(list)
    in_degree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
    
    q = deque([i for i in range(numCourses) if in_degree[i] == 0])
    visited_count = 0
    while q:
        node = q.popleft()
        visited_count += 1
        for nxt in adj[node]:
            in_degree[nxt] -= 1
            if in_degree[nxt] == 0:
                q.append(nxt)
    return visited_count == numCourses`,
        problems: [
          { name: 'Course Schedule', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule/' },
          { name: 'Course Schedule II', difficulty: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/' },
          { name: 'Alien Dictionary', difficulty: 'Hard', url: 'https://leetcode.com/problems/alien-dictionary/' },
        ],
        subItems: [
          'Understand DAG properties & topological ordering uniqueness',
          'Implement Kahn\'s algorithm using in-degree array',
          'Detect cycles in directed graph during topological sort',
          'Alien Dictionary character order graph construction',
        ],
      },
      {
        id: 'shortest-paths',
        title: 'Shortest Paths & Union Find (DSU)',
        desc: 'Dijkstra PriorityQueue greedy shortest path and DSU Path Compression / Rank Optimization.',
        difficulty: 'Advanced',
        timeComplexity: 'Dijkstra: O((E + V) log V) / DSU: O(α(N))',
        spaceComplexity: 'O(V + E) Space',
        keyConcepts: [
          'Dijkstra Greedy Shortest Path for Non-negative edge weights',
          'Disjoint Set Union (DSU) with Path Compression & Rank/Size',
          'Kruskal Minimum Spanning Tree using DSU',
          'Network Delay Time & Cheapest Flights within K stops',
        ],
        javaCode: `// Dijkstra Algorithm: Network Delay Time O(E log V)
public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> adj = new HashMap<>();
    for (int[] t : times) {
        adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
    }

    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
    pq.add(new int[]{k, 0});
    Map<Integer, Integer> dist = new HashMap<>();

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int u = curr[0], d = curr[1];
        if (dist.containsKey(u)) continue;
        dist.put(u, d);
        if (adj.containsKey(u)) {
            for (int[] neighbor : adj.get(u)) {
                int v = neighbor[0], weight = neighbor[1];
                if (!dist.containsKey(v)) {
                    pq.add(new int[]{v, d + weight});
                }
            }
        }
    }
    if (dist.size() != n) return -1;
    return Collections.max(dist.values());
}`,
        pythonCode: `# Union Find (DSU) with Path Compression & Union by Rank
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i]) # Path Compression
        return self.parent[i]

    def union(self, i, j):
        root_i, root_j = self.find(i), self.find(j)
        if root_i != root_j:
            if self.rank[root_i] < self.rank[root_j]:
                root_i, root_j = root_j, root_i
            self.parent[root_j] = root_i
            if self.rank[root_i] == self.rank[root_j]:
                self.rank[root_i] += 1
            return True
        return False`,
        problems: [
          { name: 'Redundant Connection', difficulty: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/' },
          { name: 'Network Delay Time', difficulty: 'Medium', url: 'https://leetcode.com/problems/network-delay-time/' },
          { name: 'Path with Minimum Effort', difficulty: 'Medium', url: 'https://leetcode.com/problems/path-with-minimum-effort/' },
          { name: 'Swim in Rising Water', difficulty: 'Hard', url: 'https://leetcode.com/problems/swim-in-rising-water/' },
        ],
        subItems: [
          'Disjoint Set Union (DSU) implementation with Path Compression',
          'Dijkstra\'s algorithm using Priority Queue',
          'Kruskal\'s Minimum Spanning Tree using DSU edge sorting',
          'Bellman-Ford for negative edge weight detection',
        ],
      },
    ],
  },
  {
    id: 'dsa-p5',
    title: 'Phase 5: Dynamic Programming & Advanced Masterclasses',
    icon: '🔮',
    color: '#F59E0B',
    badge: 'DP & Masterclass',
    summary: 'Subproblem optimal substructure, 1D/2D table state transitions, Bitmask DP, and Tree Re-rooting.',
    topics: [
      {
        id: 'dp-1d-2d',
        title: '1D & 2D Dynamic Programming',
        desc: 'Memoization (Top-down) vs Tabulation (Bottom-up), state definition, and space optimization.',
        difficulty: 'Advanced',
        timeComplexity: 'O(States * Transitions)',
        spaceComplexity: 'O(States) reduced to O(1) row',
        keyConcepts: [
          'Optimal Substructure & Overlapping Subproblems',
          'State Definition dp[i] or dp[i][j]',
          'Top-down Memoization (Recursion + Map/Table)',
          'Bottom-up Tabulation & Rolling Array Space Compression',
        ],
        javaCode: `// Longest Common Subsequence - 2D DP with O(M*N) Time
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,
        pythonCode: `# Coin Change - 1D DP Tabulation O(amount * len(coins))
def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] != float('inf') else -1`,
        problems: [
          { name: 'Climbing Stairs', difficulty: 'Easy', url: 'https://leetcode.com/problems/climbing-stairs/' },
          { name: 'House Robber', difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber/' },
          { name: 'Coin Change', difficulty: 'Medium', url: 'https://leetcode.com/problems/coin-change/' },
          { name: 'Longest Increasing Subsequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
          { name: 'Unique Paths', difficulty: 'Medium', url: 'https://leetcode.com/problems/unique-paths/' },
          { name: 'Longest Common Subsequence', difficulty: 'Medium', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
        ],
        subItems: [
          'State definition & transition recurrence relations',
          'Space optimization from 2D table to 1D array',
          'Unbounded vs 0/1 Knapsack patterns',
          'Longest Increasing Subsequence in O(N log N) via Binary Search',
        ],
      },
      {
        id: 'bitmask-dp-topic',
        title: 'Bitmask DP & State Compression',
        desc: 'Representing set membership as bitfield integers (dp[mask][i]) for TSP and matching problems.',
        difficulty: 'Hardcore',
        timeComplexity: 'O(2^N * N^2) Time',
        spaceComplexity: 'O(2^N * N) Space',
        masterclassUrl: '/dsa/bitmask_dp_patterns_deep_dive',
        keyConcepts: [
          'Bitwise operations: AND, OR, XOR, Left/Right Shift',
          'State mask representation: 1 << i means item i is present',
          'Iterating over all submasks: submask = (submask - 1) & mask',
          'Traveling Salesperson Problem (TSP) & Matching',
        ],
        javaCode: `// Bitmask DP - Shortest Path Visiting All Nodes (TSP)
public int shortestPathLength(int[][] graph) {
    int n = graph.length;
    int targetMask = (1 << n) - 1;
    Queue<int[]> q = new LinkedList<>(); // {node, mask}
    boolean[][] visited = new boolean[n][1 << n];

    for (int i = 0; i < n; i++) {
        q.add(new int[]{i, 1 << i});
        visited[i][1 << i] = true;
    }

    int steps = 0;
    while (!q.isEmpty()) {
        int sz = q.size();
        while (sz-- > 0) {
            int[] curr = q.poll();
            int u = curr[0], mask = curr[1];
            if (mask == targetMask) return steps;
            for (int v : graph[u]) {
                int nextMask = mask | (1 << v);
                if (!visited[v][nextMask]) {
                    visited[v][nextMask] = true;
                    q.add(new int[]{v, nextMask});
                }
            }
        }
        steps++;
    }
    return steps;
}`,
        pythonCode: `# Bitmask DP - Traveling Salesperson Memoization
def tsp(dist: list[list[int]]) -> int:
    n = len(dist)
    memo = {}
    
    def solve(mask, u):
        if mask == (1 << n) - 1:
            return dist[u][0] # Return to start node
        if (mask, u) in memo: return memo[(mask, u)]
        res = float('inf')
        for v in range(n):
            if not (mask & (1 << v)):
                res = min(res, dist[u][v] + solve(mask | (1 << v), v))
        memo[(mask, u)] = res
        return res

    return solve(1, 0)`,
        problems: [
          { name: 'Shortest Path Visiting All Nodes', difficulty: 'Hard', url: 'https://leetcode.com/problems/shortest-path-visiting-all-nodes/' },
          { name: 'Can I Win', difficulty: 'Medium', url: 'https://leetcode.com/problems/can-i-win/' },
          { name: 'Partition to K Equal Sum Subsets', difficulty: 'Medium', url: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/' },
        ],
        subItems: [
          'Bitwise mask manipulation (set, clear, check bit)',
          'State reduction from set objects to integer masks',
          'Interactive dry runs available in Bitmask DP Masterclass',
        ],
      },
      {
        id: 'dp-trees-topic',
        title: 'DP on Trees & Two-Pass Re-rooting',
        desc: 'Solve all-pairs root distances in O(N) by calculating subtree DP values and re-rooting top-down.',
        difficulty: 'Hardcore',
        timeComplexity: 'O(N) Time',
        spaceComplexity: 'O(N) Space',
        masterclassUrl: '/dsa/dp_trees_problem_ladder',
        keyConcepts: [
          'Post-order bottom-up subtree DP computation (Pass 1)',
          'Pre-order top-down parent contribution transition (Pass 2)',
          'Tree Diameter & Centroid Decomposition',
          'Subtree size and subtree node sum aggregation',
        ],
        javaCode: `// Sum of Distances in Tree - O(N) Two-Pass Re-rooting
class Solution {
    int[] ans, count;
    List<Set<Integer>> graph;
    int n;

    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        this.n = n;
        graph = new ArrayList<>();
        ans = new int[n];
        count = new int[n];
        Arrays.fill(count, 1);
        for (int i = 0; i < n; i++) graph.add(new HashSet<>());
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }
        dfs1(0, -1); // Pass 1: Subtree count & sum for root 0
        dfs2(0, -1); // Pass 2: Re-rooting parent transition
        return ans;
    }

    private void dfs1(int node, int parent) {
        for (int child : graph.get(node)) {
            if (child != parent) {
                dfs1(child, node);
                count[node] += count[child];
                ans[node] += ans[child] + count[child];
            }
        }
    }

    private void dfs2(int node, int parent) {
        for (int child : graph.get(node)) {
            if (child != parent) {
                ans[child] = ans[node] - count[child] + (n - count[child]);
                dfs2(child, node);
            }
        }
    }
}`,
        pythonCode: `# Subtree Max Sum DP
def maxSubtreeSum(n: int, edges: list[list[int]], values: list[int]) -> int:
    from collections import defaultdict
    adj = defaultdict(list)
    for u, v in edges:
        adj[u].append(v); adj[v].append(u)
    
    dp = [0] * n
    def dfs(node, parent):
        dp[node] = values[node]
        for child in adj[node]:
            if child != parent:
                dfs(child, node)
                if dp[child] > 0:
                    dp[node] += dp[child]

    dfs(0, -1)
    return max(dp)`,
        problems: [
          { name: 'House Robber III', difficulty: 'Medium', url: 'https://leetcode.com/problems/house-robber-iii/' },
          { name: 'Sum of Distances in Tree', difficulty: 'Hard', url: 'https://leetcode.com/problems/sum-of-distances-in-tree/' },
          { name: 'Tree Diameter', difficulty: 'Medium', url: 'https://leetcode.com/problems/tree-diameter/' },
        ],
        subItems: [
          'Pass 1: Compute bottom-up subtree values with post-order DFS',
          'Pass 2: Shift root down to child in O(1) transition',
          'Interactive SVG diagrams available in Tree Re-rooting Masterclass',
        ],
      },
    ],
  },
];
