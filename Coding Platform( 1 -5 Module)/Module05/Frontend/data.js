 {
    "title": "Two Sum",
    "discription": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. Assume exactly one solution exists. Return the indices as two integers (0-based).",
    "difficulty": "easy",
    "tags": ["array", "hashmap"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; ++i) cin >> nums[i];\n    int target;\n    cin >> target;\n    Solution obj;\n    vector<int> res = obj.twoSum(nums, target);\n    if (res.size() == 2) cout << res[0] << \" \" << res[1] << \"\\n\";\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; ++i) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        Solution obj = new Solution();\n        int[] res = obj.twoSum(nums, target);\n        if (res != null && res.length == 2) System.out.println(res[0] + \" \" + res[1]);\n        sc.close();\n    }\n}\n"
      },
      {
  "language": "Python",
  "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
  "UserCode": "class Solution:\n    # implement this method\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        \n        pass\n",
  "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    if not data:\n        sys.exit(0)\n    it = iter(data)\n    n = int(next(it))\n    nums = [int(next(it)) for _ in range(n)]\n    target = int(next(it))\n    res = Solution().twoSum(nums, target)\n    if res:\n        print(res[0], res[1])\n"
}
    ],
    "companies": ["google", "flipkart"],
    "hint": ["use hashmap", "store value -> index", "check complement"],
    "visibleTestCases": [
      {
        "input": "4\n2 7 11 15\n9",
        "output": "0 1",
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
      },
      {
        "input": "3\n3 2 4\n6",
        "output": "1 2",
        "explanation": "nums[1] + nums[2] = 2 + 4 = 6"
      }
    ],
    "hiddenTestCases": [
      {"input": "2\n-1 -2\n-3", "output": "0 1"},
      {"input": "5\n0 4 3 0 5\n0", "output": "0 3"},
      {"input": "6\n1 2 3 4 5 6\n11", "output": "4 5"},
      {"input": "4\n5 75 25 -50\n25", "output": "1 3"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int,int> mp;\n        for (int i = 0; i < (int)nums.size(); ++i) {\n            int need = target - nums[i];\n            if (mp.count(need)) return {mp[need], i};\n            mp[nums[i]] = i;\n        }\n        return {};\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> mp = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int need = target - nums[i];\n            if (mp.containsKey(need)) return new int[]{mp.get(need), i};\n            mp.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}\n"
      },
      {
  "language": "Python",
  "SolutionClass": "from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        mp = {}\n        for i, v in enumerate(nums):\n            need = target - v\n            if need in mp:\n                return [mp[need], i]\n            mp[v] = i\n        return []\n"
}
    ]
  }



