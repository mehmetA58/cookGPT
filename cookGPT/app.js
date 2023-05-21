const API_KEY="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"
const submitButton =document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')
function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value
}
async function getMessage(){
    console.log('clicked')
    const options={
        method:"POST",
        headers:{
            "Authorization":`Bearer ${API_KEY}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "model":"gpt-3.5-turbo",
            messages:[{role:"user",content:inputElement.value}],
            "max_tokens":100
        })
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        console.log(data)
        outPutElement.textContent = data.error.message //-->after buy coin update
        if (data.error.message && inputElement.value) {
            const pElement= document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click',()=> changeInput(pElement.textContent))
            historyElement.append(pElement)

            
        }
    } catch (error) {
        console.log(error)
        
    }
}
submitButton.addEventListener('click',getMessage)
function clearInput(){
    inputElement.value = ''
}
buttonElement.addEventListener('click',clearInput)