import { NextResponse } from "next/server";
import { currentUser, auth } from "@clerk/nextjs/server";

export async function GET() {
    const { userId } = auth();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await currentUser();

    // Prepare the data to be sent to the backend
    const userData = {
        id: user?.id,
        secret: process.env.SECRET_KEY,
    };
   
    // Send the data to the backend
    try {
        const response = await fetch('http://localhost:3001/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            console.error('Failed to send user data to backend', await response.text());
            return new NextResponse('Failed to send user data to backend', { status: 500 });
        }

        const backendResponse = await response.json();
        const message = backendResponse.message;

        return NextResponse.json({  message });
    } catch (error) {
        console.error('Error sending user data to backend:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