{
    "title": "Longest Palindromic Substring",
    "discription": "Given a string s, return the longest palindromic substring in s. If there are multiple valid answers, return any one.",
    "difficulty": "medium",
    "tags": ["string", "two-pointers", "dynamic-programming"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    string longestPalindromic(string s) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    string s;\n    if (!getline(cin, s)) return 0;\n    Solution obj;\n    cout << obj.longestPalindromic(s) << \"\\n\";\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public String longestPalindromic(String s) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.hasNextLine() ? sc.nextLine() : \"\";\n        Solution obj = new Solution();\n        System.out.println(obj.longestPalindromic(s));\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\n",
        "UserCode": "class Solution:\n    # implement this method\n    def longestPalindromic(self, s: str) -> str:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    s = sys.stdin.read().rstrip('\\n')\n    print(Solution().longestPalindromic(s))\n"
      }
    ],
    "companies": ["amazon", "microsoft"],
    "hint": ["expand around centers", "check odd and even centers", "track best start/length"],
    "visibleTestCases": [
      {
        "input": "babad",
        "output": "bab",
        "explanation": "One valid answer is \"bab\" (\"aba\" is also valid)."
      },
      {
        "input": "cbbd",
        "output": "bb",
        "explanation": "\"bb\" is the longest palindromic substring."
      }
    ],
    "hiddenTestCases": [
      {"input": "a", "output": "a"},
      {"input": "ac", "output": "a"},
      {"input": "racecar", "output": "racecar"},
      {"input": "forgeeksskeegfor", "output": "geeksskeeg"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    string longestPalindromic(string s) {\n        if (s.empty()) return \"\";\n        int n = s.size(), start = 0, maxLen = 1;\n        auto expand = [&](int l, int r) {\n            while (l >= 0 && r < n && s[l] == s[r]) { --l; ++r; }\n            int len = r - l - 1;\n            if (len > maxLen) { maxLen = len; start = l + 1; }\n        };\n        for (int i = 0; i < n; ++i) {\n            expand(i, i);     // odd\n            expand(i, i + 1); // even\n        }\n        return s.substr(start, maxLen);\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public String longestPalindromic(String s) {\n        if (s == null || s.length() == 0) return \"\";\n        int n = s.length(), start = 0, maxLen = 1;\n        for (int i = 0; i < n; i++) {\n            int l = i, r = i;\n            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) { l--; r++; }\n            int len = r - l - 1;\n            if (len > maxLen) { maxLen = len; start = l + 1; }\n            l = i; r = i + 1;\n            while (l >= 0 && r < n && s.charAt(l) == s.charAt(r)) { l--; r++; }\n            len = r - l - 1;\n            if (len > maxLen) { maxLen = len; start = l + 1; }\n        }\n        return s.substring(start, start + maxLen);\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def longestPalindromic(self, s: str) -> str:\n        if not s:\n            return \"\"\n        start = 0\n        maxLen = 1\n        n = len(s)\n        for i in range(n):\n            # odd\n            l, r = i, i\n            while l >= 0 and r < n and s[l] == s[r]:\n                l -= 1; r += 1\n            length = r - l - 1\n            if length > maxLen:\n                maxLen = length; start = l + 1\n            # even\n            l, r = i, i + 1\n            while l >= 0 and r < n and s[l] == s[r]:\n                l -= 1; r += 1\n            length = r - l - 1\n            if length > maxLen:\n                maxLen = length; start = l + 1\n        return s[start:start + maxLen]\n"
      }
    ]
  }



