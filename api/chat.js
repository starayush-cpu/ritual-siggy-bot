export default async function handler(req, res) {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" })
}

const { message } = req.body

try {

const response = await fetch(
"https://api-inference.huggingface.co/models/google/flan-t5-large",
{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.HF_API_KEY}`
},
body:JSON.stringify({
inputs:message
})
}
)

const data = await response.json()

let reply = "AI reply failed"

if(Array.isArray(data) && data[0]?.generated_text){
reply = data[0].generated_text
}

res.status(200).json({
reply:reply
})

} catch(error){

res.status(500).json({
reply:"Server error"
})

}

}
