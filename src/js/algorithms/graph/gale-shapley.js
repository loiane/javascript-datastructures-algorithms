class Person {
	constructor(id, gender, ranks, rankIndex, status = "single") {
		this.id = id
		this.gender = gender
		this.ranks = ranks
		this.i = rankIndex
		this.status = status
		this.partner = null
	}
}

function galeShapley(proposers, reviewers) {
	let perfectMatching = new Map()
	for (let [pid, p] of proposers) {
		while (p.i < p.ranks.length) {
			let rid = p.ranks[p.i]
			let r = reviewers.get(rid)
			p.i++
			if (r.status === "single") {
				r.status = "engaged"
				r.partner = p
				p.partner = r
				perfectMatching.set(pid, rid)
				proposers.delete(pid)
				break
			} else if (r.status === "engaged" && r.ranks.get(pid) < r.ranks.get(r.partner.id)) {
				perfectMatching.delete(r.partner.id)
				proposers.set(r.partner.id, r.partner)
				proposers.delete(pid)
				r.partner.partner = null
				r.partner = p
				p.partner = r
				perfectMatching.set(pid, rid)
				break
			}
		}
	}
	return perfectMatching
}

let men = new Map()
let women = new Map()
//O(n^2)
function createPeople(n, gender, set) {
	for (let i = 0; i < n; i++) {
		let id = i
		let rankIndex = 0
		let g = gender
		let ranks = new Array(n)
		let p
		for (let i = 0; i < n; i++) ranks[i] = i
		shuffle(ranks)
		if (gender == 'w') {
			let wRanks = new Map()
			for (let i = 0; i < n; i++) wRanks.set(i, ranks[i])
			p = new Person(id, g, wRanks, null)
		} else {
			p = new Person(id, g, ranks, rankIndex)
		}
		set.set(i, p)
	}
}

//fisher-yates shuffle O(n)
function shuffle(array) {
	for (let i = array.length - 1; i >= 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

createPeople(4, 'm', men)
createPeople(4, 'w', women)
let stableMatching = galeShapley(men, women)
console.log(stableMatching)