{
  "title": "Kth Smallest Element",
  "discription": "Given an array of integers, find the kth smallest element in the array.",
  "difficulty": "medium",
  "tags": ["array", "sorting"],
  "bookMark": false,
  "startCode": [
    {
      "language": "C++",
      "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
      "UserCode": "class Solution {\npublic:\n    int kthSmallest(vector<int>& arr, int k) {\n        \n    }\n};\n",
      "FooterCode": "\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> arr(n);\n    for (int i = 0; i < n; ++i) cin >> arr[i];\n    int k;\n    cin >> k;\n    Solution obj;\n    cout << obj.kthSmallest(arr, k) << \"\\n\";\n    return 0;\n}\n"
    },
    {
      "language": "Java",
      "HeaderCode": "import java.util.*;\n",
      "UserCode": "class Solution {\n    public int kthSmallest(int[] arr, int k) {\n        \n    }\n}\n",
      "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for (int i = 0; i < n; ++i) arr[i] = sc.nextInt();\n        int k = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.kthSmallest(arr, k));\n        sc.close();\n    }\n}\n"
    },
    {
      "language": "Python",
      "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
      "UserCode": "class Solution:\n    def kthSmallest(self, arr: List[int], k: int) -> int:\n        pass\n",
      "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = list(map(int, sys.stdin.read().strip().split()))\n    if not data: sys.exit(0)\n    it = iter(data)\n    n = next(it)\n    arr = [next(it) for _ in range(n)]\n    k = next(it)\n    print(Solution().kthSmallest(arr, k))\n"
    }
  ],
  "companies": ["amazon","google"],
  "hint": ["sort the array", "return k-1 index"],
  "visibleTestCases": [
    {"input": "5\n7 10 4 3 20\n4","output": "10","explanation": "Sorted array: 3 4 7 10 20, 4th smallest is 10"},
    {"input": "6\n7 10 4 3 20 15\n3","output": "7","explanation": "Sorted array: 3 4 7 10 15 20, 3rd smallest is 7"}
  ],
  "hiddenTestCases": [
    {"input": "5\n1 2 3 4 5\n2","output": "2"},
    {"input": "4\n12 5 8 7\n1","output": "5"},
    {"input": "7\n9 7 4 3 6 2 1\n5","output": "6"}
  ],
  "referenceSolution": [
    {
      "language": "C++",
      "SolutionClass": "class Solution {\npublic:\n    int kthSmallest(vector<int>& arr, int k) {\n        sort(arr.begin(), arr.end());\n        return arr[k-1];\n    }\n};\n"
    },
    {
      "language": "Java",
      "SolutionClass": "class Solution {\n    public int kthSmallest(int[] arr, int k) {\n        Arrays.sort(arr);\n        return arr[k-1];\n    }\n}\n"
    },
    {
      "language": "Python",
      "SolutionClass": "from typing import List\n\nclass Solution:\n    def kthSmallest(self, arr: List[int], k: int) -> int:\n        arr.sort()\n        return arr[k-1]\n"
    }
  ]
}

  
{
    "title": "Reverse Integer",
    "discription": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
    "difficulty": "medium",
    "tags": ["math"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    int reverse(int x) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int x;\n    cin >> x;\n    Solution obj;\n    cout << obj.reverse(x) << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int reverse(int x) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.reverse(x));\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\n",
        "UserCode": "class Solution:\n    # implement this method\n    def reverse(self, x: int) -> int:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    x = int(sys.stdin.read().strip())\n    res = Solution().reverse(x)\n    print(res)\n"
      }
    ],
    "companies": ["google", "amazon", "microsoft"],
    "hint": ["handle overflow carefully", "use modulo and division", "consider negative numbers"],
    "visibleTestCases": [
      {
        "input": "123",
        "output": "321",
        "explanation": "Reverse of 123 is 321"
      },
      {
        "input": "-123",
        "output": "-321",
        "explanation": "Reverse of -123 is -321"
      },
      {
        "input": "120",
        "output": "21",
        "explanation": "Reverse of 120 is 21 (leading zero is removed)"
      }
    ],
    "hiddenTestCases": [
      {"input": "0", "output": "0"},
      {"input": "1534236469", "output": "0"},
      {"input": "-2147483648", "output": "0"},
      {"input": "901000", "output": "109"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    int reverse(int x) {\n        int rev = 0;\n        while (x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if (rev > INT_MAX/10 || (rev == INT_MAX/10 && pop > 7)) return 0;\n            if (rev < INT_MIN/10 || (rev == INT_MIN/10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int reverse(int x) {\n        int rev = 0;\n        while (x != 0) {\n            int pop = x % 10;\n            x /= 10;\n            if (rev > Integer.MAX_VALUE/10 || (rev == Integer.MAX_VALUE/10 && pop > 7)) return 0;\n            if (rev < Integer.MIN_VALUE/10 || (rev == Integer.MIN_VALUE/10 && pop < -8)) return 0;\n            rev = rev * 10 + pop;\n        }\n        return rev;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def reverse(self, x: int) -> int:\n        INT_MAX = 2**31 - 1\n        INT_MIN = -2**31\n        \n        rev = 0\n        sign = 1 if x >= 0 else -1\n        x = abs(x)\n        \n        while x != 0:\n            pop = x % 10\n            x //= 10\n            if rev > INT_MAX // 10 or (rev == INT_MAX // 10 and pop > 7):\n                return 0\n            rev = rev * 10 + pop\n        \n        return rev * sign\n"
      }
    ]
}

{
    "title": "Valid Parentheses",
    "discription": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: 1. Open brackets must be closed by the same type of brackets. 2. Open brackets must be closed in the correct order.",
    "difficulty": "easy",
    "tags": ["string", "stack"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    bool isValid(string s) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    string s;\n    cin >> s;\n    Solution obj;\n    cout << (obj.isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public boolean isValid(String s) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        Solution obj = new Solution();\n        System.out.println(obj.isValid(s) ? \"true\" : \"false\");\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\n",
        "UserCode": "class Solution:\n    # implement this method\n    def isValid(self, s: str) -> bool:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    s = sys.stdin.read().strip()\n    res = Solution().isValid(s)\n    print(\"true\" if res else \"false\")\n"
      }
    ],
    "companies": ["amazon", "facebook", "google"],
    "hint": ["use stack data structure", "map closing brackets to opening brackets", "handle edge cases like empty string"],
    "visibleTestCases": [
      {
        "input": "()",
        "output": "true",
        "explanation": "Single pair of parentheses is valid"
      },
      {
        "input": "()[]{}",
        "output": "true",
        "explanation": "Multiple types of brackets in correct order"
      },
      {
        "input": "(]",
        "output": "false",
        "explanation": "Closing bracket doesn't match opening bracket"
      }
    ],
    "hiddenTestCases": [
      {"input": "([)]", "output": "false"},
      {"input": "{[]}", "output": "true"},
      {"input": "()(())", "output": "true"},
      {"input": "((()))", "output": "true"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> mapping = {{')', '('}, {']', '['}, {'}', '{'}};\n        \n        for (char c : s) {\n            if (mapping.find(c) != mapping.end()) {\n                if (st.empty() || st.top() != mapping[c]) return false;\n                st.pop();\n            } else {\n                st.push(c);\n            }\n        }\n        return st.empty();\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> mapping = Map.of(')', '(', ']', '[', '}', '{');\n        \n        for (char c : s.toCharArray()) {\n            if (mapping.containsKey(c)) {\n                if (stack.isEmpty() || stack.pop() != mapping.get(c)) return false;\n            } else {\n                stack.push(c);\n            }\n        }\n        return stack.isEmpty();\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {')': '(', ']': '[', '}': '{'}\n        \n        for char in s:\n            if char in mapping:\n                if not stack or stack.pop() != mapping[char]:\n                    return False\n            else:\n                stack.append(char)\n        \n        return len(stack) == 0\n"
      }
    ]
}

{
    "title": "Container With Most Water",
    "discription": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    "difficulty": "medium",
    "tags": ["array", "two-pointers"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    int maxArea(vector<int>& height) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n;\n    cin >> n;\n    vector<int> height(n);\n    for (int i = 0; i < n; ++i) cin >> height[i];\n    Solution obj;\n    cout << obj.maxArea(height) << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int maxArea(int[] height) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for (int i = 0; i < n; ++i) height[i] = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.maxArea(height));\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def maxArea(self, height: List[int]) -> int:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    n = int(data[0])\n    height = list(map(int, data[1:1+n]))\n    res = Solution().maxArea(height)\n    print(res)\n"
      }
    ],
    "companies": ["amazon", "google", "facebook"],
    "hint": ["use two pointers", "start from both ends", "move the pointer with smaller height"],
    "visibleTestCases": [
      {
        "input": "9\n1 8 6 2 5 4 8 3 7",
        "output": "49",
        "explanation": "The max area is between indices 1 and 8: min(8,7)*7 = 49"
      },
      {
        "input": "2\n1 1",
        "output": "1",
        "explanation": "The max area is min(1,1)*1 = 1"
      }
    ],
    "hiddenTestCases": [
      {"input": "5\n4 3 2 1 4", "output": "16"},
      {"input": "3\n1 2 1", "output": "2"},
      {"input": "6\n1 3 2 5 8 4", "output": "12"},
      {"input": "10\n1 8 6 2 5 4 8 25 7 10", "output": "49"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int max_area = 0;\n        \n        while (left < right) {\n            int current_area = min(height[left], height[right]) * (right - left);\n            max_area = max(max_area, current_area);\n            \n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        return max_area;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxArea = 0;\n        \n        while (left < right) {\n            int currentArea = Math.min(height[left], height[right]) * (right - left);\n            maxArea = Math.max(maxArea, currentArea);\n            \n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        return maxArea;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        left, right = 0, len(height) - 1\n        max_area = 0\n        \n        while left < right:\n            current_area = min(height[left], height[right]) * (right - left)\n            max_area = max(max_area, current_area)\n            \n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        \n        return max_area\n"
      }
    ]
}


{
    "title": "Merge Intervals",
    "discription": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    "difficulty": "medium",
    "tags": ["array", "sorting"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n;\n    cin >> n;\n    vector<vector<int>> intervals(n, vector<int>(2));\n    for (int i = 0; i < n; ++i) {\n        cin >> intervals[i][0] >> intervals[i][1];\n    }\n    Solution obj;\n    vector<vector<int>> res = obj.merge(intervals);\n    for (auto& interval : res) {\n        cout << interval[0] << \" \" << interval[1] << endl;\n    }\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        for (int i = 0; i < n; ++i) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        Solution obj = new Solution();\n        int[][] res = obj.merge(intervals);\n        for (int[] interval : res) {\n            System.out.println(interval[0] + \" \" + interval[1]);\n        }\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    if not data:\n        sys.exit(0)\n    n = int(data[0])\n    intervals = []\n    idx = 1\n    for i in range(n):\n        start = int(data[idx]); end = int(data[idx+1])\n        intervals.append([start, end])\n        idx += 2\n    res = Solution().merge(intervals)\n    for interval in res:\n        print(interval[0], interval[1])\n"
      }
    ],
    "companies": ["google", "facebook", "microsoft"],
    "hint": ["sort intervals by start time", "compare current interval with previous", "merge if overlapping"],
    "visibleTestCases": [
      {
        "input": "4\n1 3\n2 6\n8 10\n15 18",
        "output": "1 6\n8 10\n15 18",
        "explanation": "Intervals [1,3] and [2,6] overlap, so they are merged into [1,6]"
      },
      {
        "input": "2\n1 4\n4 5",
        "output": "1 5",
        "explanation": "Intervals [1,4] and [4,5] are considered overlapping"
      }
    ],
    "hiddenTestCases": [
      {"input": "1\n1 4", "output": "1 4"},
      {"input": "3\n1 4\n0 4\n3 5", "output": "0 5"},
      {"input": "2\n1 4\n0 0", "output": "0 0\n1 4"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        if (intervals.empty()) return {};\n        \n        sort(intervals.begin(), intervals.end());\n        vector<vector<int>> merged;\n        \n        for (auto& interval : intervals) {\n            if (merged.empty() || merged.back()[1] < interval[0]) {\n                merged.push_back(interval);\n            } else {\n                merged.back()[1] = max(merged.back()[1], interval[1]);\n            }\n        }\n        \n        return merged;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int[][] merge(int[][] intervals) {\n        if (intervals.length == 0) return new int[0][];\n        \n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> merged = new ArrayList<>();\n        \n        for (int[] interval : intervals) {\n            if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {\n                merged.add(interval);\n            } else {\n                merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);\n            }\n        }\n        \n        return merged.toArray(new int[merged.size()][]);\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        if not intervals:\n            return []\n        \n        intervals.sort(key=lambda x: x[0])\n        merged = []\n        \n        for interval in intervals:\n            if not merged or merged[-1][1] < interval[0]:\n                merged.append(interval)\n            else:\n                merged[-1][1] = max(merged[-1][1], interval[1])\n        \n        return merged\n"
      }
    ]
}



{
    "title": "Maximum Subarray",
    "discription": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    "difficulty": "easy",
    "tags": ["array", "dynamic-programming"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; ++i) cin >> nums[i];\n    Solution obj;\n    cout << obj.maxSubArray(nums) << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int maxSubArray(int[] nums) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; ++i) nums[i] = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.maxSubArray(nums));\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def maxSubArray(self, nums: List[int]) -> int:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    res = Solution().maxSubArray(nums)\n    print(res)\n"
      }
    ],
    "companies": ["amazon", "microsoft", "linkedin"],
    "hint": ["use Kadane's algorithm", "keep track of current sum and max sum", "reset current sum if it becomes negative"],
    "visibleTestCases": [
      {
        "input": "9\n-2 1 -3 4 -1 2 1 -5 4",
        "output": "6",
        "explanation": "[4,-1,2,1] has the largest sum = 6"
      },
      {
        "input": "1\n1",
        "output": "1",
        "explanation": "Only one element"
      }
    ],
    "hiddenTestCases": [
      {"input": "5\n5 4 -1 7 8", "output": "23"},
      {"input": "1\n-1", "output": "-1"},
      {"input": "3\n-2 -1 -3", "output": "-1"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int max_sum = nums[0];\n        int current_sum = nums[0];\n        \n        for (int i = 1; i < nums.size(); ++i) {\n            current_sum = max(nums[i], current_sum + nums[i]);\n            max_sum = max(max_sum, current_sum);\n        }\n        \n        return max_sum;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        \n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        \n        return maxSum;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        max_sum = nums[0]\n        current_sum = nums[0]\n        \n        for i in range(1, len(nums)):\n            current_sum = max(nums[i], current_sum + nums[i])\n            max_sum = max(max_sum, current_sum)\n        \n        return max_sum\n"
      }
    ]
}


{
    "title": "Product of Array Except Self",
    "discription": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    "difficulty": "medium",
    "tags": ["array", "prefix-sum"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; ++i) cin >> nums[i];\n    Solution obj;\n    vector<int> res = obj.productExceptSelf(nums);\n    for (int num : res) cout << num << \" \";\n    cout << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; ++i) nums[i] = sc.nextInt();\n        Solution obj = new Solution();\n        int[] res = obj.productExceptSelf(nums);\n        for (int num : res) System.out.print(num + \" \");\n        System.out.println();\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    res = Solution().productExceptSelf(nums)\n    print(\" \".join(map(str, res)))\n"
      }
    ],
    "companies": ["amazon", "facebook", "linkedin"],
    "hint": ["use prefix and suffix products", "calculate left products then right products", "combine them for final result"],
    "visibleTestCases": [
      {
        "input": "4\n1 2 3 4",
        "output": "24 12 8 6",
        "explanation": "For index 0: 2*3*4=24, index 1: 1*3*4=12, etc."
      },
      {
        "input": "2\n-1 1",
        "output": "1 -1",
        "explanation": "For index 0: 1, index 1: -1"
      }
    ],
    "hiddenTestCases": [
      {"input": "3\n0 0 0", "output": "0 0 0"},
      {"input": "3\n1 0 3", "output": "0 3 0"},
      {"input": "5\n2 3 4 5 6", "output": "360 240 180 144 120"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> result(n, 1);\n        \n        // Calculate left products\n        int left = 1;\n        for (int i = 0; i < n; ++i) {\n            result[i] = left;\n            left *= nums[i];\n        }\n        \n        // Calculate right products and combine\n        int right = 1;\n        for (int i = n - 1; i >= 0; --i) {\n            result[i] *= right;\n            right *= nums[i];\n        }\n        \n        return result;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        \n        // Calculate left products\n        int left = 1;\n        for (int i = 0; i < n; i++) {\n            result[i] = left;\n            left *= nums[i];\n        }\n        \n        // Calculate right products and combine\n        int right = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            result[i] *= right;\n            right *= nums[i];\n        }\n        \n        return result;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        n = len(nums)\n        result = [1] * n\n        \n        # Calculate left products\n        left = 1\n        for i in range(n):\n            result[i] = left\n            left *= nums[i]\n        \n        # Calculate right products and combine\n        right = 1\n        for i in range(n-1, -1, -1):\n            result[i] *= right\n            right *= nums[i]\n        \n        return result\n"
      }
    ]
}



