// Path: src/05-queue-deque/leetcode/time-needed-to-buy-tickets.ts
// https://leetcode.com/problems/time-needed-to-buy-tickets/

// 2034. Time Needed to Buy Tickets
// Medium

function timeRequiredToBuy(tickets: number[], k: number): number {
    
    let queue = tickets.map((t, i) => [t, i]);
    let time = 0;
    while(queue.length > 0) {
        let [t, i] = queue.shift();
        if(t - k <= 0) {
            time += t;
            break;
        } else {
            time += k;
            queue.push([t - k, i]);
        }
    }
    
    return time;
};

// Time complexity: O(n)
// Space complexity: O(n)

console.log(timeRequiredToBuy([2,6,3,4,5], 2)); // 14
console.log(timeRequiredToBuy([2,3,2], 2)); // 6
console.log(timeRequiredToBuy([5,1,1,1], 0)); // 11
