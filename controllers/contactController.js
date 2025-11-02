
export async function getContacts(req, res){
    return res.status(200).json({message:"Get all contacts" })
}

export async function createContact(req, res){
    console.log(req.body);
    const {name, email, phoneNumber} = req.body
    if(!name || !email || !phoneNumber ){
        res.status(400)
        throw new Error("All fields are mandatory")

    }
    
    return res.status(201).json({message:"Contact created" })
}

export async function getContact(req, res){
    return res.status(200).json({message:`Get contact for ${req.params.id} ` })
}

export async function updateContact(req, res){
    return res.status(200).json({message:`Get contact for ${req.params.id} `})
}
export async function deleteContact(req, res){
    return res.status(200).json({message:`Delete contact for ${req.params.id} `})
}