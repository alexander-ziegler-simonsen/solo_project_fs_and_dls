interface UserData {
    id: string,
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    address: string
}

async function UserDelete(data) {
    
}
    
async function UserUpdate(data) {

}

async function UserPost(data) {

}

export async function UserHandler(typeOfAction, data) {
    if(typeOfAction == "post")
    {
        UserPost(data);
    }
    else if(typeOfAction == "put")
    {
        UserUpdate(data);
    }
    else if(typeOfAction == "delete")
    {
        UserDelete(data);
    }
}