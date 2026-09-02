import { COMMUNITY_SEED, Engine } from "@/lib/learning/engine"

const progressByMobile = new Map()
const communityByMobile = new Map()

export function getProgress(mobile) {
	if (!progressByMobile.has(mobile)) progressByMobile.set(mobile, {})
	return progressByMobile.get(mobile)
}

export function stateFor(mobile, slug) {
	const all = getProgress(mobile)
	all[slug] = Engine.normalise(all[slug])
	return all[slug]
}

export function saveProgramState(mobile, slug, state) {
	const all = getProgress(mobile)
	all[slug] = Engine.normalise(state)
	progressByMobile.set(mobile, all)
	return all[slug]
}

export function getCommunity(mobile) {
	if (!communityByMobile.has(mobile)) {
		communityByMobile.set(mobile, [...COMMUNITY_SEED])
	}
	return communityByMobile.get(mobile)
}

export function addCommunityPost(mobile, post) {
	const posts = getCommunity(mobile)
	posts.unshift(post)
	communityByMobile.set(mobile, posts)
	return posts
}
