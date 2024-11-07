import { NextResponse } from "next/server";
import { getUserId } from "@/lib/authUtil";
require('dotenv').config();

export async function POST(req: any) {
    const userId = getUserId();

    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse JSON body from the request
    const { randomId } = await req.json();

    // Prepare the data to be sent to the backend
    const userData = {
        id: userId,
        randomId,  // Include the random ID
        secret: process.env.SECRET_KEY,
    };

    const backendUrl = process.env.PRIMARY_BACKEND_URL;

    // Send the data to the backend
    try {
        const response = await fetch(`${backendUrl}/api/user`, {
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

        return NextResponse.json({ message });
    } catch (error) {
        console.error('Error sending user data to backend:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