{
    "title": "Search in Rotated Sorted Array",
    "discription": "There is an integer array nums sorted in ascending order (with distinct values). Given the array after possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    "difficulty": "medium",
    "tags": ["array", "binary-search"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    int search(vector<int>& nums, int target) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int n, target;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; ++i) cin >> nums[i];\n    cin >> target;\n    Solution obj;\n    cout << obj.search(nums, target) << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public int search(int[] nums, int target) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; ++i) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        Solution obj = new Solution();\n        System.out.println(obj.search(nums, target));\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def search(self, nums: List[int], target: int) -> int:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    target = int(data[1+n])\n    res = Solution().search(nums, target)\n    print(res)\n"
      }
    ],
    "companies": ["google", "microsoft", "amazon"],
    "hint": ["modified binary search", "check which side is sorted", "determine which side to search based on target"],
    "visibleTestCases": [
      {
        "input": "7\n4 5 6 7 0 1 2\n0",
        "output": "4",
        "explanation": "Target 0 is found at index 4"
      },
      {
        "input": "7\n4 5 6 7 0 1 2\n3",
        "output": "-1",
        "explanation": "Target 3 is not in the array"
      }
    ],
    "hiddenTestCases": [
      {"input": "1\n1\n0", "output": "-1"},
      {"input": "1\n1\n1", "output": "0"},
      {"input": "5\n5 1 2 3 4\n1", "output": "1"},
      {"input": "6\n3 4 5 6 1 2\n2", "output": "5"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) return mid;\n            \n            // Check if left half is sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } \n            // Right half is sorted\n            else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        \n        return -1;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) return mid;\n            \n            // Check if left half is sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            } \n            // Right half is sorted\n            else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        \n        return -1;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        left, right = 0, len(nums) - 1\n        \n        while left <= right:\n            mid = (left + right) // 2\n            \n            if nums[mid] == target:\n                return mid\n            \n            # Check if left half is sorted\n            if nums[left] <= nums[mid]:\n                if nums[left] <= target < nums[mid]:\n                    right = mid - 1\n                else:\n                    left = mid + 1\n            # Right half is sorted\n            else:\n                if nums[mid] < target <= nums[right]:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n        \n        return -1\n"
      }
    ]
}


