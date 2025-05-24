interface StorageData {
    id: string,
    name: string
}

async function StorageDelete(data) {
    
}
    
async function StorageUpdate(data) {

}

async function StoragePost(data) {

}

export async function StorageHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        StoragePost(data);
    }
    else if(typeOfAction == "put")
    {
        StorageUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        StorageDelete(data);
    }
}