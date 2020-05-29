const progress = document.querySelector(".progress-bar")

// console.log("%O", progress)

const cats_progress = document.querySelector("#cats")
const dogs_progress = document.querySelector("#dogs")
const parrots_progress = document.querySelector("#parrots")

const header = new Headers({
	'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})

const url = new URL('http://localhost:8080/results-for-sse')

const ES = new EventSource(url, header)

ES.onerror = error => {
	ES.readyState ? progress.textContent = "Some arror occured": null;
}

ES.onmessage = message => {
	data = JSON.parse(message.data)
	let allVotes =  data["cats"] + data["dogs"] + data["parrots"]

	let catsVotesPercent = (data["cats"]/allVotes)*100
	let dogsVotesPercent = (data["dogs"]/allVotes)*100
	let parrotsVotesPercent = (data["parrots"]/allVotes)*100

	cats_progress.style.cssText = `width: ${catsVotesPercent}%;`
    cats_progress.textContent = `Cats: ${Math.round(catsVotesPercent)}%`
    
    dogs_progress.style.cssText = `width: ${dogsVotesPercent}%;`
    dogs_progress.textContent = `Dogs: ${Math.round(dogsVotesPercent)}%`
    
    parrots_progress.style.cssText = `width: ${parrotsVotesPercent}%;`
    parrots_progress.textContent = `Parrots: ${Math.round(parrotsVotesPercent)}%`
	
	console.log(allVotes)
}


// SW-SOURCE
const progressSW = document.querySelector(".progress-bar-sw")

// console.log("%O", progressSW)

const cats_progress_sw = document.querySelector("#cats-sw")
const dogs_progress_sw = document.querySelector("#dogs-sw")
const parrots_progress_sw = document.querySelector("#parrots-sw")

const headerSw = new Headers({
	'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})


const ES_SW = new EventSource(urlSw, headerSw)

ES_SW.onerror = error => {
	ES.readyState ? progress.textContent = "Some arror occured": null;
}

ES_SW.onmessage = message => {
	data = JSON.parse(message.data)
	let allVotes =  data["cats"] + data["dogs"] + data["parrots"]

	let catsVotesPercent = (data["cats"]/allVotes)*100
	let dogsVotesPercent = (data["dogs"]/allVotes)*100
	let parrotsVotesPercent = (data["parrots"]/allVotes)*100

	cats_progress_sw.style.cssText = `width: ${catsVotesPercent}%;`
    cats_progress_sw.textContent = `Cats: ${Math.round(catsVotesPercent)}%`
    
    dogs_progress_sw.style.cssText = `width: ${dogsVotesPercent}%;`
    dogs_progress_sw.textContent = `Dogs: ${Math.round(dogsVotesPercent)}%`
    
    parrots_progress_sw.style.cssText = `width: ${parrotsVotesPercent}%;`
    parrots_progress_sw.textContent = `Parrots: ${Math.round(parrotsVotesPercent)}%`
	
	console.log(allVotes)
}