{
    "title": "Word Break",
    "discription": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words. The same word in the dictionary may be reused multiple times in the segmentation.",
    "difficulty": "medium",
    "tags": ["dynamic-programming", "string"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    string s;\n    cin >> s;\n    int n;\n    cin >> n;\n    vector<string> wordDict(n);\n    for (int i = 0; i < n; ++i) cin >> wordDict[i];\n    Solution obj;\n    cout << (obj.wordBreak(s, wordDict) ? \"true\" : \"false\") << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int n = sc.nextInt();\n        List<String> wordDict = new ArrayList<>();\n        for (int i = 0; i < n; ++i) wordDict.add(sc.next());\n        Solution obj = new Solution();\n        System.out.println(obj.wordBreak(s, wordDict) ? \"true\" : \"false\");\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    s = data[0]\n    n = int(data[1])\n    wordDict = data[2:2+n]\n    res = Solution().wordBreak(s, wordDict)\n    print(\"true\" if res else \"false\")\n"
      }
    ],
    "companies": ["facebook", "google", "amazon"],
    "hint": ["use dynamic programming", "dp[i] means first i characters can be segmented", "check all possible splits"],
    "visibleTestCases": [
      {
        "input": "leetcode 2 leet code",
        "output": "true",
        "explanation": "Return true because 'leetcode' can be segmented as 'leet code'"
      },
      {
        "input": "applepenapple 2 apple pen",
        "output": "true",
        "explanation": "Return true because 'applepenapple' can be segmented as 'apple pen apple'"
      }
    ],
    "hiddenTestCases": [
      {"input": "catsandog 5 cats dog sand and cat", "output": "false"},
      {"input": "a 1 a", "output": "true"},
      {"input": "abcd 3 a abc b cd", "output": "true"},
      {"input": "aaaaaaa 2 aaa aaaa", "output": "true"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());\n        int n = s.length();\n        vector<bool> dp(n + 1, false);\n        dp[0] = true;\n        \n        for (int i = 1; i <= n; ++i) {\n            for (int j = 0; j < i; ++j) {\n                if (dp[j] && wordSet.find(s.substr(j, i - j)) != wordSet.end()) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        \n        return dp[n];\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        Set<String> wordSet = new HashSet<>(wordDict);\n        int n = s.length();\n        boolean[] dp = new boolean[n + 1];\n        dp[0] = true;\n        \n        for (int i = 1; i <= n; i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && wordSet.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        \n        return dp[n];\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        word_set = set(wordDict)\n        n = len(s)\n        dp = [False] * (n + 1)\n        dp[0] = True\n        \n        for i in range(1, n + 1):\n            for j in range(i):\n                if dp[j] and s[j:i] in word_set:\n                    dp[i] = True\n                    break\n        \n        return dp[n]\n"
      }
    ]
}


{
    "title": "Course Schedule",
    "discription": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
    "difficulty": "medium",
    "tags": ["graph", "topological-sort"],
    "bookMark": false,
    "startCode": [
      {
        "language": "C++",
        "HeaderCode": "#include <bits/stdc++.h>\nusing namespace std;\n\n",
        "UserCode": "class Solution {\npublic:\n    // implement this method\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};\n",
        "FooterCode": "\nint main() {\n    int numCourses, n;\n    cin >> numCourses >> n;\n    vector<vector<int>> prerequisites(n, vector<int>(2));\n    for (int i = 0; i < n; ++i) {\n        cin >> prerequisites[i][0] >> prerequisites[i][1];\n    }\n    Solution obj;\n    cout << (obj.canFinish(numCourses, prerequisites) ? \"true\" : \"false\") << endl;\n    return 0;\n}\n"
      },
      {
        "language": "Java",
        "HeaderCode": "import java.util.*;\n",
        "UserCode": "class Solution {\n    // implement this method\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}\n",
        "FooterCode": "\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int numCourses = sc.nextInt();\n        int n = sc.nextInt();\n        int[][] prerequisites = new int[n][2];\n        for (int i = 0; i < n; ++i) {\n            prerequisites[i][0] = sc.nextInt();\n            prerequisites[i][1] = sc.nextInt();\n        }\n        Solution obj = new Solution();\n        System.out.println(obj.canFinish(numCourses, prerequisites) ? \"true\" : \"false\");\n        sc.close();\n    }\n}\n"
      },
      {
        "language": "Python",
        "HeaderCode": "#!/usr/bin/env python3\nfrom typing import List\n",
        "UserCode": "class Solution:\n    # implement this method\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        \n        pass\n",
        "FooterCode": "\nif __name__ == \"__main__\":\n    import sys\n    data = sys.stdin.read().strip().split()\n    numCourses = int(data[0])\n    n = int(data[1])\n    prerequisites = []\n    idx = 2\n    for i in range(n):\n        a = int(data[idx]); b = int(data[idx+1])\n        prerequisites.append([a, b])\n        idx += 2\n    res = Solution().canFinish(numCourses, prerequisites)\n    print(\"true\" if res else \"false\")\n"
      }
    ],
    "companies": ["google", "facebook", "microsoft"],
    "hint": ["use topological sort", "detect cycle in directed graph", "use Kahn's algorithm or DFS"],
    "visibleTestCases": [
      {
        "input": "2 1\n1 0",
        "output": "true",
        "explanation": "There are 2 courses. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        "input": "2 2\n1 0\n0 1",
        "output": "false",
        "explanation": "There are 2 courses. To take course 1 you should have finished course 0, and to take course 0 you should have finished course 1. So it is impossible."
      }
    ],
    "hiddenTestCases": [
      {"input": "1 0", "output": "true"},
      {"input": "3 3\n0 1\n1 2\n2 0", "output": "false"},
      {"input": "4 4\n1 0\n2 0\n3 1\n3 2", "output": "true"},
      {"input": "5 5\n1 0\n2 1\n3 2\n4 3\n0 4", "output": "false"}
    ],
    "referenceSolution": [
      {
        "language": "C++",
        "SolutionClass": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> graph(numCourses);\n        vector<int> indegree(numCourses, 0);\n        \n        // Build graph and calculate indegree\n        for (auto& pre : prerequisites) {\n            graph[pre[1]].push_back(pre[0]);\n            indegree[pre[0]]++;\n        }\n        \n        // Topological sort using Kahn's algorithm\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (indegree[i] == 0) {\n                q.push(i);\n            }\n        }\n        \n        int count = 0;\n        while (!q.empty()) {\n            int curr = q.front();\n            q.pop();\n            count++;\n            \n            for (int neighbor : graph[curr]) {\n                indegree[neighbor]--;\n                if (indegree[neighbor] == 0) {\n                    q.push(neighbor);\n                }\n            }\n        }\n        \n        return count == numCourses;\n    }\n};\n"
      },
      {
        "language": "Java",
        "SolutionClass": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> graph = new ArrayList<>();\n        int[] indegree = new int[numCourses];\n        \n        for (int i = 0; i < numCourses; i++) {\n            graph.add(new ArrayList<>());\n        }\n        \n        // Build graph and calculate indegree\n        for (int[] pre : prerequisites) {\n            graph.get(pre[1]).add(pre[0]);\n            indegree[pre[0]]++;\n        }\n        \n        // Topological sort using Kahn's algorithm\n        Queue<Integer> queue = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) {\n                queue.offer(i);\n            }\n        }\n        \n        int count = 0;\n        while (!queue.isEmpty()) {\n            int curr = queue.poll();\n            count++;\n            \n            for (int neighbor : graph.get(curr)) {\n                indegree[neighbor]--;\n                if (indegree[neighbor] == 0) {\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        \n        return count == numCourses;\n    }\n}\n"
      },
      {
        "language": "Python",
        "SolutionClass": "from collections import deque\n\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph = [[] for _ in range(numCourses)]\n        indegree = [0] * numCourses\n        \n        # Build graph and calculate indegree\n        for a, b in prerequisites:\n            graph[b].append(a)\n            indegree[a] += 1\n        \n        # Topological sort using Kahn's algorithm\n        queue = deque()\n        for i in range(numCourses):\n            if indegree[i] == 0:\n                queue.append(i)\n        \n        count = 0\n        while queue:\n            curr = queue.popleft()\n            count += 1\n            \n            for neighbor in graph[curr]:\n                indegree[neighbor] -= 1\n                if indegree[neighbor] == 0:\n                    queue.append(neighbor)\n        \n        return count == numCourses\n"
      }
    ]
}


