import { Button, Container, Field, Input, Spacer, Text } from "@chakra-ui/react"
import { PasswordInput } from "../../components/ui/password-input"
import { useState } from "react";


function AccountInfoPage() {
    
      const [formData, setFormData] = useState({
        fname: "first name",
        lname: "last name",
        email: "mail@mail.com",
        phone: "12341234",
        address: "address 1234",
        username: "username",
        password: "password",
      });

    return (
        <>
            <Container>
                <Text>account info</Text>
                <Text>see your info here and change it</Text>

                <Field.Root>
                    <Field.Label id="fname">firstname</Field.Label>
                    <Input bg={"bg"} id="in_fname" placeholder="firstname" variant="outline" value={formData.fname} />

                    <Field.Label id="lname">lastname</Field.Label>
                    <Input bg={"bg"} id="in_lname" placeholder="lastname" variant="outline" value={formData.lname} />

                    <Field.Label id="email">email</Field.Label>
                    <Input bg={"bg"} id="in_email" placeholder="email" variant="outline" value={formData.email} />

                    <Field.Label id="phone">phone number</Field.Label>
                    <Input bg={"bg"} id="in_phone" placeholder="phone number" variant="outline" value={formData.phone} />

                    <Field.Label id="address">address</Field.Label>
                    <Input bg={"bg"} id="in_address" placeholder="address" variant="outline" value={formData.address} />

                    <Field.Label id="username">Username</Field.Label>
                    <Input bg={"bg"} id="in_username" placeholder="username" variant="outline" value={formData.username} />

                    <Field.Label id="password">password</Field.Label>
                    <PasswordInput bg={"bg"} id="in_password" placeholder="password" variant="outline" value={formData.password} />
                </Field.Root>
                <Spacer p={2} />
                <Button bg={"success"} onClick={() => {console.log("button clicked - account info")} }>save all changes</Button>
            </Container>
        </>
    )
}

export default AccountInfoPage