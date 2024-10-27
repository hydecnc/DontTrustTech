import ollama from 'ollama/browser'

export const talk = async () => {
    console.log("WSG CHAT")
    const response = await ollama.chat({
        model: 'llama3.1',
        messages: [{role: 'user', content: "Yo chat is this true chat?"}]
    })
    console.log(response.message.content)
}